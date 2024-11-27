"use client"
import "./FooterInterior.scss"
import Image from "next/image"
import Link from "next/link"
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const FooterInterior = ({ misDatos, dataPost }) => {

    return (
        <footer className="footer-interior-oficial">
            <div className="contenedor-footer-interior-oficial">

                <div className="footer-superior">
                    <div className="contenedor-footer-superior">
                        <div className="footer-foto">
                            <Link href={`/blog/perfil/${misDatos?.user}`} className="foto">
                                <Image src={dataPost?.author?.avatar === "" || dataPost?.author?.avatar === undefined ? "/img/title-doraemon.jpg" : dataPost?.author?.avatar} width={70} height={70} alt="Perfil" className="footer-logo" />
                            </Link>
                        </div>

                        <Link href={`/blog/perfil/${misDatos?.user}`} className="footer-nombre">
                            <p>
                                {misDatos?.nombreCompleto
                                    ? misDatos?.nombreCompleto
                                    : dataPost?.author?.[0]?.name
                                        ? dataPost?.author[0]?.name.replace(/\b\w/g, (char) => char.toUpperCase())
                                        : 'Nombre no disponible'}
                            </p>
                        </Link>

                        <div className="footer-descripcion">
                            <p>
                                {misDatos?.bio ? misDatos?.bio : "Sin biografía por el momento..."}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="footer-inferior">
                    <div className="contenedor-footer-inferior">
                        <div className="footer-secciones">
                            <div className="presentacion-mia">
                                <p> Powered by <a rel="noreferrer" className="link-mio" target="_blank" href="https://github.com/Lucascabral95"> Lucas Cabral</a> - 2024 </p>
                            </div>
                            <div className="seccion-redes">
                                <div className="seccion">
                                    <a href="https://github.com/Lucascabral95" target="_blank">
                                        <div className="icono">
                                            <FaGithub className="icono-seccion" />
                                        </div>
                                    </a>
                                </div>
                                <div className="seccion">
                                    <a href="https://instagram.com/lucascabral95" target="_blank">
                                        <div className="icono">
                                            <FaInstagram className="icono-seccion" />
                                        </div>
                                    </a>
                                </div>
                                <div className="seccion">
                                    <a href="https://www.linkedin.com/in/lucas-gast%C3%B3n-cabral/" target="_blank">
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