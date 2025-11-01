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
