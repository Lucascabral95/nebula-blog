// "use client"
// import { useState } from 'react'
// import { signIn } from "next-auth/react"

// import EstructuraLoginRegister from '../EstructuraLoginRegister/EstructuraLoginRegister'
// import "../EstructuraLoginRegister/EstructuraLoginRegister.scss"

// const Credentials = () => {
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const [error, setError] = useState("")
//     const [showCredentials, setShowCredentials] = useState(false)

//     const ingresar = async (e) => {
//         e.preventDefault()

//         try {
//             const result = await signIn("credentials", {
//                 email: email,
//                 password: password,
//                 redirect: false
//             })

//             if (result.ok) {
//                 window.location.href = `/application/my-friends`;
//             } else if (result.error) {
//                 if (result.error === "El email o la contraseña son inválidos") {
//                     setError("Email o contraseña inválidos. Por favor, verifica tus datos.");
//                 } else if (result.error === "Contraseña incorrecta") {
//                     setError("La contraseña es incorrecta. Inténtalo nuevamente.");
//                 } else {
//                     setError("Ocurrió un error inesperado. Inténtalo más tarde.");
//                 }
//             }

//         } catch (error) {
//             setError("Ocurrió un error en el sistema. Inténtalo más tarde.");
//             console.log(error);
//         }
//     }

//     return (
//         <EstructuraLoginRegister>

//             <div className="titulo-normal">
//                 <h2> ¡Bievenido de nuevo! </h2>
//             </div>

//             <div className="texto-instruccion">
//                 <p> Ingresá tus credenciales de acceso </p>
//             </div>

//             <form onSubmit={ingresar} className='formulario-ddbb'>
//                 <div className="contenedor-de-inputs">
//                     <label htmlFor="email">Email</label>
//                     <div className="envoltura-de-input">
//                         <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                     </div>
//                 </div>
//                 <div className="contenedor-de-inputs">
//                     <label htmlFor="password">Password</label>
//                     <div className="envoltura-de-input">
//                         <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                     </div>
//                 </div>
//                 <button className='boton-para-ingresar' type="submit"> Ingresar </button>
//             </form>

//         </EstructuraLoginRegister>
//     )
// }

// export default Credentials;
'use client'

import { useCredentialsForm } from '@/presentation/hooks/useCredentialsForm'
import { CREDENTIALS_CONTENT } from '@/infrastructure/constants/credentials.constants'
import EstructuraLoginRegister from '../EstructuraLoginRegister/EstructuraLoginRegister'
import './EstructuraLoginRegister.scss'

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
