'use client'
import Image from 'next/image'
import Link from 'next/link'

import { IMAGES, NOT_FOUND_MESSAGES } from '@/infrastructure/constants'

interface NotFoundContentProps {
  redirectPath: string
  buttonText: string
}

export const NotFoundContent = ({ redirectPath, buttonText }: NotFoundContentProps) => {
  return (
    <div className="notFound">
      <div className="contenedor-notFound">
        <div className="titulo-not-found">
          <h2 className="titulo">{NOT_FOUND_MESSAGES.TITLE}</h2>
        </div>

        <div className="imagen-not-found">
          <Image
            src={IMAGES.NOT_FOUND}
            className="imagen"
            width={500}
            height={500}
            alt={NOT_FOUND_MESSAGES.TITLE}
            priority
          />
        </div>

        <div className="boton-redireccion">
          <Link className="link-pagina-principal" href={redirectPath}>
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  )
}
