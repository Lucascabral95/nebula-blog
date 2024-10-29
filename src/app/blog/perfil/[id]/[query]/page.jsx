"use client"
import { useState } from 'react'
import { useParams } from 'next/navigation'

const PageQuery = () => {
    const { id, query } = useParams()
    const [queryActual, setQueryActual] = useState(query)

    return (
        <div>
            <h1> Endpoint d prueba de queries </h1>

            <p> id: {id} </p>
            <p> query: {query} </p>

            <p> El valor de la query del estado actual es de: {queryActual} </p>


        </div>
    )
}

export default PageQuery