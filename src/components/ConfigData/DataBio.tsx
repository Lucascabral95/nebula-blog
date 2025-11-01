'use client'
import { Toaster } from 'react-hot-toast'

import StructureConfigData from './StructureConfigData'
import { useBioForm } from '@/presentation/hooks/useBioForm'

interface DataBioProps {
  setIsOpenDataBio: (open: boolean) => void
}

const DataBio = ({ setIsOpenDataBio }: DataBioProps) => {
  const { formData, lengths, existingData, handleChange, handleSubmit } = useBioForm(
    () => setIsOpenDataBio(false)
  )

  const getLabelColor = (current: number, max: number) => current === max ? 'red' : 'var(--font-color-principal-dentro)'

  return (
    <StructureConfigData
      titulo="Biografía"
      childrenInputs={
        <>
          <div className="contenedor-input-config">
            <div className="label">
              <label htmlFor="nombre">Nombre y apellidos</label>
            </div>
            <div className="input-texto">
              <input
                type="text"
                maxLength={50}
                placeholder={existingData?.nombreCompleto || 'Jack McCormick'}
                onChange={(e) => handleChange('nombreCompleto', e.target.value)}
                value={formData.nombreCompleto}
                required
              />
            </div>
            <div className="texto-aclaratorio">
              <div className="aclaratorio">
                <p style={{ color: getLabelColor(lengths.lengthNombreCompleto, 50) }}>
                  {lengths.lengthNombreCompleto}/50
                </p>
              </div>
            </div>

            <div className="label">
              <label htmlFor="edad">Edad</label>
            </div>
            <div className="input-texto">
              <input
                type="number"
                placeholder="29"
                onChange={(e) => handleChange('edad', Number(e.target.value) || null)}
                value={formData.edad || ''}
                required
              />
            </div>
            <div className="texto-aclaratorio">
              <div className="aclaratorio">
                <p style={{
                  color:
                    formData.edad && (formData.edad < 0 || formData.edad > 99)
                      ? 'red'
                      : 'var(--font-color-principal-dentro)',
                }}
                >
                  de 0 a 99
                </p>
              </div>
            </div>

            <div className="label">
              <label htmlFor="pronombres">Pronombres</label>
            </div>
            <div className="input-texto">
              <input
                type="text"
                placeholder={existingData?.pronombres || 'Ej: El, Ella, Ello, Elle...'}
                maxLength={4}
                onChange={(e) => handleChange('pronombres', e.target.value)}
                value={formData.pronombres}
                required
              />
            </div>
            <div className="texto-aclaratorio">
              <div className="aclaratorio">
                <p style={{ color: getLabelColor(lengths.lengthPronombres, 4) }}>
                  {lengths.lengthPronombres}/4
                </p>
              </div>
            </div>

            <div className="label">
              <label htmlFor="bio">Bio</label>
            </div>
            <div className="input-texto">
              <textarea
                maxLength={200}
                placeholder={existingData?.bio || 'Escriba una biografía suya...'}
                onChange={(e) => handleChange('bio', e.target.value)}
                value={formData.bio}
                required
              />
            </div>
            <div className="texto-aclaratorio">
              <div className="aclaratorio">
                <p style={{ color: getLabelColor(lengths.lengthBio, 200) }}>
                  {lengths.lengthBio}/200
                </p>
              </div>
            </div>
          </div>
          <Toaster />
        </>
      }
      botones={
        <>
          <button className="boton-cancelar" onClick={() => setIsOpenDataBio(false)}>
            Cancelar
          </button>
          <button className="boton-guardar" onClick={handleSubmit}>
            Guardar
          </button>
        </>
      }
    />
  )
}

export default DataBio
