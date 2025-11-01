import { signIn } from 'next-auth/react'
import { IoClose } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'

import { useRegisterForm } from '@/presentation/hooks/useRegisterForm'
import { REGISTER_CONTENT } from '@/infrastructure/constants/auth.constants'
import EstructuraLoginRegister from '../EstructuraLoginRegister/EstructuraLoginRegister'
import "../EstructuraLoginRegister/EstructuraLoginRegister.scss"

interface RegisterProps {
  setIsOpenRegister: (open: boolean) => void
  setIsOpenLogin: (open: boolean) => void
}

const Register = ({ setIsOpenRegister, setIsOpenLogin }: RegisterProps) => {
  const { formData, error, handleChange, handleSubmit } = useRegisterForm()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await handleSubmit(e)
    if (success) {
      setIsOpenRegister(false)
      setIsOpenLogin(true)
    }
  }

  const closeModals = () => {
    setIsOpenLogin(false)
    setIsOpenRegister(false)
  }

  const switchToLogin = () => {
    setIsOpenLogin(true)
    setIsOpenRegister(false)
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
      >
        <div className="div-login">
        <div className="login-titulo">
          <h2>{REGISTER_CONTENT.WELCOME}</h2>
        </div>

        <div className="titulo-dee-registro">
          <h3>{REGISTER_CONTENT.CREATE_ACCOUNT}</h3>
        </div>

        <form onSubmit={onSubmit} className="formulario-ddbb">
          <div className="contenedor-de-inputs">
            <label htmlFor="name">{REGISTER_CONTENT.NAME_LABEL}</label>
            <div className="envoltura-de-input">
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="contenedor-de-inputs">
            <label htmlFor="email">{REGISTER_CONTENT.EMAIL_LABEL}</label>
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
            <label htmlFor="password">{REGISTER_CONTENT.PASSWORD_LABEL}</label>
            <div className="envoltura-de-input">
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                required
              />
            </div>
            <p className="aclaracion-texto">{REGISTER_CONTENT.PASSWORD_HINT}</p>
          </div>

          {error && <p className="error">{error}</p>}

          <button className="boton-para-ingresar" type="submit">
            {REGISTER_CONTENT.REGISTER_BTN}
          </button>
        </form>

        <div className="botones" style={{ marginTop: '12px' }}>
          <button className="boton-generico" onClick={() => signIn('google')}>
            <div className="icono-boton-google">
              <FcGoogle className="icon" />
            </div>
            <div className="texto">
              <p>{REGISTER_CONTENT.GOOGLE_BTN}</p>
            </div>
          </button>
        </div>

        <div className="confirmacion">
          <p>{REGISTER_CONTENT.HAVE_ACCOUNT}</p>
        </div>

        <div className="confirmacion-boton">
          <button className="link-acceso" onClick={switchToLogin}>
            {REGISTER_CONTENT.LOGIN_BTN}
          </button>
        </div>

        <div className="terminos-condiciones">
          <p>{REGISTER_CONTENT.TERMS}</p>
        </div>
        </div>
      </motion.div>
    </EstructuraLoginRegister>
  )
}

export default Register
