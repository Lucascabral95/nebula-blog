// "use client"
// import { useEffect, useState } from 'react'
// import StructureConfigData from './StructureConfigData'
// import toast, { Toaster } from 'react-hot-toast'
// import axios from 'axios'
// import { useSession } from 'next-auth/react'

// const DataDireccion = ({ setDataDireccion }) => {
//     const { data: session } = useSession()
//     const [localidad, setLocalidad] = useState("")
//     const [partido, setPartido] = useState("")
//     const [provincia, setProvincia] = useState("")
//     const [pais, setPais] = useState("")
//     const [hayDatosIngresados, setHayDatosIngresados] = useState(false)
//     const [dataIngresada, setDataIngresada] = useState([])

//     const enviarDireccion = async (e) => {
//         e.preventDefault()

//         try {
//             const method = hayDatosIngresados ? "put" : "post"
//             const result = await axios[method]('/api/detalles/direccion', {
//                 user: session?.user?.id,
//                 localidad: localidad,
//                 partido: partido,
//                 provincia: provincia,
//                 pais: pais
//             })

//             if (result.status === 200 || result.status === 201) {
//                 toast.success(hayDatosIngresados ? "Dirección actualizada exitosamente" : "Dirección guardada exitosamente")
//                 setHayDatosIngresados(true)
//                 setTimeout(() => {
//                     setDataDireccion(false)
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
//                 const result = await axios.get(`/api/detalles/direccion?id=${session?.user?.id}`)

//                 if (result.status === 200 || result.status === 201) {
//                     setHayDatosIngresados(true)
//                     setDataIngresada(result.data.result)
//                 }
//             } catch (error) {
//                 console.error('Error de red o solicitud fallida:', error.message)
//             }
//         }

//         obtenerDatos()
//     }, [session?.user?.id])

//     return (
//         <StructureConfigData
//             titulo="Dirección"

//             childrenInputs={
//                 <>
//                     <div className="contenedor-input-config">
//                         <div className="duo-contenedor">
//                             <div className="contenenedor-internoo">
//                                 <div className="label">
//                                     <label htmlFor="localidad">Localidad</label>
//                                 </div>
//                                 <div className="input-text">
//                                     <input type="text" id="localidad" value={localidad}
//                                         onChange={(e) => setLocalidad(e.target.value)} placeholder={hayDatosIngresados ? dataIngresada.localidad : "Martinez"} required />
//                                 </div>
//                             </div>
//                             <div className="contenenedor-internoo">
//                                 <div className="label">
//                                     <label htmlFor="partido">Partido</label>
//                                 </div>
//                                 <div className="input-text">
//                                     <input type="text" id="partido" value={partido}
//                                         onChange={(e) => setPartido(e.target.value)} placeholder={hayDatosIngresados ? dataIngresada.partido : "San Isidro"} required />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="duo-contenedor">
//                             <div className="contenenedor-internoo">
//                                 <div className="label">
//                                     <label htmlFor="provincia">Provincia</label>
//                                 </div>
//                                 <div className="input-text">
//                                     <input type="text" id="provincia" value={provincia}
//                                         onChange={(e) => setProvincia(e.target.value)} placeholder={hayDatosIngresados ? dataIngresada.provincia : "Buenos Aires"} required />
//                                 </div>
//                             </div>
//                             <div className="contenenedor-internoo">
//                                 <div className="label">
//                                     <label htmlFor="pais">País</label>
//                                 </div>
//                                 <div className="input-text">
//                                     <input type="text" id="pais" value={pais}
//                                         onChange={(e) => setPais(e.target.value)} placeholder={hayDatosIngresados ? dataIngresada.pais : "Argentina"} required />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             }

//             botones={
//                 <>
//                     <Toaster />
//                     <button className="boton-cancelar" onClick={() => setDataDireccion(false)}> Cancelar </button>
//                     <button className="boton-guardar" onClick={enviarDireccion}>
//                         {hayDatosIngresados ? "Actualizar" : "Guardar"}
//                     </button>
//                 </>
//             }
//         />
//     )
// }

// export default DataDireccion;
'use client'

import { Toaster } from 'react-hot-toast'
import StructureConfigData from './StructureConfigData'
import { useAddressForm } from '@/presentation/hooks/useAddressForm'
import { DEFAULT_PLACEHOLDERS } from '@/infrastructure/constants'

interface DataDireccionProps {
  setDataDireccion: (open: boolean) => void
}

const AddressInput = ({
  label,
  id,
  value,
  placeholder,
  onChange,
}: {
  label: string
  id: string
  value: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => (
  <div className="contenenedor-internoo">
    <div className="label">
      <label htmlFor={id}>{label}</label>
    </div>
    <div className="input-text">
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  </div>
)

const DataDireccion = ({ setDataDireccion }: DataDireccionProps) => {
  const { formData, existingData, isUpdate, handleChange, handleSubmit } = useAddressForm(
    () => setDataDireccion(false)
  )

  return (
    <StructureConfigData
      titulo="Dirección"
      childrenInputs={
        <div className="contenedor-input-config">
          <div className="duo-contenedor">
            <AddressInput
              label="Localidad"
              id="localidad"
              value={formData.localidad}
              placeholder={existingData?.localidad || DEFAULT_PLACEHOLDERS.localidad}
              onChange={(e) => handleChange('localidad', e.target.value)}
            />
            <AddressInput
              label="Partido"
              id="partido"
              value={formData.partido}
              placeholder={existingData?.partido || DEFAULT_PLACEHOLDERS.partido}
              onChange={(e) => handleChange('partido', e.target.value)}
            />
          </div>

          <div className="duo-contenedor">
            <AddressInput
              label="Provincia"
              id="provincia"
              value={formData.provincia}
              placeholder={existingData?.provincia || DEFAULT_PLACEHOLDERS.provincia}
              onChange={(e) => handleChange('provincia', e.target.value)}
            />
            <AddressInput
              label="País"
              id="pais"
              value={formData.pais}
              placeholder={existingData?.pais || DEFAULT_PLACEHOLDERS.pais}
              onChange={(e) => handleChange('pais', e.target.value)}
            />
          </div>
        </div>
      }
      botones={
        <>
          <Toaster />
          <button className="boton-cancelar" onClick={() => setDataDireccion(false)}>
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

export default DataDireccion
