'use client'
import { useRouter } from 'next/navigation'
import moment from 'moment'
import 'moment/locale/es'
import { FcLike } from 'react-icons/fc'
import { FaCommentAlt } from 'react-icons/fa'

import EstructuraCuerpo from '@/components/EstructuraCuerpo/EstructuraCuerpo'
import EstructuraCuerpoInterior from '@/components/EstructuraCuerpoInterior/EstructuraCuerpoInterior'
import { useBlog } from '@/presentation/hooks/useBlog'
import './Blog.scss'

const Blog = () => {
  const router = useRouter()
  const { categories, displayPosts, search, currentPage, totalPages, handleCategoryClick, handleNextPage, setSearch } = useBlog()

  const formatContent = (content: string) => content?.replace(/\n/g, '<br />') || ''

  return (
    <EstructuraCuerpo>
      <EstructuraCuerpoInterior
        noticias={
          <>
            <div className="ultimas-noticias">
              <h4 className="text-ultimas-noticias">
                {search ? `Resultados de ${search}` : 'Últimas publicaciones'}
              </h4>
            </div>

            <div className="contenedor-ultimos-posteos">
              {displayPosts.map((post) => (
                <div key={post._id} onClick={() => setSearch('')} className="posteoss">
                  <div className="perfil-nombre-categoria">
                    <div className="perfil-nombre" />
                    <div className="pmc-categoria">
                      <div className="section-cat">
                        <p>{post.categories}</p>
                      </div>
                    </div>
                  </div>
                  <div className="titulo-contenido" onClick={() => router.push(`/blog/posteo/${post._id}`)}>
                    <div className="titulo-ultimo-posteo">
                      <h3>{post.title}</h3>
                    </div>
                    <div className="descripcion-ultimo-posteo">
                      <p dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
                    </div>
                  </div>
                  <div className="likes-comentarios">
                    <div className="fecha">
                      <p>{moment(post.createdAt).fromNow()}</p>
                    </div>
                    <div className="fecha">
                      <FcLike className="icon-like-com" />
                      <p>{post.likes}</p>
                    </div>
                    <div className="fecha">
                      <FaCommentAlt className="icon-like-com" />
                      <p>{post.comments.length}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > currentPage && displayPosts.length > 0 && (
              <div className="boton-de-mas" onClick={handleNextPage}>
                <button>Ver más</button>
              </div>
            )}
          </>
        }

        recomendaciones={
          <>
            <div className="temas-recomendados">
              <p>Temas recomendados</p>
            </div>
            <div className="temas">
              {categories.map((cat) => (
                <div key={cat._id} className="tema" onClick={() => handleCategoryClick(cat.name)}>
                  <p>{cat.name}</p>
                </div>
              ))}
            </div>
          </>
        }
      />
    </EstructuraCuerpo>
  )
}

export default Blog
