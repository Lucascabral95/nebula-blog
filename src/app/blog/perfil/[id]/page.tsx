'use client'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'
import 'moment/locale/es'
import { FaTrash } from 'react-icons/fa'
import { Toaster } from 'react-hot-toast'

import EstructuraCuerpo from '@/components/EstructuraCuerpo/EstructuraCuerpo'
import EstructuraCuerpoInterior from '@/components/EstructuraCuerpoInterior/EstructuraCuerpoInterior'
import { useUserProfile } from '@/presentation/hooks/useUserProfile'
import PerfilDeDatos from './PerfilDeDatos'
import PostItem from '@/presentation/components/Profile/PostItem'
import "@/components/EstructuraCuerpo/EstructuraCuerpo.scss"

const Perfil = () => {
  const {
    posts = [],
    user,
    favorites = [],
    currentSection,
    setCurrentSection,
    handleRemoveFavorite,
    isOwnProfile
  } = useUserProfile()

  const sectionStyle = (section: string) => ({
    borderBottom: currentSection === section ? '0.4px solid black' : 'none',
  })

  const sectionColor = (section: string) => ({
    color: currentSection === section ? 'black' : 'var(--font-color-principal-dentro)',
  })

  return (
    <EstructuraCuerpo>
      <EstructuraCuerpoInterior
        noticias={
          <>
            <div className="perfil-titulo">
              <h2 className="perfil-titulo-texto">{user?.name}</h2>
            </div>

            <div className="secciones-perfil">
              <div className="seccion" style={sectionStyle('publicaciones')} onClick={() => setCurrentSection('publicaciones')}>
                <p style={sectionColor('publicaciones')}>Publicaciones</p>
              </div>
              <div className="seccion" style={sectionStyle('acerca-de-mi')} onClick={() => setCurrentSection('acerca-de-mi')}>
                <p style={sectionColor('acerca-de-mi')}>Acerca de mí</p>
              </div>
              {isOwnProfile && (
                <div className="seccion" style={sectionStyle('publicacionesGuardadas')} onClick={() => setCurrentSection('publicacionesGuardadas')}>
                  <p style={sectionColor('publicacionesGuardadas')}>Publicaciones guardadas</p>
                </div>
              )}
            </div>

            {currentSection === 'publicaciones' && (
              <div className="contenedor-ultimos-posteos">
                {posts.length === 0 ? (
                  <div className="tit">
                    <h2 className="tit-tiulo">No realizaste ninguna publicación</h2>
                  </div>
                ) : (
                  posts.map(post => <PostItem key={post._id} post={post} />)
                )}
              </div>
            )}

            {currentSection === 'acerca-de-mi' && (
              <div className="contenedor-contenido-perfil">
                <div className="about">
                  <p>Miembro de Nebula Blog desde el {moment(user?.createdAt).format('LL')}</p>
                </div>
                <div className="about-publicaciones" onClick={() => setCurrentSection('publicaciones')}>
                  <p>{posts.length} publicaciones</p>
                </div>
              </div>
            )}

            {currentSection === 'publicacionesGuardadas' && (
              <div className="contenedor-ultimos-posteos">
                {favorites.length > 0 && (
                  <div className="titulo-seccion-perfil" style={{ borderBottom: '1px solid #e5e5e5', padding: '0 0 16px 0' }}>
                    <div className="tit">
                      <h2 className="tit-titulo">Publicaciones guardadas</h2>
                    </div>
                  </div>
                )}
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
          </>
        }
        recomendaciones={
          <>
            <PerfilDeDatos dataMyPosts={posts} datosDelUsuario={user} id={user?._id as any} />
            {isOwnProfile && (
              <Link href={`/blog/mi-perfil/${user?._id}/ajustes`} className="editar-perfil">
                <p>Editar perfil</p>
              </Link>
            )}
          </>
        }
      />
    </EstructuraCuerpo>
  )
}

export default Perfil
