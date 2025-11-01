'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { useModal } from '@/presentation/context/ModalContext'
import Login from '@/components/Login/Login'
import Register from '@/components/Register/Register'
import './App.scss'

const Home = () => {
  const { isLoginOpen, isRegisterOpen, openLogin, openRegister, closeLogin, closeRegister, switchToLogin, switchToRegister } = useModal()

  return (
    <div className='home'>
      <div className='contenedor-de-home'>
        
        <header className="header-inicio">
          <div className="contenedor-header-inicio">
            <div className="logo">
              <Link href="/" className="logo-titulo">Nebula</Link>
            </div>
            <div className="secciones">
              <div className="entrada" onClick={openRegister}>
                <button className="seccion-normal">Registrarme</button>
              </div>
              <div className="seccion-entrada" onClick={openLogin}>
                <button className="boton-entrada">Iniciar sesión</button>
              </div>
            </div>
          </div>
        </header>

        <main className="main-inicio">
          <div className="contenedor-main-inicio">
            <div className="contenedor-ideas">
              <div className="parte">
                <div className="subtitulo">
                  <h2 className="subtitulo-texto">Ideas y reflexiones humanas</h2>
                </div>
                <div className="descripcion">
                  <h2 className="descripcion-texto">Un espacio para leer, escribir y ampliar tu comprensión.</h2>
                </div>
                <div className="boton-de-comienzo">
                  <button className="comienzo" onClick={openLogin}>Comenzar a leer</button>
                </div>
              </div>
              <div className="parte">
                <div className="imagen-absoluta">
                  <Image src="/img/dibujo-login.png" className="imagen" width={500} height={500} alt="Imagen de inicio" priority />
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="footer-inicio">
          <div className="contenedor-footer-inicio">
            <div className="secciones-footer-yo">
              <p>Powered By <a target="_blank" rel="noreferrer" href="https://github.com/Lucascabral95">Lucas Cabral</a> - 2024</p>
            </div>
            <div className="secciones-foo-yo">
              <a href="https://github.com/Lucascabral95" target="_blank" rel="noreferrer" className="link-footer-inicio">
                <div className="section-footer">
                  <div className="texto"><p>Github</p></div>
                  <div className="icono"><FaGithub className="icono-footer" /></div>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/lucas-gast%C3%B3n-cabral/" target="_blank" rel="noreferrer" className="link-footer-inicio">
                <div className="section-footer">
                  <div className="texto"><p>Linkedin</p></div>
                  <div className="icono"><FaLinkedin className="icono-footer" /></div>
                </div>
              </a>
              <a href="https://instagram.com/lucascabral95" target="_blank" rel="noreferrer" className="link-footer-inicio">
                <div className="section-footer">
                  <div className="texto"><p>Instagram</p></div>
                  <div className="icono"><FaInstagram className="icono-footer" /></div>
                </div>
              </a>
            </div>
          </div>
        </footer>

        {isLoginOpen && <Login setIsOpenRegister={switchToRegister} setIsOpenLogin={closeLogin} />}
        {isRegisterOpen && <Register setIsOpenLogin={switchToLogin} setIsOpenRegister={closeRegister} />}

      </div>
    </div>
  )
}

export default Home
