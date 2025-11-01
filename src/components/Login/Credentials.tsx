'use client'

import { useCredentialsForm } from '@/presentation/hooks/useCredentialsForm'
import { CREDENTIALS_CONTENT } from '@/infrastructure/constants/credentials.constants'
import EstructuraLoginRegister from '../EstructuraLoginRegister/EstructuraLoginRegister'
import '../EstructuraLoginRegister/EstructuraLoginRegister.scss'

const Credentials = () => {
  const { formData, error, handleChange, handleSubmit } = useCredentialsForm()

  return (
    <EstructuraLoginRegister>
      <div className="titulo-normal">
        <h2>{CREDENTIALS_CONTENT.TITLE}</h2>
      </div>

      <div className="texto-instruccion">
        <p>{CREDENTIALS_CONTENT.INSTRUCTION}</p>
      </div>

      <form onSubmit={handleSubmit} className="formulario-ddbb">
        <div className="contenedor-de-inputs">
          <label htmlFor="email">{CREDENTIALS_CONTENT.EMAIL_LABEL}</label>
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
          <label htmlFor="password">{CREDENTIALS_CONTENT.PASSWORD_LABEL}</label>
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
          {CREDENTIALS_CONTENT.LOGIN_BTN}
        </button>
      </form>
    </EstructuraLoginRegister>
  )
}

export default Credentials
