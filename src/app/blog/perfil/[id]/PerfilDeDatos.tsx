'use client'

import { FaHome, FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import Image from 'next/image'
import { useProfile } from '@/presentation/hooks/useProfile'
import { IPost } from '@/infrastructure/interfaces/blog.interface'

interface PerfilDeDatosProps {
  //dataMyPosts: IPost[]
  dataMyPosts: any[]
  // datosDelUsuario: IIUser
  datosDelUsuario?: any 
  id: string 
}

const PerfilDeDatos = ({ dataMyPosts, datosDelUsuario, id }: PerfilDeDatosProps) => {
  const { bio, address, details } = useProfile(id)

  const getPublicationText = () => {
    if (dataMyPosts?.length === 0) return 'Sin publicaciones'
    if (dataMyPosts?.length === 1) return '1 publicacion'
    return `${dataMyPosts?.length} publicaciones`
  }

  const bioText = bio?.bio || 'Ninguna descripcion por el momento...'

  return (
    <>
      <div className="contenedor-foto-perfil">
        <div className="foto-foto">
          <Image
            src="/img/title-doraemon.jpg"
            alt="Perfil"
            width={88}
            height={88}
            className="foto-foto-foto"
          />
        </div>
      </div>

      <div className="perfil-nombre">
        <p>{datosDelUsuario?.name}</p>
      </div>

      <div className="publish">
        <p>{getPublicationText()}</p>
      </div>

      <div className="descripcion-perfil" style={{ marginBottom: '16px' }}>
        <p>{bioText}</p>
      </div>

      {address?.partido && address?.provincia && address?.pais && (
        <div className="descripcion-icono-texto">
          <div className="icono">
            <FaHome className="icono-seccion" />
          </div>
          <p>{`${address.partido}, ${address.provincia}, ${address.pais}`}</p>
        </div>
      )}

      {details?.email && (
        <div className="descripcion-icono-texto">
          <div className="icono">
            <MdEmail className="icono-seccion" />
          </div>
          <p>{details.email}</p>
        </div>
      )}

      {details?.github && (
        <div className="descripcion-icono-texto">
          <div className="icono">
            <FaGithub className="icono-seccion" />
          </div>
          <p>
            <a
              rel="noreferrer"
              className="link-a-redes"
              href={`https://github.com/${details.github}`}
              target="_blank"
            >
              https://github.com/{details.github}
            </a>
          </p>
        </div>
      )}

      {details?.linkeding && (
        <div className="descripcion-icono-texto">
          <div className="icono">
            <FaLinkedin className="icono-seccion" />
          </div>
          <p>
            <a
              rel="noreferrer"
              className="link-a-redes"
              href={details.linkeding}
              target="_blank"
            >
              https://www.linkedin.com/in/{details.linkeding}
            </a>
          </p>
        </div>
      )}
    </>
  )
}

export default PerfilDeDatos
