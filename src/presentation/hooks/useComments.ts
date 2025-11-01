'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import type { ISession } from '@/infrastructure/interfaces/auth.interface'
import { commentService } from '@/infrastructure/service/comment.service'
import { ItemComment } from '@/infrastructure/interfaces'
// ...existing code...
export const useComments = (postId: string) => {
  const { data: session } = useSession() as { data: ISession | null }
  const [comments, setComments] = useState<ItemComment[]>([])
  const [newComment, setNewComment] = useState('')
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await commentService.getComments(postId)
        setComments(data)
      } catch (error) {
        console.error('Error al cargar comentarios:', error)
      }
    }
    loadComments()
  }, [postId, refresh])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    const userId = session?.user?.id;
    if (!userId || !newComment.trim()) return

    try {
      const comment = await commentService.createComment(postId, userId, newComment)
      setComments([...comments, comment])
      setNewComment('')
    } catch (error) {
      console.error('Error al crear comentario:', error)
    }
  }

  const handleLikeComment = async (commentId: string) => {
    try {
      await commentService.likeComment(commentId)
      setRefresh(!refresh)
    } catch (error) {
      console.error('Error al dar like:', error)
    }
  }

  return {
    comments,
    newComment,
    setNewComment,
    handleSubmitComment,
    handleLikeComment,
  }
}
