"use client"
import EstructuraCuerpo from "@/components/EstructuraCuerpo/EstructuraCuerpo"
import "./App.scss"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"

const PageNotFound = () => {
  const { data: session } = useSession()

  return (
    <>

      {session === undefined || session === null
        ?
        <div className="notFound">
          <div className="contenedor-notFound">

            <div className="titulo-not-found">
              <h2 className="titulo"> 404 - Página no encontrada </h2>
            </div>

            <div className="imagen-not-found">
              <Image src="/img/bad-request.jpg" className="imagen" width={500} height={500} alt="404 - Página no encontrada" />
            </div>

            <div className="boton-redireccion">
              <Link className="link-pagina-principal" href={session === undefined || session === null ? "/" : "/blog"} >
                {session === undefined || session === null ? "Inicia sesión" : "Ir a la página principal"}
              </Link>
            </div>

          </div>
        </div>
        :
        <EstructuraCuerpo>
          <div className="notFound">
            <div className="contenedor-notFound">

              <div className="titulo-not-found">
                <h2 className="titulo"> 404 - Página no encontrada </h2>
              </div>

              <div className="imagen-not-found">
                <Image src="/img/bad-request.jpg" className="imagen" width={500} height={500} alt="404 - Página no encontrada" />
              </div>

              <div className="boton-redireccion">
                <Link className="link-pagina-principal" href={session === undefined || session === null ? "/" : "/blog"} >
                  {session === undefined || session === null ? "Inicia sesión" : "Ir a la página principal"}
                </Link>
              </div>

            </div>
          </div>
        </EstructuraCuerpo>
      }

    </>
  )
}

export default PageNotFound