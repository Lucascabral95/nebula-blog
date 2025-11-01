'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import type { ISession } from '@/infrastructure/interfaces/auth.interface'
import toast from 'react-hot-toast'

import { IPost } from '@/infrastructure/interfaces/blog.interface'
import { settingsService } from '@/infrastructure/service'

export const useSettings = () => {
  const { id } = useParams() as { id: string }
  const { data: session } = useSession() as { data: ISession | null }
  const [currentSection, setCurrentSection] = useState('cuenta')
  const [address, setAddress] = useState('')
  const [userPosts, setUserPosts] = useState<IPost[]>([])
  const [favorites, setFavorites] = useState<IPost[]>([])
  const [modalState, setModalState] = useState({
    bio: false,
    datos: false,
    direccion: false,
    email: false,
  })

  useEffect(() => {
    const userId = session?.user?.id;
    if (!userId) return;
    settingsService.getUserAddress(userId).then(result => {
      setAddress(`${result.provincia}, ${result.pais}`)
    }).catch(console.error)
  }, [session?.user?.id])

  useEffect(() => {
    settingsService.getUserPosts(id).then(setUserPosts).catch(console.error)
  }, [id])

  useEffect(() => {
    const userId = session?.user?.id;
    if (!userId) return;
    settingsService.getFavoritePosts(userId).then(setFavorites).catch(console.error)
  }, [session?.user?.id])

  const handleRemoveFavorite = async (postId: string) => {
    const userId = session?.user?.id;
    if (!userId) return;
    try {
      await settingsService.removeFavorite(userId, postId)
      toast.success('Publicación eliminada')
      setFavorites(favorites.filter(fav => fav._id !== postId))
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Error al eliminar')
    }
  }

  const openModal = (modal: keyof typeof modalState) => {
    setModalState(prev => ({ ...prev, [modal]: true }))
  }

  const closeModal = (modal: keyof typeof modalState) => {
    setModalState(prev => ({ ...prev, [modal]: false }))
  }

  return {
    currentSection,
    setCurrentSection,
    address,
    userPosts,
    favorites,
    modalState,
    openModal,
    closeModal,
    handleRemoveFavorite,
  }
}