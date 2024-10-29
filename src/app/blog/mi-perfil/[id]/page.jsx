"use client"
import { useSession } from 'next-auth/react'
import Perfil from '../../perfil/[id]/page'
import { useParams } from 'next/navigation'

const MiPerfil = () => {
  const { data: session } = useSession()
  const { id } = useParams()

  return (
    <Perfil

      agregarDatos={true}

    />
  )
}

export default MiPerfil;