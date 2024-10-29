import "./EstructuraLoginRegister.scss"

const EstructuraLoginRegister = ({ children }) => {
  return (
    <div className="estructura-login-register">
      <div className="contenedor-estructura-login-register">

        {children}

      </div>
    </div>
  )
}

export default EstructuraLoginRegister