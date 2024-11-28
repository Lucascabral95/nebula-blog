"use client"
import EstructuraCuerpo from '@/components/EstructuraCuerpo/EstructuraCuerpo'
import "./Blog.scss"
import EstructuraCuerpoInterior from '@/components/EstructuraCuerpoInterior/EstructuraCuerpoInterior'
import axios from "axios"
import { useEffect, useState } from "react"
import { FcLike } from "react-icons/fc";
import { FaCommentAlt } from "react-icons/fa";
import moment from "moment";
import 'moment/locale/es';
import useStore from '@/zustand'
import { useRouter } from 'next/navigation'

const Blog = () => {
    const { arrayDePosteos, setArrayDePosteos, search, setSearch } = useStore()
    const [categorias, setCategorias] = useState([])
    const [dataPosteos, setDataPosteos] = useState([])
    const [arrayAMostrar, setArrayAMostrar] = useState([])
    const [cantidadPaginas, setCantidadPaginas] = useState(0)
    const [posteosPorPagina, setPosteosPorPagina] = useState(8)
    const [paginaActual, setPaginaActual] = useState(1)
    const router = useRouter()

    useEffect(() => {
        const getCategorias = async () => {
            try {
                const result = await axios.get('/api/category')

                if (result.status === 200 || result.status === 201) {
                    setCategorias(result.data.categorias)
                }
            } catch (error) {
                if (error.response) {
                    const { status, data } = error.response
                    console.error(`Error ${status}: ${data.error}`)
                }
            }
        }

        getCategorias()
    }, [])

    useEffect(() => {
        const getPosts = async () => {
            try {
                const result = await axios.get('/api/post')

                if (result.status === 200 || result.status === 201) {
                    setDataPosteos(result.data.posts)
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

        getPosts()
    }, [])

    const buscarPorCategoria = async (item) => {
        if (item) {
            try {
                const result = await axios.get(`/api/post`)
                setSearch(item)

                if (result.status === 200 || result.status === 201) {
                    const posteosFiltrados = result.data.posts.filter(post => post.categories.toLowerCase().includes(search.toLowerCase()))
                    if (posteosFiltrados.length > 0) {
                        setArrayDePosteos(posteosFiltrados)
                    } else {
                        setArrayDePosteos([])
                    }
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
    }

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const result = await axios.get(`/api/post`)

                if (result.status === 200 || result.status === 201) {
                    const cantidadDePaginas = Math.ceil(result.data.posts.length / posteosPorPagina)
                    setCantidadPaginas(cantidadDePaginas)
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

        obtenerDatos()
    }, [])

    const siguientePagina = () => {
        if (cantidadPaginas > paginaActual) {
            setPaginaActual(paginaActual + 1)
            setPosteosPorPagina(posteosPorPagina + 8)
        }
    }

    useEffect(() => {
        if (arrayDePosteos.length > 0 || search) {
            setArrayAMostrar(arrayDePosteos);
        } else {
            setArrayAMostrar(dataPosteos);
        }
    }, [arrayDePosteos, dataPosteos, search]);

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
                        <div className="ultimas-noticias">
                            {search !== ""
                                ?
                                <h4 className="text-ultimas-noticias"> Resultados de <span style={{ color: "var(--font-color-principal-dentro)" }}> {search} </span> </h4>
                                :
                                <h4 className="text-ultimas-noticias"> Últimas publicaciones </h4>
                            }
                        </div>

                        <div className="contenedor-ultimos-posteos">
                            {arrayAMostrar?.slice(0, posteosPorPagina).map((item, index) => (
                                <div onClick={() => setSearch("")} className="posteoss" key={index}>
                                    <div className="perfil-nombre-categoria">
                                        <div className="perfil-nombre">
                                        </div>
                                        <div className="pmc-categoria">
                                            <div className="section-cat">
                                                <p>  {item.categories} </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ cursor: "pointer" }} className="titulo-contenido" onClick={() => router.push(`/blog/posteo/${item._id}`)}>
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
                        </div>
                        {cantidadPaginas > paginaActual && arrayAMostrar.length > 0 &&
                            <div className="boton-de-mas" onClick={siguientePagina}>
                                <button> Ver más </button>
                            </div>
                        }
                    </>
                }

                recomendaciones={
                    <>
                        <div className="temas-recomendados">
                            <p> Temas recomendados </p>
                        </div>
                        <div className="temas">
                            {categorias.map((item, index) => (
                                <div className="tema" key={index} onClick={() => buscarPorCategoria(item.name)}>
                                    <p> {item.name} </p>
                                </div>
                            ))}
                        </div>
                    </>
                }
            />
        </EstructuraCuerpo>
    )
}

export default Blog