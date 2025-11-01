'use client'
import { useParams } from 'next/navigation'

const PageQuery = () => {
  const { id, query } = useParams()

  return (
    <div>
      <h1>Endpoint de prueba de queries</h1>
      <p>id: {id}</p>
      <p>query: {query}</p>
      <p>El valor de la query del estado actual es de: {query}</p>
    </div>
  )
}

export default PageQuery
