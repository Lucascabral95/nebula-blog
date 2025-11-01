'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import moment from 'moment'
import 'moment/locale/es'
import { motion } from 'framer-motion'
import { IoMdClose } from 'react-icons/io'
import { FaHeart } from 'react-icons/fa'
import axios from 'axios'

import './ItemComment.scss'

function ItemComment({ setIsOpenComment, posteo, id }) {
  const [dataComentarios, setDataComentarios] = useState([])
  const [comentario, setComentario] = useState("")
  const [change, setChange] = useState(false)
  const { data: session } = useSession()

  const formatName = (name) => (name ? name[0].toUpperCase() + name.slice(1) : '')
  const userImage = session?.user?.image || '/img/title-doraemon.jpg'

  const handleApiError = (error, context = '') => {
    if (error.response) {
      console.error(`Error ${error.response.status}: ${error.response.data.error} (${context})`)
    } else {
      console.error(`Error de red: ${error.message} (${context})`)
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(`/api/comment?id=${id}`)
        if (result.status === 200) {
          setDataComentarios(result.data.comments)
        }
      } catch (error) {
        handleApiError(error, 'getData')
      }
    }
    getData()
  }, [id, change])

  const comentar = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.post("/api/comment", {
        post: id,
        user: session?.user?.id,
        content: comentario
      })
      if (result.status === 200 || result.status === 201) {
        setComentario("")
        setDataComentarios([...dataComentarios, result.data.comment])
      }
    } catch (error) {
      handleApiError(error, 'comentar')
    }
  }

  const darLike = async (idComment) => {
    try {
      const result = await axios.put(`/api/comment?id=${idComment}`)
      if (result.status === 200 || result.status === 201) {
        setChange(!change)
      }
    } catch (error) {
      handleApiError(error, 'darLike')
    }
  }

  return (
    <motion.div
      initial={{ x: '100vw', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100vw', opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="comment"
    >
      <div className="contenedor-comment">
        <div className="respuestas">
          <div className="texto">
            <p>Respuestas ({dataComentarios.length})</p>
          </div>
          <div className="icono-closee" onClick={() => setIsOpenComment(false)}>
            <IoMdClose className="close" />
          </div>
        </div>

        <div className="comentarios-contenedor">
          <div className="creacion-comentarios">
            <div className="comentarios">
              <div className="foto">
                <Image
                  src={userImage}
                  width={32}
                  height={32}
                  alt="perfil"
                  className="foto-perfil-comentarios"
                />
              </div>
              <div className="nombre-comentario">
                <p>{formatName(session?.user?.name || '')}</p>
              </div>
            </div>
            <div className="comentarios-input">
              <textarea
                name="comentario"
                id="comentario"
                placeholder="¿Qué estás pensando?"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
            </div>
            <div className="enviar-cancelar">
              <button className="boton-de-cancelar" onClick={() => setComentario('')}>
                Cancelar
              </button>
              <button className="boton-de-enviar" onClick={comentar}>
                Enviar
              </button>
            </div>
          </div>
        </div>

        <div className="posteo-comentarios">
          {dataComentarios.map((item) => (
            <div key={item._id} className="comentario">
              <div className="datos">
                <div className="foto">
                  <Image
                    className="foto-foto"
                    src={item?.user[0]?.image || '/img/title-doraemon.jpg'}
                    width={32}
                    height={32}
                    alt="perfil"
                  />
                </div>
                <div className="nombre-fecha">
                  <div className="nombre">
                    <p>{item?.user[0]?.name ? formatName(item?.user[0]?.name) : ''}</p>
                  </div>
                  <div className="fecha">
                    <p>{moment(item.createdAt).fromNow()}</p>
                  </div>
                </div>
              </div>
              <div className="contenido">
                <div className="cont">
                  <p>{item.content}</p>
                </div>
              </div>
              <div className="espacio-likes">
                <div className="icono" onClick={() => darLike(item._id)}>
                  <FaHeart className="icon" />
                </div>
                <div className="texto-likes">
                  <p>{item.likes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default ItemComment
