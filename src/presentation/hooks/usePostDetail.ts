'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'

import { IIPost, IIUser } from '@/infrastructure/interfaces'
import { postService } from '@/infrastructure/service'

export const usePostDetail = () => {
  const { id } = useParams() as { id: string }
  const { data: session } = useSession()
  const [post, setPost] = useState<IIPost | null>(null)
  const [user, setUser] = useState<IIUser | null>(null)
  const [likes, setLikes] = useState(0)
  const [comments, setComments] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPost = async () => {
      try {
        const { post, user } = await postService.getPost(id)
        setPost(post)
        setUser(user)
        setLikes(post.likes)
      } catch (error) {
        console.error('Error al cargar post:', error)
      }
    }
    loadPost()
  }, [id])

  useEffect(() => {
    const loadComments = async () => {
      try {
        const count = await postService.getComments(id)
        setComments(count)
        setLoading(false)
      } catch (error) {
        console.error('Error al cargar comentarios:', error)
      }
    }
    loadComments()
  }, [id])

  const handleLike = async () => {
    try {
      const newLikes = await postService.addLike(id)
      setLikes(newLikes)
    } catch (error) {
      console.error('Error al dar like:', error)
    }
  }

  const handleSaveFavorite = async () => {
    const userId = (session?.user as any)?.id as string | undefined
    if (!userId) return
    try {
      await postService.saveFavorite(userId, id)
      toast.success('Guardado exitosamente')
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Error al guardar')
    }
  }

  return {
    post,
    user,
    likes,
    comments,
    loading,
    handleLike,
    handleSaveFavorite,
  }
}
