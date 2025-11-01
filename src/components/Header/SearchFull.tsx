'use client'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'
import 'moment/locale/es'
import { FcLike } from 'react-icons/fc'
import { FaCommentAlt } from 'react-icons/fa'
import { HiMiniMagnifyingGlass } from 'react-icons/hi2'

import useStore from '@/zustand'
import { IPost } from '@/infrastructure/interfaces/blog.interface'
import './SearchFull.scss'

const SearchFull = () => {
  const { toggleSearchFull, arrayDePosteos, search, setSearch } = useStore()

  const formatContent = (content: string) => content?.replace(/\n/g, '<br />') || ''
  const getAuthorImage = (avatar: string | null | undefined) => avatar || '/img/title-doraemon.jpg'

  const handlePostClick = () => {
    setSearch('')
    toggleSearchFull()
  }

  return (
    <div className="search-full">
      <div className="contenedor-search-full">
        <div className="input-full">
          <div className="cont-icono">
            <HiMiniMagnifyingGlass className="icono" />
          </div>
          <div className="value-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar..."
            />
          </div>
        </div>

        <div className="resultado-busqueda">
          {search && (
            <h2>
              Resultados para <span>{search}</span>
            </h2>
          )}
        </div>

        <div className="contenedor-ultimos-posteos">
          {arrayDePosteos.map((item: IPost) => (
            <Link
              onClick={handlePostClick}
              href={`/blog/posteo/${item._id}`}
              className="posteoss"
              key={item._id}
            >
              <div className="perfil-nombre-categoria">
                <div className="perfil-nombre">
                  <Link href={`/blog/perfil/${item.author[0]._id}`} className="imagen">
                    <Image
                      className="imagen-imagen"
                      src={getAuthorImage(item.author[0].avatar)}
                      alt="Perfil"
                      width={20}
                      height={20}
                    />
                  </Link>
                  <Link href={`/blog/perfil/${item.author[0]._id}`} className="nombre">
                    <p>{item.author[0].email}</p>
                  </Link>
                </div>
                <div className="pmc-categoria">
                  <div className="section-cat">
                    <p>{item.categories}</p>
                  </div>
                </div>
              </div>
              <div className="titulo-contenido">
                <div className="titulo-ultimo-posteo">
                  <h3>{item.title}</h3>
                </div>
                <div className="descripcion-ultimo-posteo">
                  <p dangerouslySetInnerHTML={{ __html: formatContent(item.content) }} />
                </div>
              </div>
              <div className="likes-comentarios">
                <div className="fecha">
                  <p>{moment(item.createdAt).fromNow()}</p>
                </div>
                <div className="fecha">
                  <FcLike className="icon-like-com" />
                  <p>{item.likes}</p>
                </div>
                <div className="fecha">
                  <FaCommentAlt className="icon-like-com" />
                  <p>{item.comments.length}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchFull
