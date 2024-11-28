"use client"
import EstructuraCuerpo from '@/components/EstructuraCuerpo/EstructuraCuerpo'
import "@/components/EstructuraCuerpo/EstructuraCuerpo.scss"
import EstructuraCuerpoInterior from '@/components/EstructuraCuerpoInterior/EstructuraCuerpoInterior'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { FcLike } from "react-icons/fc";
import { FaCommentAlt } from "react-icons/fa";
import moment from 'moment'
import 'moment/locale/es'
import { useSession } from 'next-auth/react'
import PerfilDeDatos from './PerfilDeDatos'
import { toast, Toaster } from 'react-hot-toast'

import { FaTrash } from "react-icons/fa";

const Perfil = ({ agregarDatos }) => {
    const { id } = useParams()
    const [dataMyPosts, setDataMyPosts] = useState([])
    const [seccionActual, setSeccionActual] = useState("publicaciones")
    const { data: session } = useSession()
    const [publicacionesGuardadas, setPublicacionesGuardadas] = useState([])
    const [datosDelUsuario, setDatosDelUsuario] = useState([])

    useEffect(() => {
        const obtenerMisPublicaciones = async () => {
            try {
                const result = await axios.get(`/api/post/posteos/${id}`)

                if (result.status === 200 || result.status === 201) {
                    setDataMyPosts(result.data.result.posts)
                    setDatosDelUsuario(result.data.result.user[0])
                    console.log(result.data.result.user[0])
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
                const result = await axios.get(`/api/post/favoritas?id=${session?.user?.id}`)

                if (result.status === 200 || result.status === 201) {
                    setPublicacionesGuardadas(result?.data?.result?.post)
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
    }, [session])

    const eliminarDeFavoritos = async (id) => {
        try {
            const result = await axios.delete(`/api/post/favoritas?id=${session?.user?.id}&post=${id}`);

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
                                {datosDelUsuario.name}
                            </h2>
                        </div>
                        <div className="secciones-perfil">
                            <div className="seccion"
                                style={{ borderBottom: seccionActual === "publicaciones" ? "0.4px solid black" : "none" }}
                                onClick={() => setSeccionActual("publicaciones")}>
                                <p style={{ color: seccionActual === "publicaciones" ? "black" : "var(--font-color-principal-dentro)" }}>
                                    Publicaciones
                                </p>
                            </div>
                            <div className="seccion"
                                style={{ borderBottom: seccionActual === "acerca-de-mi" ? "0.4px solid black" : "none" }}
                                onClick={() => setSeccionActual("acerca-de-mi")}>
                                <p style={{ color: seccionActual === "acerca-de-mi" ? "black" : "var(--font-color-principal-dentro)" }}>
                                    Acerca de mí
                                </p>
                            </div>
                            {id === session?.user?.id &&
                                <div className="seccion"
                                    style={{ borderBottom: seccionActual === "publicacionesGuardadas" ? "0.4px solid black" : "none" }}
                                    onClick={() => setSeccionActual("publicacionesGuardadas")}>
                                    <p style={{ color: seccionActual === "publicacionesGuardadas" ? "black" : "var(--font-color-principal-dentro)" }}>
                                        Publicaciones guardadas
                                    </p>
                                </div>
                            }
                        </div>

                        {seccionActual === "publicaciones"
                            ?
                            <div className="contenedor-ultimos-posteos">
                                {dataMyPosts?.length === 0 &&
                                    <div className="tit">
                                        <h2 className="tit-tiulo"> No realizaste ninguna publicación </h2>
                                    </div>
                                }
                                {dataMyPosts?.map((item, index) => (
                                    <Link href={`/blog/posteo/${item._id}`} className="posteoss" key={index}>
                                        <div className="perfil-nombre-categoria">
                                            <div className="perfil-nombre">
                                                <Link href={`/blog/perfil/${item.author}`} className="imagen">
                                                    <Image
                                                        className="imagen-imagen"
                                                        src="/img/title-doraemon.jpg"
                                                        alt="Perfil" width={20} height={20}
                                                    />
                                                </Link>
                                                <Link href={`/blog/perfil/${item._id}`} className="nombre">
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
                            : seccionActual === "acerca-de-mi" &&
                            <div className="contenedor-contenido-perfil">
                                <div className="about">
                                    <p> Miembro de Nebula Blog desde el {moment(datosDelUsuario.createdAt).format('LL')} </p>
                                </div>
                                <div className="about-publicaciones" onClick={() => setSeccionActual("publicaciones")}>
                                    <p> {dataMyPosts?.length} publicaciones </p>
                                </div>
                            </div>
                        }

                        {seccionActual === "publicacionesGuardadas" &&
                            <div className="contenedor-ultimos-posteos">
                                <div
                                    className="titulo-seccion-perfil"
                                    style={{
                                        borderBottom: publicacionesGuardadas?.length > 0 ? "1px solid #e5e5e5" : "none",
                                        padding: publicacionesGuardadas?.length > 0 ? "0 0 16px 0" : "0 0 0 0"
                                    }}
                                >
                                    <div className="tit">
                                        {publicacionesGuardadas
                                            ?
                                            <h2 className="tit-titulo"> Publicaciones guardadas </h2>
                                            :
                                            <h2 className="tit-titulo"> No hay publicaciones guardadas </h2>
                                        }
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

                    </>
                }

                recomendaciones={
                    <>
                        <PerfilDeDatos dataMyPosts={dataMyPosts} datosDelUsuario={datosDelUsuario} id={id} />
                        {agregarDatos &&
                            <Link href={`/blog/mi-perfil/${dataMyPosts._id}/ajustes`} className="editar-perfil">
                                <p> Editar perfil </p>
                            </Link>
                        }
                    </>
                }
            />
        </EstructuraCuerpo>
    )
}

export default Perfil