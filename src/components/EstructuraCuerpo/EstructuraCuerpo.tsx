'use client'
import { ReactNode } from 'react'

import Header from '@/components/Header/Header'
import SearchFull from '@/components/Header/SearchFull'
import useStore from '@/zustand'
import './EstructuraCuerpo.scss'

interface EstructuraCuerpoProps {
  children?: ReactNode
  childrenDetail?: ReactNode
  detalle?: boolean
}

const EstructuraCuerpo = ({ children, childrenDetail, detalle }: EstructuraCuerpoProps) => {
  const { isOpenSearchFull } = useStore()

  return (
    <div className='estructura-cuerpo'>
      <div className="contenedor-estructura-cuerpo">
        <Header />

        {isOpenSearchFull ? (
          <SearchFull />
        ) : (
          <>
            {children && (
              <main className="main-original">
                {children}
              </main>
            )}
            {detalle && (
              <main className="main-secundario">
                {childrenDetail}
              </main>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default EstructuraCuerpo
