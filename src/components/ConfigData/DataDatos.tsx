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
