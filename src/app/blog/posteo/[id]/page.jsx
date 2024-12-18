"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import EstructuraCuerpo from "@/components/EstructuraCuerpo/EstructuraCuerpo";
import "./PostDetail.scss";
import Image from "next/image";
import { FaCommentAlt, FaHeart } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";
import moment from "moment";
import 'moment/locale/es';
import FooterInterior from "@/components/FooterInterior/FooterInterior";
import "@/components/FooterInterior/FooterInterior.scss"
import ItemComment from "@/components/ItemComment/ItemComment";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import Skeleton from "react-loading-skeleton";

const PostDetail = () => {
    const { id } = useParams();
    const { data: session } = useSession();
    const [dataPost, setDataPost] = useState([]);
    const [isOpenComment, setIsOpenComment] = useState(false);
    const [cantidadComentarios, setCantidadComentarios] = useState(0);
    const [cantidadLikes, setCantidadLikes] = useState(0);
    const [loadingSkeleton, setLoadingSkeleton] = useState(true);
    const [dataUser, setDataUser] = useState([])

    useEffect(() => {
        const getPosteo = async () => {
            try {
                const result = await axios.get(`/api/post/${id}`);
                
                
                if (result.status === 200 || result.status === 201) {
                    setDataPost(result.data.result.post);
                    setCantidadLikes(result.data.result?.post?.likes);
                    setDataUser(result.data.result?.user)
                    setLoadingSkeleton(false);
                }
            } catch (error) {
                if (error.response) {
                    const { status, data } = error.response;
                    console.error(`Error ${status}: ${data.error}`);
                } else {
                    console.error('Error de red o solicitud fallida:', error.message);
                }
            }
        };

        getPosteo();
    }, [id]);

    useEffect(() => {
        const obtenerCantidadComentarios = async () => {
            try {
                const result = await axios.get(`/api/comment?id=${id}`)

                if (result.status === 200 || result.status === 201) {
                    setCantidadComentarios(result.data.comments.length)
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

        obtenerCantidadComentarios()
    }, [id])

    const darLike = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.put(`/api/post?id=${id}`)

            if (result.status === 200 || result.status === 201) {
                setCantidadLikes(result.data.cantidadDeLikes)
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

    const guardarEnFavoritos = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.post(`/api/post/favoritas`, {
                user: session?.user?.id,
                post: id
            })

            if (result.status === 200 || result.status === 201) {
                toast.success("Guardado exitosamente")
            }

        } catch (error) {
            if (error.response) {
                const { status, data } = error.response
                console.error(`Error ${status}: ${data.error}`)
                toast.error(data.error)
            } else {
                console.error('Error de red o solicitud fallida:', error.message)
            }
        }
    }

    const formatContent = (content) => {
        if (typeof content === 'string') {
            return content.replace(/\n/g, '<br />');
        }
        return content;
    };

    return (
        <EstructuraCuerpo

            detalle={true}

            childrenDetail={
                <>
                    <div className="post-detail">

                        <div className="detail-descripcion">
                            {loadingSkeleton
                                ?
                                <Skeleton height={19} width={100} />
                                :
                                <h6 className="detail-descripcion-texto"> {dataPost?.categories?.toUpperCase?.()} </h6>
                            }
                        </div>

                        <div className="detail-titulo">
                            {loadingSkeleton
                                ?
                                <Skeleton className="detail-titulo-texto" height={40} count={3} />
                                :
                                <h2 className="detail-titulo-texto"> {dataPost.title} </h2>
                            }
                        </div>

                        <div className="detail-foto-fecha">
                            {dataUser._id &&
                                <Link href={`/blog/perfil/${dataUser?._id}`} className="detail-imagen">
                                    <Image src="/img/title-doraemon.jpg" className="imagen-posteo" alt="imagen-posteo" width={44} height={44} />
                                </Link>
                            }
                            <div className="nombre-fecha">
                                <div className="fecha-publicacion">
                                    {dataUser._id &&
                                        <Link href={`/blog/perfil/${dataUser._id}`} className="link-link"> 
                                        {dataUser.name ? dataUser.name?.replace(/^(.)|\s(.)/g, s => s.toUpperCase()) : ""}
                                         </Link>
                                    }
                                </div>
                                <div className="mi-nombre">
                                    <p> {moment(dataPost.createdAt).fromNow().replace(/^(.)|\s(.)/g, s => s.toUpperCase())} </p>
                                </div>
                            </div>
                        </div>

                        <div className="detail-likes-comments">
                            <div className="contenedor-l-c">
                                <div className="icono">
                                    <div className="i-i" onClick={darLike}>
                                        <FaHeart className="icono-like" />
                                    </div>
                                    <div className="cantidad">
                                        <p> {cantidadLikes} </p>
                                    </div>
                                </div>
                                <div className="icono" onClick={() => setIsOpenComment(true)}>
                                    <div className="i-i">
                                        <FaCommentAlt className="icono-like" />
                                    </div>
                                    <div className="cantidad">
                                        <p> {cantidadComentarios} </p>
                                    </div>
                                </div>
                            </div>
                            <div className="contenedor-guardado" onClick={guardarEnFavoritos}>
                                <div className="save">
                                    <MdSaveAlt className="icono-save" />
                                </div>
                            </div>
                        </div>

                        <div className="detail-content">
                            {loadingSkeleton
                                ?
                                <Skeleton height={25} count={30} />
                                :
                                <p dangerouslySetInnerHTML={{ __html: formatContent(dataPost?.content) }} />
                            }
                        </div>

                    </div>

                    {isOpenComment &&
                        <ItemComment setIsOpenComment={setIsOpenComment} dataPosteo={dataPost} id={id} />
                    }

                    <FooterInterior dataPost={dataPost} id={id} />

                    <Toaster />

                </>
            }
        >
        </EstructuraCuerpo>
    )
}

export default PostDetail; 