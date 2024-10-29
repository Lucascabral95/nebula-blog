"use client"
import "./Header.scss"
import { TfiWrite } from "react-icons/tfi";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useEffect, useState } from "react";
import Settings from "../Settings/Settings";
import Link from "next/link";
import axios from "axios";
import ItemsSearch from "./ItemsSearch";
import useStore from "@/zustand";
import { usePathname } from "next/navigation";

const Header = () => {
    const { toggleSearchFull, setArrayDePosteos, search, setSearch } = useStore()
    const { data: session } = useSession()
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [publicacionesEncontradas, setPublicacionesEncontradas] = useState([])
    const pathName = usePathname();

    useEffect(() => {
        if (search === "") {
            setPublicacionesEncontradas([])
            setArrayDePosteos([])
            setIsOpenMenu(false)
        }

    }, [search])

    useEffect(() => {
        const getPosts = async () => {
            try {
                const result = await axios.get('/api/post');

                if (result.status === 200 || result.status === 201) {
                    const filtroDePosteos = result.data.posts.filter(post =>
                        post.categories.toLowerCase().includes(search.toLowerCase())
                        || post.title.toLowerCase().includes(search.toLowerCase())
                        || post.author.map(author => author.name.toLowerCase().includes(search.toLowerCase())).includes(true)
                    );

                    setPublicacionesEncontradas(filtroDePosteos);
                    setArrayDePosteos(filtroDePosteos);
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

        if (search) {
            getPosts();
        }
    }, [search]);

    return (
        <header className='header-oficial'>
            <div className="contenedor-header-oficial">

                <div className="logo-nombre">
                    <Link href="/blog" className="log" >
                        <h1 className="titulo-logo-nombre"> Nebula </h1>
                    </Link>
                    <div className="buscador">
                        <div className="lupa">
                            <HiMiniMagnifyingGlass className="icono-buscador" />
                        </div>
                        <div className="input-de-busqueda">
                            <input
                                value={search}
                                className="input-buscador"
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder="Buscar..."
                            />
                        </div>
                    </div>

                    {(pathName !== "/blog") &&
                        (publicacionesEncontradas.length > 0 && search !== "" && (
                            <ItemsSearch publicacionesEncontradas={publicacionesEncontradas} />
                        ))
                    }

                </div>

                <div className="escribir-perfil">
                    <button className="boton-lupa" onClick={toggleSearchFull}>
                        <HiMiniMagnifyingGlass className="icono-buscador" />
                    </button>
                    <Link href="/blog/escribir-posteo" className="seccion">
                        <div className="ic">
                            <TfiWrite className="icono-escritura" />
                        </div>
                        <div className="text">
                            <p className="seccion-texto"> Escribir </p>
                        </div>
                    </Link>
                    <div className="perfil" onClick={() => setIsOpenMenu(!isOpenMenu)}>
                        <Image className="imagen-perfil" src={session?.user?.image === null || session?.user?.image === undefined ? "/img/title-doraemon.jpg" : session?.user?.image} width={32} height={32} alt="imagen de perfil" />
                    </div>
                </div>

                {isOpenMenu && <Settings />}

            </div>
        </header>
    )
}

export default Header