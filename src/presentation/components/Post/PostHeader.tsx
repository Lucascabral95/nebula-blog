'use client'
import Link from 'next/link'

import { NEW_POST_CONTENT } from '@/infrastructure/constants'

interface PostHeaderProps {
  email: string | null | undefined
  onPublish: () => void
}

export const PostHeader = ({ email, onPublish }: PostHeaderProps) => {
  return (
    <div className="header-posteo">
      <div className="logo-posteo">
        <Link href="/blog" className="tituloo">
          <h2>{NEW_POST_CONTENT.LOGO}</h2>
        </Link>
        <div className="descripcion">
          <p>{NEW_POST_CONTENT.WRITING_BY} {email}</p>
        </div>
      </div>
      <div className="publicacion-posteo">
        <button className="boton-publicar" onClick={onPublish}>
          {NEW_POST_CONTENT.PUBLISH_BTN}
        </button>
      </div>
    </div>
  )
}
