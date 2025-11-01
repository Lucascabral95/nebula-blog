'use client'

import { AUTHOR, NEW_POST_CONTENT, SOCIAL_LINKS } from '@/infrastructure/constants'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'

const ICON_MAP = {
  github: FaGithub,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
} as const

export const PostFooter = () => {
  return (
    <div className="footer-inferior">
      <div className="contenedor-footer-inferior">
        <div className="footer-secciones">
          <div className="presentacion-mia">
            <p>
              {NEW_POST_CONTENT.POWERED_BY}{' '}
              <a rel="noreferrer" className="link-mio" target="_blank" href={AUTHOR.github}>
                {AUTHOR.name}
              </a>{' '}
              - {NEW_POST_CONTENT.YEAR}
            </p>
          </div>
          <div className="seccion-redes">
            {SOCIAL_LINKS.map(link => {
              const IconComponent = ICON_MAP[link.icon as keyof typeof ICON_MAP]
              return (
                <div key={link.name} className="seccion">
                  <a href={link.url} target="_blank" rel="noreferrer">
                    <div className="icono">
                      <IconComponent className="icono-seccion" />
                    </div>
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
