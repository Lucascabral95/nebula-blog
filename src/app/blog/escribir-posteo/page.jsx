"use client";
import "./NuevoPosteo.scss";
import { useSession } from "next-auth/react";
import MyEditor from "@/components/EditorTexto/EditorTexto";
import Link from "next/link";
import "../../../components/FooterInterior/FooterInterior.scss";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const NuevoPosteo = () => {
    const { data: session } = useSession();
    const [titulo, setTitulo] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        const changeSlug = (titulo) => {
            let slug = titulo
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+/, '')
                .replace(/-+$/, '');
            setSlug(slug);
        };

        changeSlug(titulo);
    }, [titulo]);

    const handleChange = (value) => {
        setContent(value);
    };

    const enviar = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.post('/api/post', {
                title: titulo,
                slug: slug,
                content: content,
                author: session?.user?.id,
                categories: category
            });

            if (result.status === 200 || result.status === 201) {
                setTitulo('');
                setSlug('');
                setContent('');
                setCategory('');
                toast.success('Publicado con exito');
            }

        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                console.error(`Error ${status}: ${data.error}`);
                toast.error(data.error);
            } else {
                console.error('Error de red o solicitud fallida:', error.message);
            }
        }
    };

    return (
        <div className="posteo">
            <div className="contenedor-posteo">
                <div className="header-posteo">
                    <div className="logo-posteo">
                        <Link href="/blog" className="tituloo">
                            <h2>Nebula</h2>
                        </Link>
                        <div className="descripcion">
                            <p>Escribiendo por {session?.user?.email}</p>
                        </div>
                    </div>
                    <div className="publicacion-posteo">
                        <button className="boton-publicar" onClick={enviar}>Publicar</button>
                    </div>
                </div>

                <MyEditor
                    titulo={titulo}
                    setTitulo={setTitulo}
                    content={content}
                    setContent={setContent}
                    category={category}
                    setCategory={setCategory}
                    enviar={enviar}
                    handleChange={handleChange}
                />

                <Toaster />

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
    );
};

export default NuevoPosteo;