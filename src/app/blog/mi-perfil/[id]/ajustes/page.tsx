'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import 'moment/locale/es'
import { FaTrash } from 'react-icons/fa'
import { Toaster } from 'react-hot-toast'
import { useSession } from 'next-auth/react'

import EstructuraCuerpo from '@/components/EstructuraCuerpo/EstructuraCuerpo'
import EstructuraCuerpoInterior from '@/components/EstructuraCuerpoInterior/EstructuraCuerpoInterior'
import DataBio from '@/components/ConfigData/DataBio'
import DataDatos from '@/components/ConfigData/DataDatos'
import DataDireccion from '@/components/ConfigData/DataDireccion'
import CuentaEmail from '@/components/ConfigData/CuentaEmail'
import { useSettings } from '@/presentation/hooks/useSettings'
import PostItem from '@/presentation/components/Profile/PostItem'
import PerfilDeDatos from '@/app/blog/perfil/[id]/PerfilDeDatos'
import './Ajustes.scss'

const Ajustes = () => {
  const { data: session } = useSession()
  const { id } = useParams() as { id: string }
  const { currentSection, setCurrentSection, address, userPosts, favorites, modalState, openModal, closeModal, handleRemoveFavorite } = useSettings()

  const sectionStyle = (section: string) => ({
    borderBottom: currentSection === section ? '0.4px solid black' : 'none',
  })

  const sectionColor = (section: string) => ({
    color: currentSection === section ? 'black' : 'var(--font-color-principal-dentro)',
  })

  const formatContent = (content: string) => content?.replace(/\n/g, '<br />') || ''

  return (
    <EstructuraCuerpo>
      <EstructuraCuerpoInterior
        noticias={
          <>
            <div className="perfil-titulo">
              <h2 className="perfil-titulo-texto">Configuración</h2>
            </div>

            <div className="secciones-perfil">
              <div className="seccion" style={sectionStyle('cuenta')} onClick={() => setCurrentSection('cuenta')}>
                <p style={sectionColor('cuenta')}>Cuenta</p>
              </div>
              <div className="seccion" style={sectionStyle('publicaciones')} onClick={() => setCurrentSection('publicaciones')}>
                <p style={sectionColor('publicaciones')}>Mis Publicaciones</p>
              </div>
              <div className="seccion" style={sectionStyle('publicacionesguardadas')} onClick={() => setCurrentSection('publicacionesguardadas')}>
                <p style={sectionColor('publicacionesguardadas')}>Publicaciones Guardadas</p>
              </div>
            </div>

            {currentSection === 'cuenta' && (
              <div className="informacion-perfil">
                <div className="contenedor-informacion-perfil-perfil" onClick={() => openModal('email')}>
                  <div className="perfil-secciones">
                    <div className="seccion">
                      <div className="tipo">
                        <div className="div-tipo-texto">
                          <p className="tipo-texto">Dirección de Email</p>
                        </div>
                      </div>
                      <div className="tipo">
                        <p className="tipo-valor">{session?.user?.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contenedor-informacion-perfil-perfil" onClick={() => openModal('bio')}>
                  <div className="perfil-secciones">
                    <div className="seccion">
                      <div className="tipo">
                        <div className="div-tipo-texto">
                          <p className="tipo-texto">Perfil</p>
                        </div>
                        <div className="div-tipo-texto">
                          <p className="tipo-info">Editá tu nombre completo, tus pronombres y tu biografía</p>
                        </div>
                      </div>
                      <div className="tipo-valor-foto">
                        <p className="tipo-valor">{session?.user?.email}</p>
                        <Image
                          src={session?.user?.image || '/img/title-doraemon.jpg'}
                          width={24}
                          height={24}
                          alt="Perfil"
                          className="tipo-valor-foto-photo"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contenedor-informacion-perfil-perfil" onClick={() => openModal('direccion')}>
                  <div className="perfil-secciones">
                    <div className="seccion">
                      <div className="tipo">
                        <div className="div-tipo-texto">
                          <p className="tipo-texto">Detalles de dirección</p>
                        </div>
                      </div>
                      <div className="tipo">
                        <p className="tipo-valor">{address || 'Tu dirección'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contenedor-informacion-perfil-perfil" onClick={() => openModal('datos')}>
                  <div className="perfil-secciones">
                    <div className="seccion">
                      <div className="tipo">
                        <div className="div-tipo-texto">
                          <p className="tipo-texto">Datos personales</p>
                        </div>
                      </div>
                      <div className="tipo">
                        <p className="tipo-valor">Datos claves</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentSection === 'publicaciones' && (
              <div className="contenedor-ultimos-posteos">
                <div className="titulo-seccion-perfil">
                  <div className="tit">
                    <h2 className="tit-titulo">{userPosts.length > 0 ? 'Mis publicaciones' : 'No realizaste ninguna publicación'}</h2>
                  </div>
                </div>
                {userPosts.map(post => <PostItem key={post._id} post={post} />)}
              </div>
            )}

            {currentSection === 'publicacionesguardadas' && (
              <div className="contenedor-ultimos-posteos">
                <div className="titulo-seccion-perfil">
                  <div className="tit">
                    <h2 className="tit-titulo">{favorites.length > 0 ? 'Publicaciones guardadas' : 'No hay publicaciones guardadas'}</h2>
                  </div>
                </div>
                {favorites.map(post => (
                  <div key={post._id} className="posteoss">
                    <div className="perfil-nombre-categoria">
                      <div className="perfil-nombre">
                        <Link href={`/blog/perfil/${post.author[0]._id}`} className="imagen">
                          <Image className="imagen-imagen" src="/img/title-doraemon.jpg" alt="Perfil" width={20} height={20} />
                        </Link>
                        <Link href={`/blog/perfil/${post.author[0]._id}`} className="nombre">
                          <p>{post.author[0].email}</p>
                        </Link>
                      </div>
                      <div className="pmc-categoria pmc-categoria-trash" onClick={() => handleRemoveFavorite(post._id)}>
                        <div className="contenedor-de-icono-trash">
                          <FaTrash className="icono-trash" />
                        </div>
                      </div>
                    </div>
                    <PostItem post={post} />
                  </div>
                ))}
                <Toaster />
              </div>
            )}

            {modalState.bio && <DataBio setIsOpenDataBio={() => closeModal('bio')} />}
            {modalState.datos && <DataDatos setDataDatos={() => closeModal('datos')} />}
            {modalState.direccion && <DataDireccion setDataDireccion={() => closeModal('direccion')} />}
            {modalState.email && <CuentaEmail setDataEmail={() => closeModal('email')} />}
          </>
        }
        recomendaciones={<PerfilDeDatos dataMyPosts={userPosts} id={id} />}
      />
    </EstructuraCuerpo>
  )
}

export default Ajustes
