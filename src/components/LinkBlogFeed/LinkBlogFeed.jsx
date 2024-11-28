"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'

const LinkBlogFeed = ({ id }) => {
    const [dataUser, setDataUser] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axios.get(`/api/detalles/bio/detalle/${id}`)

                if (result.status === 200 || result.status === 201) {
                    setDataUser(result.data.result)
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

        getData()
    }, [])

    return (
        <>
            <Link href={`/blog/perfil/${dataUser.user}`} className="imagen">
                <Image src="/img/title-doraemon.jpg" className="imagen-imagen" alt="Perfil" width={20} height={20} />
            </Link>
            <Link href={`/blog/perfil/${dataUser.user}`} className="nombre">
                <p> {dataUser.nombreCompleto} </p>
            </Link>
        </>
    )
}

export default LinkBlogFeed

