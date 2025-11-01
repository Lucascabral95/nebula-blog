// "use client"
// import { useEffect, useState } from 'react'
// import { useSession } from 'next-auth/react'
// import toast, { Toaster } from 'react-hot-toast'
// import axios from 'axios'

// import StructureConfigData from './StructureConfigData'

// const DataDatos = ({ setDataDatos }) => {
//     const { data: session } = useSession()
//     const [email, setEmail] = useState("")
//     const [celular, setCelular] = useState(null)
//     const [fechaNacimiento, setFechaNacimiento] = useState(null)
//     const [genero, setGenero] = useState("")
//     const [linkeding, setLinkeding] = useState("")
//     const [github, setGithub] = useState("")
//     const [datosIngresados, setDatosIngresados] = useState([])
//     const [hayDatosIngresados, setHayDatosIngresados] = useState(false)

//     const enviarDatos = async (e) => {
//         e.preventDefault()

//         try {
//             const method = hayDatosIngresados ? "put" : "post"
//             const result = await axios[method]('/api/detalles/detalles', {
//                 user: session?.user?.id,
//                 email: email,
//                 celular: celular,
//                 fechaNacimiento: fechaNacimiento,
//                 genero: genero,
//                 linkeding: linkeding,
//                 github: github
//             })

//             if (result.status === 200 || result.status === 201) {
//                 toast.success(hayDatosIngresados ? "Datos actualizadas exitosamente" : "Datos guardadas exitosamente")
//                 setTimeout(() => {
//                     setDataDatos(false)
//                 }, 1400);
//             }

//         } catch (error) {
//             if (error.response) {
//                 const { status, data } = error.response
//                 console.error(`Error ${status}: ${data.error}`)
//                 toast.error(`Error ${status}: ${data.error}`)
//             } else {
//                 console.error('Error de red o solicitud fallida:', error.message)
//             }
//         }
//     }

//     useEffect(() => {
//         const obtenerDatos = async () => {
//             try {
//                 const result = await axios.get(`/api/detalles/detalles?id=${session?.user?.id}`)

//                 if (result.status === 200 || result.status === 201) {
//                     console.log(result.data.result)
//                     setHayDatosIngresados(true)
//                     setDatosIngresados(result.data.result)
//                 }
//             } catch (error) {
//                 console.error('Error de red o solicitud fallida:', error.message)
//             }
//         }

//         obtenerDatos()
//     }, [])

//     return (
//         <StructureConfigData
//             titulo="Datos personales"

//             childrenInputs={
//                 <>
//                     <div className="contenedor-input-config">
//                         <div className="duo-contenedor">
//                             <div className="contenenedor-internoo">
//                                 <div className="label">
//                                     <label htmlFor="email">Email</label>
//                                 </div>
//                                 <div className="input-text">
//                                     <input type="email" id="email" value={email}
//                                         onChange={(e) => setEmail(e.target.value)} placeholder={datosIngresados.email ? datosIngresados.email : 'NextJS@hotmail.com'} required />
//                                 </div>
//                             </div>
//                             <div className="contenenedor-internoo">
//                                 <div className="label">
//                                     <label htmlFor="celular">Celular</label>
//                                 </div>
//                                 <div className="input-text">
//                                     <input type="number" id="celular" value={celular}
//                                         onChange={(e) => setCelular(e.target.value)} placeholder={datosIngresados.celular ? datosIngresados.celular : '123456789'} required />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="duo-contenedor">
//                             <div className="contenenedor-internoo">
//                                 <div className="label">
//                                     <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
//                                 </div>
//                                 <div className="input-text">
//                                     <input type="text" id="fechaNacimiento" value={fechaNacimiento}
//                                         onChange={(e) => setFechaNacimiento(e.target.value)} placeholder={datosIngresados.fechaNacimiento ? datosIngresados.fechaNacimiento : 'dd/mm/aaaa'} required />
//                                 </div>
//                             </div>
//                             <div className="contenenedor-internoo">
//                                 <div className="label">
//                                     <label htmlFor="genero">Genero</label>
//                                 </div>
//                                 <div className="input-text">
//                                     <input type="text" id="genero" value={genero}
//                                         onChange={(e) => setGenero(e.target.value)} placeholder={datosIngresados.genero ? datosIngresados.genero : 'Masculino/Femenino'} required />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="duo-contenedor">
//                             <div className="contenenedor-internoo">
//                                 <div className="label">
//                                     <label htmlFor="linkedin">Linkedin</label>
//                                 </div>
//                                 <div className="input-text">
//                                     <input type="text" id="linkedin" value={linkeding}
//                                         onChange={(e) => setLinkeding(e.target.value)} placeholder={datosIngresados.linkedin ? datosIngresados.linkedin : '/example'} required />
//                                 </div>
//                             </div>
//                             <div className="contenenedor-internoo">
//                                 <div className="label">
//                                     <label htmlFor="github">Github</label>
//                                 </div>
//                                 <div className="input-text">
//                                     <input type="text" id="github" value={github}
//                                         onChange={(e) => setGithub(e.target.value)} placeholder={datosIngresados.github ? datosIngresados.github : '/example'} required />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             }

//             botones={
//                 <>
//                     <Toaster />
//                     <button className="boton-cancelar" onClick={() => setDataDatos(false)}> Cancelar </button>
//                     <button className="boton-guardar" onClick={enviarDatos}>
//                         {hayDatosIngresados ? 'Actualizar' : 'Guardar'}
//                     </button>
//                 </>
//             }

//         />
//     )
// }

// export default DataDatos;
'use client'

import { Toaster } from 'react-hot-toast'
import StructureConfigData from './StructureConfigData'
import { usePersonalDataForm } from '@/presentation/hooks/usePersonalDataForm'

interface DataDatosProps {
  setDataDatos: (open: boolean) => void
}

const DataDatos = ({ setDataDatos }: DataDatosProps) => {
  const { formData, existingData, isUpdate, handleChange, handleSubmit } = usePersonalDataForm(
    () => setDataDatos(false)
  )

  const InputField = ({
    label,
    id,
    type = 'text',
    value,
    placeholder,
    onChange,
  }: {
    label: string
    id: string
    type?: string
    value: any
    placeholder: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }) => (
    <div className="contenenedor-internoo">
      <div className="label">
        <label htmlFor={id}>{label}</label>
      </div>
      <div className="input-text">
        <input
          type={type}
          id={id}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  )

  return (
    <StructureConfigData
      titulo="Datos personales"
      childrenInputs={
        <div className="contenedor-input-config">
          <div className="duo-contenedor">
            <InputField
              label="Email"
              id="email"
              type="email"
              value={formData.email}
              placeholder={existingData?.email || 'NextJS@hotmail.com'}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            <InputField
              label="Celular"
              id="celular"
              type="number"
              value={formData.celular}
              placeholder={existingData?.celular || '123456789'}
              onChange={(e) => handleChange('celular', e.target.value)}
            />
          </div>

          <div className="duo-contenedor">
            <InputField
              label="Fecha de nacimiento"
              id="fechaNacimiento"
              value={formData.fechaNacimiento}
              placeholder={existingData?.fechaNacimiento || 'dd/mm/aaaa'}
              onChange={(e) => handleChange('fechaNacimiento', e.target.value)}
            />
            <InputField
              label="Género"
              id="genero"
              value={formData.genero}
              placeholder={existingData?.genero || 'Masculino/Femenino'}
              onChange={(e) => handleChange('genero', e.target.value)}
            />
          </div>

          <div className="duo-contenedor">
            <InputField
              label="LinkedIn"
              id="linkedin"
              value={formData.linkeding}
              placeholder={existingData?.linkeding || '/example'}
              onChange={(e) => handleChange('linkeding', e.target.value)}
            />
            <InputField
              label="Github"
              id="github"
              value={formData.github}
              placeholder={existingData?.github || '/example'}
              onChange={(e) => handleChange('github', e.target.value)}
            />
          </div>
        </div>
      }
      botones={
        <>
          <Toaster />
          <button className="boton-cancelar" onClick={() => setDataDatos(false)}>
            Cancelar
          </button>
          <button className="boton-guardar" onClick={handleSubmit}>
            {isUpdate ? 'Actualizar' : 'Guardar'}
          </button>
        </>
      }
    />
  )
}

export default DataDatos
