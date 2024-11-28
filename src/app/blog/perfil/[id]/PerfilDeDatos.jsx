"use client"
import { useEffect, useState } from "react"
import { useSession } from 'next-auth/react'
import { FaHome, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
import axios from "axios";

const PerfilDeDatos = ({ dataMyPosts, datosDelUsuario, id }) => {
    const { data: session } = useSession()
    const [dataBio, setDataBio] = useState([])
    const [dataDireccion, setDataDireccion] = useState([])
    const [dataDetalles, setDataDetalles] = useState([])

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const userId = id;
                if (!userId) return;
    
                const bioResponse = await axios.get(`/api/detalles/bio?id=${userId}`);
                if (bioResponse.status === 200 || bioResponse.status === 201) {
                    setDataBio(bioResponse.data.result);
                }
    
                const direccionResponse = await axios.get(`/api/detalles/direccion?id=${userId}`);
                if (direccionResponse.status === 200 || direccionResponse.status === 201) {
                    setDataDireccion(direccionResponse.data.result);
                }
    
                const detallesResponse = await axios.get(`/api/detalles/detalles?id=${userId}`);
                if (detallesResponse.status === 200 || detallesResponse.status === 201) {
                    setDataDetalles(detallesResponse.data.result);
                }
            } catch (error) {
                console.log("Error obteniendo datos:", error);
            }
        };
    
        obtenerDatos();
    }, [session?.user?.id]);

    return (
        <>
            <div className="contenedor-foto-perfil">
                <div className="foto-foto">
                    <Image src="/img/title-doraemon.jpg"
                        alt="Perfil"
                        width={88}
                        height={88}
                        className='foto-foto-foto'
                    />
                </div>
            </div>
            <div className="perfil-nombre">
                <p> {datosDelUsuario?.name} </p>
            </div>
            <div className="publish">
                <p>
                    {dataMyPosts?.length === 0
                        ? "Sin publicaciones"
                        : dataMyPosts?.length === 1
                            ? "1 publicacion"
                            : dataMyPosts?.length + " publicaciones"
                    }
                </p>
            </div>
            <div className="descripcion-perfil" style={{ marginBottom: "16px" }}>
                <p>
                    {dataBio?.bio === "" || dataBio?.bio === null || dataBio?.bio === undefined
                        ? "Ninguna descripcion por el momento..."
                        : dataBio.bio
                    }
                </p>
            </div>
            {dataDireccion.partido && dataDireccion.provincia && dataDireccion.pais &&
                <div className='descripcion-icono-texto'>
                    <div className="icono">
                        <FaHome className="icono-seccion" />
                    </div>
                    <p> {dataDireccion.partido + ", " + dataDireccion.provincia + ", " + dataDireccion.pais} </p>
                </div>
            }
            {dataDetalles.email &&
                <div className='descripcion-icono-texto'>
                    <div className="icono">
                        <MdEmail className="icono-seccion" />
                    </div>
                    <p> {dataDetalles.email ? dataDetalles.email : dataMyPosts[0]?.author[0]?.email} </p>
                </div>
            }
            {dataDetalles.github &&
                <div className='descripcion-icono-texto'>
                    <div className="icono">
                        <FaGithub className="icono-seccion" />
                    </div>
                    <p> <a rel="noreferrer" className='link-a-redes' href={`https://github.com/${dataDetalles.github}`} target='_blank'> https://github.com/{dataDetalles.github} </a> </p>
                </div>
            }
            {dataDetalles.linkeding &&
                <div className='descripcion-icono-texto'>
                    <div className="icono">
                        <FaLinkedin className="icono-seccion" />
                    </div>
                    <p> <a rel="noreferrer" className='link-a-redes' href={dataDetalles.linkeding} target='_blank'> https://www.linkedin.com/in/{dataDetalles.linkeding} </a> </p>
                </div>
            }
        </>
    )
}

export default PerfilDeDatos;

