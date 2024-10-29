"use client"
import Link from "next/link"
import { useState } from "react"
import Login from "@/components/Login/Login"
import Register from "@/components/Register/Register"
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Home = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false)
  const [isOpenRegister, setIsOpenRegister] = useState(false)

  return (
    <div className='home'>
      <div className='contenedor-de-home'>

        <header className="header-inicio">
          <div className="contenedor-header-inicio">
            <div className="logo">
              <Link href="/" className="logo-titulo"> Nebula </Link>
            </div>
            <div className="secciones">
              <div className="entrada" onClick={() => setIsOpenRegister(true)}>
                <button className="seccion-normal"> Registrarme </button>
              </div>
              <div className="seccion-entrada" onClick={() => setIsOpenLogin(true)}>
                <button className="boton-entrada"> Iniciar sesión </button>
              </div>
            </div>
          </div>
        </header>

        <main className="main-inicio">
          <div className="contenedor-main-inicio">

            <div className="contenedor-ideas">
              <div className="subtitulo">
                <h2 className="subtitulo-texto"> Ideas y reflexiones humanas </h2>
              </div>
              <div className="descripcion">
                <h2 className="descripcion-texto"> Un espacio para leer, escribir y ampliar tu comprensión. </h2>
              </div>
              <div className="boton-de-comienzo">
                <button className="comienzo" onClick={() => setIsOpenLogin(true)}> Comenzar a leer </button>
              </div>
            </div>

          </div>
        </main>

        <footer className="footer-inicio">
          <div className="contenedor-footer-inicio">
            <div className="secciones-footer-yo">
              <p> Powered By <a target="_blank" rel="noreferrer" href="https://github.com/Lucascabral95"> Lucas Cabral</a> - 2024 </p>
            </div>
            <div className="secciones-foo-yo">
              <a href="https://github.com/Lucascabral95" target="_blank" rel="noreferrer" className="link-footer-inicio">
                <div className="section-footer">
                  <div className="texto">
                    <p> Github </p>
                  </div>
                  <div className="icono">
                    <FaGithub className="icono-footer" />
                  </div>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/lucas-gast%C3%B3n-cabral/" target="_blank" rel="noreferrer" className="link-footer-inicio">
                <div className="section-footer">
                  <div className="texto">
                    <p> Linkedin </p>
                  </div>
                  <div className="icono">
                    <FaLinkedin className="icono-footer" />
                  </div>
                </div>
              </a>
              <a href="https://instagram.com/lucascabral95" target="_blank" rel="noreferrer" className="link-footer-inicio">
                <div className="section-footer">
                  <div className="texto">
                    <p> Instagram </p>
                  </div>
                  <div className="icono">
                    <FaInstagram className="icono-footer" />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </footer>

        {isOpenLogin && <Login setIsOpenRegister={setIsOpenRegister} setIsOpenLogin={setIsOpenLogin} />}
        {isOpenRegister && <Register setIsOpenLogin={setIsOpenLogin} setIsOpenRegister={setIsOpenRegister} />}

      </div>
    </div>
  )
}

export default Home