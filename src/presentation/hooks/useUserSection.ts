'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import type { ISession } from '@/infrastructure/interfaces/auth.interface'
import toast from 'react-hot-toast'

import { IPost } from '@/infrastructure/interfaces/blog.interface'
import { IUserProfile } from '@/infrastructure/interfaces/user.interface'
import { settingsService } from '@/infrastructure/service'

export const useUserSection = () => {
  const { id, seccion } = useParams() as { id: string; seccion: string }
  const { data: session } = useSession() as { data: ISession | null }
  const [currentSection, setCurrentSection] = useState(seccion || 'cuenta')
  const [address, setAddress] = useState('')
  const [userPosts, setUserPosts] = useState<IPost[]>([])
  const [user, setUser] = useState<IUserProfile | null>(null)
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
    settingsService.getUserAddress(userId)
      .then(result => setAddress(`${result.provincia}, ${result.pais}`))
      .catch(console.error)
  }, [session?.user?.id])

  useEffect(() => {
    settingsService.getUserPosts(id)
      .then(posts => {
        setUserPosts(posts)
        if (posts.length > 0) {
          setUser(posts[0].author[0])
        }
      })
      .catch(console.error)
  }, [id])

  useEffect(() => {
    const userId = session?.user?.id;
    if (!userId) return;
    settingsService.getFavoritePosts(userId)
      .then(setFavorites)
      .catch(console.error)
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
    user,
    favorites,
    modalState,
    openModal,
    closeModal,
    handleRemoveFavorite,
  }
}