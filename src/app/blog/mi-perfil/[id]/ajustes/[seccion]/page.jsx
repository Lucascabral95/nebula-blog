"use client"
import "../../ajustes/Ajustes.scss"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import DataBio from "@/components/ConfigData/DataBio"
import DataDatos from "@/components/ConfigData/DataDatos"
import DataDireccion from "@/components/ConfigData/DataDireccion"
import EstructuraCuerpo from "@/components/EstructuraCuerpo/EstructuraCuerpo"
import EstructuraCuerpoInterior from "@/components/EstructuraCuerpoInterior/EstructuraCuerpoInterior"
import Image from "next/image"
import CuentaEmail from "@/components/ConfigData/CuentaEmail"
import axios from "axios"
import { useParams } from "next/navigation"
import PerfilDeDatos from "@/app/blog/perfil/[id]/PerfilDeDatos"
import Link from "next/link"
import moment from "moment"
import 'moment/locale/es';
import { FcLike } from "react-icons/fc";
import { FaCommentAlt, FaTrash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast"

const SeccionUsuario = () => {
    const { data: sesion } = useSession()
    const { id, seccion } = useParams()
    const [seccionActual, setSeccionActual] = useState(seccion)
    const [isOpenDataBio, setIsOpenDataBio] = useState(false)
    const [dataDatos, setDataDatos] = useState(false)
    const [dataDireccion, setDataDireccion] = useState(false)
    const [dataEmail, setDataEmail] = useState(false)
    const [direccionIngresada, setDireccionIngresada] = useState("")
    const [dataMyPosts, setDataMyPosts] = useState([])
    const [publicacionesGuardadas, setPublicacionesGuardadas] = useState([])

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const result = await axios.get(`/api/detalles/direccion?id=${sesion?.user?.id}`)

                if (result.status === 200 || result.status === 201) {
                    setDireccionIngresada(result.data.result.provincia + ", " + result.data.result.pais)
                }
            } catch (error) {
                console.error('Error de red o solicitud fallida:', error.message)
            }
        }

        obtenerDatos()
    }, [sesion?.user?.id])

    useEffect(() => {
        const obtenerMisPublicaciones = async () => {
            try {
                const result = await axios.get(`/api/post`)

                if (result.status === 200 || result.status === 201) {
                    setDataMyPosts(result.data.posts.filter(post => post.author[0]._id === id))
                }
            } catch (error) {
                if (error.response) {
                    const { status, data } = error.response
                    console.error(`Error ${status}: ${data.error}`)
                } else {
                    console.error('Error de red o solicitud fallida:', error.message)
                }
            }
        }

        obtenerMisPublicaciones()
    }, [id])

    useEffect(() => {
        const obtenerPosteosGuardados = async () => {
            try {
                const result = await axios.get(`/api/post/favoritas?id=${sesion?.user?.id}`)

                if (result.status === 200 || result.status === 201) {
                    setPublicacionesGuardadas(result.data.result.post)
                }

            } catch (error) {
                if (error.response) {
                    const { status, data } = error.response
                    console.error(`Error ${status}: ${data.error}`)
                } else {
                    console.error('Error de red o solicitud fallida:', error.message)
                }
            }
        }

        obtenerPosteosGuardados()
    }, [sesion])

    const eliminarDeFavoritos = async (id) => {
        try {
            const result = await axios.delete(`/api/post/favoritas?id=${sesion?.user?.id}&post=${id}`);

            if (result.status === 200) {
                toast.success("Publicación eliminada");
                setPublicacionesGuardadas(publicacionesGuardadas.filter(publicacion => publicacion._id !== id));
            } else {
                toast.error("Error al eliminar la publicación");
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                console.error(`Error ${status}: ${data.error}`);
                toast.error(data.error);
            } else {
                console.error('Error de red o solicitud fallida:', error.message);
                toast.error("Error de red o solicitud fallida");
            }
        }
    };

    const formatContent = (content) => {
        if (typeof content === 'string') {
            return content.replace(/\n/g, '<br />');
        }
        return content;
    };

    return (
        <EstructuraCuerpo>
            <EstructuraCuerpoInterior
                noticias={
                    <>
                        <div className="perfil-titulo">
                            <h2 className='perfil-titulo-texto'>
                                Configuración
                            </h2>
                        </div>
                        <div className="secciones-perfil">
                            <div className="seccion"
                                style={{ borderBottom: seccionActual === "cuenta" ? "0.4px solid black" : "none" }}
                                onClick={() => setSeccionActual("cuenta")}>
                                <p style={{ color: seccionActual === "cuenta" ? "black" : "var(--font-color-principal-dentro)" }}>
                                    Cuenta
                                </p>
                            </div>
                            <div className="seccion"
                                style={{ borderBottom: seccionActual === "publicaciones" ? "0.4px solid black" : "none" }}
                                onClick={() => setSeccionActual("publicaciones")}>
                                <p style={{ color: seccionActual === "publicaciones" ? "black" : "var(--font-color-principal-dentro)" }}>
                                    Mis Publicaciones
                                </p>
                            </div>
                            <div className="seccion"
                                style={{ borderBottom: seccionActual === "publicacionesGuardadas" ? "0.4px solid black" : "none" }}
                                onClick={() => setSeccionActual("publicacionesGuardadas")}>
                                <p style={{ color: seccionActual === "publicacionesGuardadas" ? "black" : "var(--font-color-principal-dentro)" }}>
                                    Publicaciones Guardadas
                                </p>
                            </div>
                        </div>
                        {seccionActual === "cuenta"
                            ?
                            <div className="informacion-perfil">
                                <div className="contenedor-informacion-perfil-perfil" onClick={() => setDataEmail(true)}>
                                    <div className="perfil-secciones">
                                        <div className="seccion">
                                            <div className="tipo">
                                                <div className="div-tipo-texto">
                                                    <p className="tipo-texto"> Dirección de Email </p>
                                                </div>
                                            </div>
                                            <div className="tipo">
                                                <p className="tipo-valor"> {sesion?.user?.email} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="contenedor-informacion-perfil-perfil" onClick={() => setIsOpenDataBio(true)} >
                                    <div className="perfil-secciones">
                                        <div className="seccion">
                                            <div className="tipo">
                                                <div className="div-tipo-texto">
                                                    <p className="tipo-texto"> Perfil del Cliente </p>
                                                </div>
                                                <div className="div-tipo-texto">
                                                    <p className="tipo-info"> Editá tu nombre completo, tus pronombres y tu biografía </p>
                                                </div>
                                            </div>
                                            <div className="tipo-valor-foto">
                                                <p className="tipo-valor"> {sesion?.user?.email}</p>
                                                <Image src={sesion?.user?.avatar === "" || sesion?.user?.avatar === null || sesion?.user?.avatar === undefined ? "/img/title-doraemon.jpg" : sesion?.user?.avatar}
                                                    width={24} height={24} alt="Perfil" className="tipo-valor-foto-photo" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="contenedor-informacion-perfil-perfil" onClick={() => setDataDireccion(true)}>
                                    <div className="perfil-secciones">
                                        <div className="seccion">
                                            <div className="tipo">
                                                <div className="div-tipo-texto">
                                                    <p className="tipo-texto"> Detalles de dirección </p>
                                                </div>
                                            </div>
                                            <div className="tipo">
                                                <p className="tipo-valor"> {direccionIngresada === "" ? "Tu dirección" : direccionIngresada} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="contenedor-informacion-perfil-perfil" onClick={() => setDataDatos(true)}>
                                    <div className="perfil-secciones">
                                        <div className="seccion">
                                            <div className="tipo">
                                                <div className="div-tipo-texto">
                                                    <p className="tipo-texto"> Datos personales </p>
                                                </div>
                                            </div>
                                            <div className="tipo">
                                                <p className="tipo-valor"> Datos claves </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            seccionActual === "publicaciones"
                                ?
                                <div className="contenedor-ultimos-posteos">
                                    <div className="titulo-seccion-perfil">
                                        <div className="tit">
                                            {dataMyPosts.length > 0
                                                ?
                                                <h2 className="tit-titulo"> Mis publicaciones  </h2>
                                                :
                                                <h2 className="tit-titulo"> No realizaste ninguna publicación </h2>}
                                        </div>
                                    </div>
                                    {dataMyPosts.map((item, index) => (
                                        <Link href={`/blog/posteo/${item._id}`} className="posteoss" key={index}>
                                            <div className="perfil-nombre-categoria">
                                                <div className="perfil-nombre">
                                                    <Link href={`/blog/perfil/${item.author[0]._id}`} className="imagen">
                                                        <Image
                                                            className="imagen-imagen"
                                                            src={item?.author[0]?.avatar === "" || item?.author[0].avatar === null || item?.author[0].avatar === undefined ? "/img/title-doraemon.jpg" : item.author[0].avatar}
                                                            alt="Perfil" width={20} height={20}
                                                        />
                                                    </Link>
                                                    <Link href={`/blog/perfil/${item.author[0]._id}`} className="nombre">
                                                        <p> {item.author[0].email} </p>
                                                    </Link>
                                                </div>
                                                <div className="pmc-categoria">
                                                    <div className="section-cat">
                                                        <p>  {item.categories} </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="titulo-contenido">
                                                <div className="titulo-ultimo-posteo">
                                                    <h3> {item.title} </h3>
                                                </div>
                                                <div className="descripcion-ultimo-posteo">
                                                    <p dangerouslySetInnerHTML={{ __html: formatContent(item.content) }} />
                                                </div>
                                            </div>
                                            <div className="likes-comentarios">
                                                <div className="fecha">
                                                    <p> {moment(item.createdAt).fromNow()} </p>
                                                </div>
                                                <div className="fecha">
                                                    <FcLike className="icon-like-com" />
                                                    <p> {item.likes} </p>
                                                </div>
                                                <div className="fecha">
                                                    <FaCommentAlt className="icon-like-com" />
                                                    <p> {item.comments.length} </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                :
                                <div className="contenedor-ultimos-posteos">
                                    <div className="titulo-seccion-perfil">
                                        <div className="tit">
                                            {publicacionesGuardadas && publicacionesGuardadas.length > 0 ? (
                                                <h2 className="tit-titulo">Publicaciones guardadas</h2>
                                            ) : (
                                                <h2 className="tit-titulo">No hay publicaciones guardadas</h2>
                                            )}

                                        </div>
                                    </div>
                                    {publicacionesGuardadas?.map((item, index) => (
                                        <div className="posteoss" key={index}>
                                            <div className="perfil-nombre-categoria">
                                                <div className="perfil-nombre">
                                                    <Link href={`/blog/perfil/${item.author[0]._id}`} className="imagen">
                                                        <Image
                                                            className="imagen-imagen"
                                                            src={item?.author[0]?.avatar === "" || item?.author[0].avatar === null || item?.author[0].avatar === undefined ? "/img/title-doraemon.jpg" : item.author[0].avatar}
                                                            alt="Perfil" width={20} height={20}
                                                        />
                                                    </Link>
                                                    <Link href={`/blog/perfil/${item.author[0]._id}`} className="nombre">
                                                        <p> {item.author[0].email} </p>
                                                    </Link>
                                                </div>
                                                <div className="pmc-categoria pmc-categoria-trash" onClick={() => eliminarDeFavoritos(item._id)}>
                                                    <div className="contenedor-de-icono-trash">
                                                        <FaTrash className="icono-trash" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="titulo-contenido">
                                                <div className="titulo-ultimo-posteo">
                                                    <h3> {item.title} </h3>
                                                </div>
                                                <div className="descripcion-ultimo-posteo">
                                                    <p dangerouslySetInnerHTML={{ __html: formatContent(item.content) }} />
                                                </div>
                                            </div>
                                            <div className="likes-comentarios">
                                                <div className="fecha">
                                                    <p> {moment(item.createdAt).fromNow()} </p>
                                                </div>
                                                <div className="fecha">
                                                    <FcLike className="icon-like-com" />
                                                    <p> {item.likes} </p>
                                                </div>
                                                <div className="fecha">
                                                    <FaCommentAlt className="icon-like-com" />
                                                    <p> {item.comments.length} </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Toaster />
                                </div>
                        }

                        {isOpenDataBio && <DataBio setIsOpenDataBio={setIsOpenDataBio} />}
                        {dataDatos && <DataDatos setDataDatos={setDataDatos} />}
                        {dataDireccion && <DataDireccion setDataDireccion={setDataDireccion} />}
                        {dataEmail && <CuentaEmail setDataEmail={setDataEmail} />}

                    </>
                }

                recomendaciones={
                    <>
                        <PerfilDeDatos dataMyPosts={dataMyPosts} id={id} />
                    </>
                }
            />
        </EstructuraCuerpo>
    )
}

export default SeccionUsuario;