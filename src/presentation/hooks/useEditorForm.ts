'use client'


import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { postCreateService } from '@/infrastructure/service'
import type { ISession } from '@/infrastructure/interfaces/auth.interface'

export const useEditorForm = () => {
  const { data: session } = useSession() as { data: ISession }
  const [titulo, setTitulo] = useState('')
  const [content, setContent] = useState('')
  const [slug, setSlug] = useState('')

  useEffect(() => {
    const slug = postCreateService.generateSlug(titulo)
    setSlug(slug)
  }, [titulo])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session?.user?.id) {
      toast.error('No estás autenticado')
      return
    }

    try {
      await postCreateService.createPost({
        title: titulo,
        slug,
        content,
        author: session.user.id,
        categories: 'Tecnologia',
      })

      toast.success('Publicado con éxito')
      setTitulo('')
      setContent('')
      setSlug('')
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al publicar'
      toast.error(errorMessage)
      console.error('Error:', error)
    }
  }

  return {
    titulo,
    setTitulo,
    content,
    setContent,
    slug,
    handleSubmit,
  }
}
