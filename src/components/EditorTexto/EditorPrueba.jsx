"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"

const EditorPrueba = () => {
    const { data: session } = useSession();
    const [titulo, setTitulo] = useState('');
    const [content, setContent] = useState('');
    const [slug, setSlug] = useState('');


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

    const enviar = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.post('/api/post', {
                title: titulo,
                slug: slug,
                content: content,
                author: session?.user?.id,
                categories: "Tecnologia"
            });

            if (result.status === 200 || result.status === 201) {
                console.log(result.data);
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

    return (
        <div className="editor">

            <h1>Editor de texto</h1>

            <form onSubmit={enviar}>
                <label htmlFor="title"> Título </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={titulo}
                    required
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <label htmlFor="content"> Contenido </label>
                <textarea
                    rows="10"
                    required
                    id="content"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">Publicar</button>
            </form>

        </div>
    )
}

export default EditorPrueba