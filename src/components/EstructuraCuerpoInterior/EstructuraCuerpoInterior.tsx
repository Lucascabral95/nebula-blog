'use client'

import { ReactNode } from 'react'
import './EstructuraCuerpoInterior.scss'

interface EstructuraCuerpoInteriorProps {
  noticias: ReactNode
  recomendaciones: ReactNode
}

const EstructuraCuerpoInterior = ({ noticias, recomendaciones }: EstructuraCuerpoInteriorProps) => {
  return (
    <div className="estructura-cuerpo-interior">
      <div className="noticias">
        {noticias}
      </div>

      <div className="recomendaciones">
        {recomendaciones}
      </div>
    </div>
  )
}

export default EstructuraCuerpoInterior
