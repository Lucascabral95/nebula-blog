// "use client"
// import { useSession } from "next-auth/react"
// import Link from "next/link";
// import { LuUser } from "react-icons/lu";
// import { IoStatsChart } from "react-icons/io5";
// import { signOut } from "next-auth/react";
// import { motion } from "framer-motion";
// import { FaRegNewspaper } from 'react-icons/fa';
// import { RiSaveLine } from "react-icons/ri";

// import "./Settings.scss"

// const Settings = () => {
//     const { data: session } = useSession()

//     return (
//         <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.5 }}
//             className='settings'>
//             <div className="contenedor-de-settings">

//                 <div className="seccion">
//                     <Link href={`/blog/mi-perfil/${session?.user?.id}`} className="seccion-interior">
//                         <div className="icono">
//                             <LuUser className="icono-seccion" />
//                         </div>
//                         <div className="texto">
//                             <p> Perfil </p>
//                         </div>
//                     </Link>
//                     <Link href={`/blog/mi-perfil/${session?.user?.id}/ajustes/publicaciones`} className="seccion-interior">
//                         <div className="icono">
//                             <FaRegNewspaper className="icono-seccion" />
//                         </div>
//                         <div className="texto">
//                             <p> Mis publicaciones </p>
//                         </div>
//                     </Link>
//                     <Link href={`/blog/mi-perfil/${session?.user?.id}/ajustes/publicacionesguardadas`} className="seccion-interior">
//                         <div className="icono">
//                             <RiSaveLine className="icono-seccion" />
//                         </div>
//                         <div className="texto">
//                             <p> Publicaciones guardadas </p>
//                         </div>
//                     </Link>
//                     <Link href={`/blog/mi-perfil/${session?.user?.id}/ajustes/cuenta`} className="seccion-interior">
//                         <div className="icono">
//                             <IoStatsChart className="icono-seccion" />
//                         </div>
//                         <div className="texto">
//                             <p> Configuración </p>
//                         </div>
//                     </Link>
//                 </div>

//                 <div className="seccion">
//                     <div className="seccion-interior" onClick={() => signOut()}>
//                         <div className="texto texto-logout">
//                             <p> Cerrar sesión: {session?.user?.email} </p>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </motion.div>
//     )
// }

// export default Settings;
'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { LuUser } from 'react-icons/lu'
import { IoStatsChart } from 'react-icons/io5'
import { FaRegNewspaper } from 'react-icons/fa'
import { RiSaveLine } from 'react-icons/ri'
import './Settings.scss'

const Settings = () => {
  const { data: session } = useSession()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='settings'
    >
      <div className="contenedor-de-settings">
        <div className="seccion">
          <Link href={`/blog/mi-perfil/${session?.user?.id}`} className="seccion-interior">
            <div className="icono">
              <LuUser className="icono-seccion" />
            </div>
            <div className="texto">
              <p>Perfil</p>
            </div>
          </Link>
          <Link href={`/blog/mi-perfil/${session?.user?.id}/ajustes/publicaciones`} className="seccion-interior">
            <div className="icono">
              <FaRegNewspaper className="icono-seccion" />
            </div>
            <div className="texto">
              <p>Mis publicaciones</p>
            </div>
          </Link>
          <Link href={`/blog/mi-perfil/${session?.user?.id}/ajustes/publicacionesguardadas`} className="seccion-interior">
            <div className="icono">
              <RiSaveLine className="icono-seccion" />
            </div>
            <div className="texto">
              <p>Publicaciones guardadas</p>
            </div>
          </Link>
          <Link href={`/blog/mi-perfil/${session?.user?.id}/ajustes/cuenta`} className="seccion-interior">
            <div className="icono">
              <IoStatsChart className="icono-seccion" />
            </div>
            <div className="texto">
              <p>Configuración</p>
            </div>
          </Link>
        </div>

        <div className="seccion">
          <div className="seccion-interior" onClick={() => signOut()}>
            <div className="texto texto-logout">
              <p>Cerrar sesión: {session?.user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Settings
