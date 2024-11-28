"use client";
import { useEffect, useState } from "react";
import "./ItemComment.scss";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import moment from "moment";
import 'moment/locale/es';

const ItemComment = ({ setIsOpenComment, dataPosteo }) => {
    const [dataComentarios, setDataComentarios] = useState([]);
    const [comentario, setComentario] = useState("");
    const [change, setChange] = useState(false);
    const { data: session } = useSession();

    const comentar = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("/api/comment", {
                post: dataPosteo._id,
                user: session?.user?.id,
                content: comentario
            });

            if (result.status === 200 || result.status === 201) {
                setComentario("");
                setDataComentarios([...dataComentarios, result.data.comment]);
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

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axios.get(`/api/comment?id=${dataPosteo._id}`);

                if (result.status === 200) {
                    setDataComentarios(result.data.comments);
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

        getData();
    }, [dataPosteo, change]);

    const darLike = async (idComment) => {
        try {
            const result = await axios.put(`/api/comment?id=${idComment}`);

            if (result.status === 200 || result.status === 201) {
                setChange(!change);
            }

        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                console.error(`Error ${status}: ${data.error}`);
            } else {
                console.error('Error de red o solicitud fallida:', error.message);
            }
        }
    }

    return (
        <motion.div
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100vw", opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className='comment'>
            <div className="contenedor-comment">

                <div className="respuestas">
                    <div className="texto">
                        <p> Respuestas ({dataComentarios.length}) </p>
                    </div>
                    <div className="icono-closee" onClick={() => setIsOpenComment(false)}>
                        <IoMdClose className="close" />
                    </div>
                </div>

                <div className="comentarios-contenedor">
                    <div className="creacion-comentarios">
                        <div className="comentarios">
                            <div className="foto">
                                <Image src={session?.user?.image || "/img/title-doraemon.jpg"}
                                    width={32} height={32} alt="perfil" className="foto-perfil-comentarios" />
                            </div>
                            <div className="nombre-comentario">
                                <p> {session?.user?.name ? session?.user?.name[0].toUpperCase() + session?.user?.name.slice(1) : ""} </p>
                            </div>
                        </div>
                        <div className="comentarios-input">
                            <textarea type="text" name="comentario" id="comentario"
                                placeholder="¿Qué estás pensando?"
                                onChange={(e) => setComentario(e.target.value)} />
                        </div>
                        <div className="enviar-cancelar">
                            <button className="boton-de-cancelar" onClick={() => setComentario("")}> Cancelar </button>
                            <button className="boton-de-enviar" onClick={comentar}> Enviar </button>
                        </div>
                    </div>
                </div>

                <div className="posteo-comentarios">
                    {dataComentarios.map((item, index) => (
                        <div key={index} className="comentario">
                            <div className="datos">
                                <div className="foto">
                                    <Image className="foto-foto" src={session?.user[0]?.image === null || session?.user[0]?.image === "" || session?.user[0]?.image === undefined ? "/img/title-doraemon.jpg" : session?.user?.image} width={32} height={32} alt="perfil" />
                                </div>
                                <div className="nombre-fecha">
                                    <div className="nombre">
                                        <p>
                                            {item?.user[0]?.name ? item?.user[0]?.name[0].toUpperCase() + item?.user[0]?.name.slice(1) : ""}
                                        </p>
                                    </div>
                                    <div className="fecha">
                                        <p> {moment(item.createdAt).fromNow()} </p>
                                    </div>
                                </div>
                            </div>
                            <div className="contenido">
                                <div className="cont">
                                    <p> {item.content} </p>
                                </div>
                            </div>
                            <div className="espacio-likes">
                                <div className="icono" onClick={() => darLike(item._id)}>
                                    <FaHeart className="icon" />
                                </div>
                                <div className="texto-likes">
                                    <p> {item.likes} </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </motion.div>
    );
}

export default ItemComment;
