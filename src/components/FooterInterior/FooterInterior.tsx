// "use client"
// import "./FooterInterior.scss"
// import Image from "next/image"
// import Link from "next/link"
// import { useEffect, useState } from "react";
// import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
// import axios from "axios";

// const FooterInterior = ({ dataPost, id }) => {
//     const [misDatos, setMisDatos] = useState([]);

//     useEffect(() => {
//         const obtenerDetalles = async () => {
//             try {
//                 const result = await axios.get(`/api/detalles/bio/detalle/${id}`);

//                 if (result.status === 200 || result.status === 201) {
//                     setMisDatos(result.data.result);
//                 }

//             } catch (error) {
//                 if (error.response) {
//                     const { status, data } = error.response;
//                     console.error(`Error ${status}: ${data.error}`);
//                 } else {
//                     console.error('Error de red o solicitud fallida:', error.message);
//                 }
//             }
//         }

//         obtenerDetalles();
//     }, [id]);

//     return (
//         <footer className="footer-interior-oficial">
//             <div className="contenedor-footer-interior-oficial">


//                 <div className="footer-superior">
//                     <div className="contenedor-footer-superior">

//                         <div className="footer-foto">
//                             <Link href={`/blog/perfil/${misDatos?.user}`} className="foto">
//                                 <Image src={dataPost?.author?.avatar === "" || dataPost?.author?.avatar === undefined ? "/img/title-doraemon.jpg" : dataPost?.author?.avatar} width={70} height={70} alt="Perfil" className="footer-logo" />
//                             </Link>
//                         </div>

//                         <Link href={`/blog/perfil/${misDatos?.user}`} className="footer-nombre">
//                             <p>
//                                 {misDatos?.nombreCompleto
//                                     ? misDatos?.nombreCompleto
//                                     : dataPost?.author?.[0]?.name
//                                         ? dataPost?.author[0]?.name.replace(/\b\w/g, (char) => char.toUpperCase())
//                                         : 'Nombre no disponible'}
//                             </p>
//                         </Link>

//                         <div className="footer-descripcion">
//                             <p>
//                                 {misDatos?.bio ? misDatos?.bio : "Sin biografía por el momento..."}
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="footer-inferior">
//                     <div className="contenedor-footer-inferior">
//                         <div className="footer-secciones">
//                             <div className="presentacion-mia">
//                                 <p> Powered by <a rel="noreferrer" className="link-mio" target="_blank" href="https://github.com/Lucascabral95"> Lucas Cabral</a> - 2024 </p>
//                             </div>
//                             <div className="seccion-redes">
//                                 <div className="seccion">
//                                     <a href="https://github.com/Lucascabral95" target="_blank">
//                                         <div className="icono">
//                                             <FaGithub className="icono-seccion" />
//                                         </div>
//                                     </a>
//                                 </div>
//                                 <div className="seccion">
//                                     <a href="https://instagram.com/lucascabral95" target="_blank">
//                                         <div className="icono">
//                                             <FaInstagram className="icono-seccion" />
//                                         </div>
//                                     </a>
//                                 </div>
//                                 <div className="seccion">
//                                     <a href="https://www.linkedin.com/in/lucas-gast%C3%B3n-cabral/" target="_blank">
//                                         <div className="icono">
//                                             <FaLinkedin className="icono-seccion" />
//                                         </div>
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </footer>
//     )
// }

// export default FooterInterior;
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'
import { useFooterAuthor } from '@/presentation/hooks/useFooterAuthor'
import { IPost } from '@/infrastructure/interfaces/blog.interface'
import './FooterInterior.scss'
import { AUTHOR_INFO } from '@/infrastructure/constants'

interface FooterInteriorProps {
  dataPost: IPost
  id: string
}

const FooterInterior = ({ dataPost, id }: FooterInteriorProps) => {
  const { authorData } = useFooterAuthor(id)

  const getAuthorImage = () => dataPost?.author?.[0]?.avatar || '/img/title-doraemon.jpg'

  const getAuthorName = () => {
    if (authorData?.nombreCompleto) return authorData.nombreCompleto
    if (dataPost?.author?.[0]?.name) {
      return dataPost.author[0].name.replace(/\b\w/g, (char: any) => char.toUpperCase())
    }
    return 'Nombre no disponible'
  }

  const getAuthorBio = () => authorData?.bio || 'Sin biografía por el momento...'

  return (
    <footer className="footer-interior-oficial">
      <div className="contenedor-footer-interior-oficial">
        <div className="footer-superior">
          <div className="contenedor-footer-superior">
            <div className="footer-foto">
              <Link href={`/blog/perfil/${authorData?.user}`} className="foto">
                <Image
                  src={getAuthorImage()}
                  width={70}
                  height={70}
                  alt="Perfil"
                  className="footer-logo"
                />
              </Link>
            </div>

            <Link href={`/blog/perfil/${authorData?.user}`} className="footer-nombre">
              <p>{getAuthorName()}</p>
            </Link>

            <div className="footer-descripcion">
              <p>{getAuthorBio()}</p>
            </div>
          </div>
        </div>

        <div className="footer-inferior">
          <div className="contenedor-footer-inferior">
            <div className="footer-secciones">
              <div className="presentacion-mia">
                <p>
                  Powered by{' '}
                  <a rel="noreferrer" className="link-mio" target="_blank" href={AUTHOR_INFO.github}>
                    {AUTHOR_INFO.name}
                  </a>{' '}
                  - {AUTHOR_INFO.year}
                </p>
              </div>
              <div className="seccion-redes">
                <div className="seccion">
                  <a href={AUTHOR_INFO.github} target="_blank" rel="noreferrer">
                    <div className="icono">
                      <FaGithub className="icono-seccion" />
                    </div>
                  </a>
                </div>
                <div className="seccion">
                  <a href={AUTHOR_INFO.instagram} target="_blank" rel="noreferrer">
                    <div className="icono">
                      <FaInstagram className="icono-seccion" />
                    </div>
                  </a>
                </div>
                <div className="seccion">
                  <a href={AUTHOR_INFO.linkedin} target="_blank" rel="noreferrer">
                    <div className="icono">
                      <FaLinkedin className="icono-seccion" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterInterior
