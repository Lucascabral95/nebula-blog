'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { TfiWrite } from 'react-icons/tfi'
import { HiMiniMagnifyingGlass } from 'react-icons/hi2'

import useStore from '@/zustand'
import { useSearch } from '@/presentation/hooks/useSearch'
import ItemsSearch from './ItemsSearch'
import Settings from '../Settings/Settings'
import './Header.scss'

const Header = () => {
  const { data: session } = useSession()
  const { toggleSearchFull } = useStore()
  const { search, setSearch, results, isOpenMenu, setIsOpenMenu, shouldShowResults } = useSearch()

  const userImage = session?.user?.image || '/img/title-doraemon.jpg'

  return (
    <header className="header-oficial">
      <div className="contenedor-header-oficial">
        <div className="logo-nombre">
          <Link href="/blog" className="log">
            <h1 className="titulo-logo-nombre">Nebula</h1>
          </Link>
          <div className="buscador">
            <div className="lupa">
              <HiMiniMagnifyingGlass className="icono-buscador" />
            </div>
            <div className="input-de-busqueda">
              <input
                value={search}
                className="input-buscador"
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Buscar..."
              />
            </div>
          </div>

          {shouldShowResults && <ItemsSearch publicacionesEncontradas={results} />}
        </div>

        <div className="escribir-perfil">
          <button className="boton-lupa" onClick={toggleSearchFull}>
            <HiMiniMagnifyingGlass className="icono-buscador" />
          </button>
          <Link href="/blog/escribir-posteo" className="seccion">
            <div className="ic">
              <TfiWrite className="icono-escritura" />
            </div>
            <div className="text">
              <p className="seccion-texto">Escribir</p>
            </div>
          </Link>
          <div className="perfil" onClick={() => setIsOpenMenu(!isOpenMenu)}>
            <Image
              className="imagen-perfil"
              src={userImage}
              width={32}
              height={32}
              alt="imagen de perfil"
            />
          </div>
        </div>

        {isOpenMenu && <Settings />}
      </div>
    </header>
  )
}

export default Header
