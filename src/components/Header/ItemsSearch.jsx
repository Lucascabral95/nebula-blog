'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

import './ItemsSearch.scss'

const ItemsSearch = ({ publicacionesEncontradas }) => {
  const getAuthorImage = (author) => {
    return author?.avatar || '/img/title-doraemon.jpg'
  }

  return (
    <div className="items-search">
      <div className="contenedor-items-search">
        <motion.div
          initial={{ y: 75, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45 }}
          className="contenedor-mapeo-posteos"
        >
          <div className="search">
            <p className="busqueda">{publicacionesEncontradas[0]?.categories?.toUpperCase()}</p>
          </div>
          {publicacionesEncontradas.map(item => (
            <Link href={`/blog/posteo/${item._id}`} key={item._id} className="mapeo-items-search">
              <div className="interior">
                <div className="foto-perfil">
                  <Image
                    width={24}
                    height={24}
                    src={getAuthorImage(item.author[0])}
                    className="perfil-imagen"
                    alt="autor"
                  />
                </div>
                <div className="contenedor-dee-titulo">
                  <p className="titulo-de-search">{item.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default ItemsSearch
