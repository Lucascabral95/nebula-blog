'use client'
import { IoClose } from 'react-icons/io5'
import { CiMail } from 'react-icons/ci'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'
import { motion } from 'framer-motion'

import { useLoginForm } from '@/presentation/hooks/useLoginForm'
import { LOGIN_CONTENT } from '@/infrastructure/constants/login.constants'
import EstructuraLoginRegister from '../EstructuraLoginRegister/EstructuraLoginRegister'
import "../EstructuraLoginRegister/EstructuraLoginRegister.scss"

interface LoginProps {
  setIsOpenLogin: (open: boolean) => void
  setIsOpenRegister: (open: boolean) => void
}

const Login = ({ setIsOpenLogin, setIsOpenRegister }: LoginProps) => {
  const { formData, error, isOpenInputs, handleChange, handleSubmit, handleShowInputs } =
    useLoginForm()

  const closeModals = () => {
    setIsOpenLogin(false)
    setIsOpenRegister(false)
  }

  const switchToRegister = () => {
    setIsOpenLogin(false)
    setIsOpenRegister(true)
  }

  return (
    <EstructuraLoginRegister>
      <div className="contenedor-de-boton">
        <div className="cont">
          <IoClose className="close-icon" onClick={closeModals} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        //className="div-login"
      >
        <div className="div-login">
        <div className="login-titulo">
          <h2>{LOGIN_CONTENT.TITLE}</h2>
        </div>

        <div className="botones">
          <button className="boton-generico" onClick={() => signIn('google')}>
            <div className="icono-boton-google">
              <FcGoogle className="icon" />
            </div>
            <div className="texto">
              <p>{LOGIN_CONTENT.GOOGLE_BTN}</p>
            </div>
          </button>

          {!isOpenInputs && (
            <button className="boton-generico" onClick={handleShowInputs}>
              <div className="icono-boton">
                <CiMail className="icon" />
              </div>
              <div className="texto">
                <p>{LOGIN_CONTENT.EMAIL_BTN}</p>
              </div>
            </button>
          )}
        </div>

        {isOpenInputs && (
          <>
            <div className="titulo-dee-logueo">
              <h3>{LOGIN_CONTENT.CREDENTIALS_TITLE}</h3>
            </div>

            <form onSubmit={handleSubmit} className="formulario-ddbb">
              <div className="contenedor-de-inputs">
                <label htmlFor="email">{LOGIN_CONTENT.EMAIL_LABEL}</label>
                <div className="envoltura-de-input">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    />
                </div>
              </div>

              <div className="contenedor-de-inputs">
                <label htmlFor="password">{LOGIN_CONTENT.PASSWORD_LABEL}</label>
                <div className="envoltura-de-input">
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    required
                    />
                </div>
              </div>

              {error && <p className="error">{error}</p>}

              <button className="boton-para-ingresar" type="submit">
                {LOGIN_CONTENT.LOGIN_BTN}
              </button>
            </form>
          </>
        )}

        <div className="confirmacion">
          <p>{LOGIN_CONTENT.NO_ACCOUNT}</p>
        </div>

        <div className="confirmacion-boton">
          <button className="link-acceso" onClick={switchToRegister}>
            {LOGIN_CONTENT.REGISTER_BTN}
          </button>
        </div>

        <div className="terminos-condiciones">
          <p>{LOGIN_CONTENT.TERMS}</p>
        </div>
        </div>
      </motion.div>
    </EstructuraLoginRegister>
  )
}

export default Login
