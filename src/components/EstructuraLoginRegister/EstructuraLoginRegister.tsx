import { ReactNode } from 'react'

import './EstructuraLoginRegister.scss'

interface EstructuraLoginRegisterProps {
  children: ReactNode
}

const EstructuraLoginRegister = ({ children }: EstructuraLoginRegisterProps) => {
  return (
    <div className="estructura-login-register">
      <div className="contenedor-estructura-login-register">
        {children}
      </div>
    </div>
  )
}

export default EstructuraLoginRegister
