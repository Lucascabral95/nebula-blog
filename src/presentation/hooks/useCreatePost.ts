'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import type { ISession } from '@/infrastructure/interfaces/auth.interface'
import toast from 'react-hot-toast'

import { IPostFormState } from '@/infrastructure/interfaces'
import { postCreateService } from '@/infrastructure/service'

export const useCreatePost = () => {
  const { data: session } = useSession() as { data: ISession | null }
  const [formState, setFormState] = useState<IPostFormState>({
    titulo: '',
    slug: '',
    content: '',
    category: '',
  })

  useEffect(() => {
    const slug = postCreateService.generateSlug(formState.titulo)
    setFormState(prev => ({ ...prev, slug }))
  }, [formState.titulo])

  const handleTitleChange = (value: string) => {
    setFormState(prev => ({ ...prev, titulo: value }))
  }

  const handleContentChange = (value: string) => {
    setFormState(prev => ({ ...prev, content: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormState(prev => ({ ...prev, category: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const userId = session?.user?.id;
    if (!userId) {
      toast.error('No estás autenticado')
      return
    }

    try {
      await postCreateService.createPost({
        title: formState.titulo,
        slug: formState.slug,
        content: formState.content,
        author: userId,
        categories: formState.category,
      })

      setFormState({ titulo: '', slug: '', content: '', category: '' })
      toast.success('Publicado con éxito')
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al publicar'
      toast.error(errorMessage)
      console.error('Error al publicar:', error)
    }
  }

  return {
    formState,
    handleTitleChange,
    handleContentChange,
    handleCategoryChange,
    handleSubmit,
  }
}
// ...existing code...
