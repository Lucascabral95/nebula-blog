'use client'

import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'
import 'moment/locale/es'
import { FcLike } from 'react-icons/fc'
import { FaCommentAlt } from 'react-icons/fa'

import { IProfilePost } from '@/infrastructure/interfaces'

interface PostItemProps {
  // post: IProfilePost 
  post: any 
  showDelete?: boolean
  onDelete?: (id: string) => void
}

const PostItem = ({ post, showDelete, onDelete }: PostItemProps) => {
  const formatContent = (content: string) => content?.replace(/\n/g, '<br />') || ''

  return (
    <Link href={`/blog/posteo/${post._id}`} className="posteoss">
      <div className="perfil-nombre-categoria">
        <div className="perfil-nombre">
          <Link href={`/blog/perfil/${post.author[0]._id}`} className="imagen">
            <Image className="imagen-imagen" src="/img/title-doraemon.jpg" alt="Perfil" width={20} height={20} />
          </Link>
          <Link href={`/blog/perfil/${post.author[0]._id}`} className="nombre">
            <p>{post.author[0].email}</p>
          </Link>
        </div>
        <div className="pmc-categoria">
          <div className="section-cat">
            <p>{post.categories}</p>
          </div>
        </div>
      </div>
      <div className="titulo-contenido">
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
    </Link>
  )
}

export default PostItem
