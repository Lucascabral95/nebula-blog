// "use client"
// import { useSession } from 'next-auth/react'
// import StructureConfigData from './StructureConfigData.jsx'

// const CuentaEmail = ({ setDataEmail }) => {
//     const { data: session } = useSession() 

//     return (
//         <StructureConfigData
//             titulo="Dirección de Email"
//             childrenInputs={
//                 <>
//                     <div className="contenedor-input-config">
//                         <div className="input-texto">
//                             <input type='text' value={session?.user?.email} readOnly />
//                         </div>
//                         <div className="texto-aclaratorio" style={{ padding: "8px 4px 0 4px" }}>
//                             <div className="aclaratorio">
//                                 <p style={{ textAlign: "center" }}> Podés iniciar sesión en Medium con esta dirección de correo electrónico. <strong> No es mutable</strong> </p>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             }
//             botones={
//                 <>
//                     <button className="boton-guardar" onClick={() => setDataEmail(false)}> Aceptar </button>
//                 </>
//             }
//         />
//     )
// }

// export default CuentaEmail;
'use client'

import { useSession } from 'next-auth/react'
import StructureConfigData from './StructureConfigData'

interface CuentaEmailProps {
  setDataEmail: (open: boolean) => void
}

const CuentaEmail = ({ setDataEmail }: CuentaEmailProps) => {
  const { data: session } = useSession()

  return (
    <StructureConfigData
      titulo="Dirección de Email"
      childrenInputs={
        <div className="contenedor-input-config">
          <div className="input-texto">
            <input type="text" value={session?.user?.email as undefined} readOnly />
          </div>
          <div className="texto-aclaratorio" style={{ padding: '8px 4px 0 4px' }}>
            <div className="aclaratorio">
              <p style={{ textAlign: 'center' }}>
                Podés iniciar sesión en Medium con esta dirección de correo electrónico.{' '}
                <strong>No es mutable</strong>
              </p>
            </div>
          </div>
        </div>
      }
      botones={
        <button className="boton-guardar" onClick={() => setDataEmail(false)}>
          Aceptar
        </button>
      }
    />
  )
}

export default CuentaEmail
