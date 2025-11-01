'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'
import 'moment/locale/es'
import { Toaster } from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'
import { FaCommentAlt, FaHeart } from 'react-icons/fa'
import { MdSaveAlt } from 'react-icons/md'

import EstructuraCuerpo from '@/components/EstructuraCuerpo/EstructuraCuerpo'
import FooterInterior from '@/components/FooterInterior/FooterInterior'
import ItemComment from '@/components/ItemComment/ItemComment'
import { usePostDetail } from '@/presentation/hooks/usePostDetail'
import { useParams } from 'next/navigation'
import './PostDetail.scss'

const PostDetail = () => {
  const { post, user, likes, comments, loading, handleLike, handleSaveFavorite } = usePostDetail()
  const { id } = useParams() as { id: string }
  const [isOpenComment, setIsOpenComment] = useState(false)

  const formatContent = (content: string | undefined) => content?.replace(/\n/g, '<br />') || ''
  const formatName = (name: string) => name?.replace(/^(.)|\s(.)/g, s => s.toUpperCase()) || ''

  return (
    <EstructuraCuerpo
      detalle={true}
      childrenDetail={
        <>
          <div className="post-detail">
            <div className="detail-descripcion">
              {loading ? (
                <Skeleton height={19} width={100} />
              ) : (
                <h6 className="detail-descripcion-texto">{post?.categories?.toUpperCase()}</h6>
              )}
            </div>

            <div className="detail-titulo">
              {loading ? (
                <Skeleton className="detail-titulo-texto" height={40} count={3} />
              ) : (
                <h2 className="detail-titulo-texto">{post?.title}</h2>
              )}
            </div>

            <div className="detail-foto-fecha">
              {user?._id && (
                <Link href={`/blog/perfil/${user._id}`} className="detail-imagen">
                  <Image
                    src="/img/title-doraemon.jpg"
                    className="imagen-posteo"
                    alt="imagen-posteo"
                    width={44}
                    height={44}
                  />
                </Link>
              )}
              <div className="nombre-fecha">
                <div className="fecha-publicacion">
                  {user?._id && (
                    <Link href={`/blog/perfil/${user._id}`} className="link-link">
                      {formatName(user.name)}
                    </Link>
                  )}
                </div>
                <div className="mi-nombre">
                  <p>{formatName(moment(post?.createdAt).fromNow())}</p>
                </div>
              </div>
            </div>

            <div className="detail-likes-comments">
              <div className="contenedor-l-c">
                <div className="icono">
                  <div className="i-i" onClick={handleLike}>
                    <FaHeart className="icono-like" />
                  </div>
                  <div className="cantidad">
                    <p>{likes}</p>
                  </div>
                </div>
                <div className="icono" onClick={() => setIsOpenComment(true)}>
                  <div className="i-i">
                    <FaCommentAlt className="icono-like" />
                  </div>
                  <div className="cantidad">
                    <p>{comments}</p>
                  </div>
                </div>
              </div>
              <div className="contenedor-guardado" onClick={handleSaveFavorite}>
                <div className="save">
                  <MdSaveAlt className="icono-save" />
                </div>
              </div>
            </div>

            <div className="detail-content">
              {loading ? (
                <Skeleton height={25} count={30} />
              ) : (
                <p dangerouslySetInnerHTML={{ __html: formatContent(post?.content) }} />
              )}
            </div>
          </div>

          {isOpenComment && (
            <ItemComment setIsOpenComment={setIsOpenComment} posteo={post} id={id} />
          )}

          <FooterInterior dataPost={post} id={id} />
          <Toaster />
        </>
      }
    />
  )
}

export default PostDetail
