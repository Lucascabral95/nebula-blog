'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'

import { useFooterAuthor } from '@/presentation/hooks/useFooterAuthor'
import { AUTHOR_INFO } from '@/infrastructure/constants'
import './FooterInterior.scss'

interface FooterInteriorProps {
  dataPost: any
  id: string
}

const FooterInterior = ({ dataPost, id }: FooterInteriorProps) => {
  const { authorData } = useFooterAuthor(id)

  const getAuthorImage = () => dataPost?.author?.[0]?.avatar || '/img/title-doraemon.jpg'

  const getAuthorName = () => {
    if (authorData?.nombreCompleto) return authorData.nombreCompleto
    if (dataPost?.author?.[0]?.name) {
      return dataPost.author[0].name.replace(/\b\w/g, (char: any) => char.toUpperCase())
    }
    return 'Nombre no disponible'
  }

  const getAuthorBio = () => authorData?.bio || 'Sin biografía por el momento...'

  return (
    <footer className="footer-interior-oficial">
      <div className="contenedor-footer-interior-oficial">
        <div className="footer-superior">
          <div className="contenedor-footer-superior">
            <div className="footer-foto">
              <Link href={`/blog/perfil/${authorData?.user}`} className="foto">
                <Image
                  src={getAuthorImage()}
                  width={70}
                  height={70}
                  alt="Perfil"
                  className="footer-logo"
                />
              </Link>
            </div>

            <Link href={`/blog/perfil/${authorData?.user}`} className="footer-nombre">
              <p>{getAuthorName()}</p>
            </Link>

            <div className="footer-descripcion">
              <p>{getAuthorBio()}</p>
            </div>
          </div>
        </div>

        <div className="footer-inferior">
          <div className="contenedor-footer-inferior">
            <div className="footer-secciones">
              <div className="presentacion-mia">
                <p>
                  Powered by{' '}
                  <a rel="noreferrer" className="link-mio" target="_blank" href={AUTHOR_INFO.github}>
                    {AUTHOR_INFO.name}
                  </a>{' '}
                  - {AUTHOR_INFO.year}
                </p>
              </div>
              <div className="seccion-redes">
                <div className="seccion">
                  <a href={AUTHOR_INFO.github} target="_blank" rel="noreferrer">
                    <div className="icono">
                      <FaGithub className="icono-seccion" />
                    </div>
                  </a>
                </div>
                <div className="seccion">
                  <a href={AUTHOR_INFO.instagram} target="_blank" rel="noreferrer">
                    <div className="icono">
                      <FaInstagram className="icono-seccion" />
                    </div>
                  </a>
                </div>
                <div className="seccion">
                  <a href={AUTHOR_INFO.linkedin} target="_blank" rel="noreferrer">
                    <div className="icono">
                      <FaLinkedin className="icono-seccion" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterInterior
