'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import type { ISession } from '@/infrastructure/interfaces/auth.interface'
import toast from 'react-hot-toast'

import { IProfilePost, IUserProfile } from '@/infrastructure/interfaces/user.interface'
import { userService } from '@/infrastructure/service'

export const useUserProfile = () => {
  const { id } = useParams() as { id: string }
  const { data: session } = useSession() as { data: ISession | null }
  const [posts, setPosts] = useState<IProfilePost[]>([])
  const [user, setUser] = useState<IUserProfile | null>(null)
  const [favorites, setFavorites] = useState<IProfilePost[]>([])
  const [currentSection, setCurrentSection] = useState('publicaciones')

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { posts, user } = await userService.getUserProfile(id)
        setPosts(posts)
        setUser(user[0])
      } catch (error) {
        console.error('Error al cargar perfil:', error)
      }
    }
    loadUserData()
  }, [id])

  useEffect(() => {
    const userId = session?.user?.id;
    if (!userId) return;
    const loadFavorites = async () => {
      try {
        const favs = await userService.getFavoritePosts(userId)
        setFavorites(favs)
      } catch (error) {
        console.error('Error al cargar favoritos:', error)
      }
    }
    loadFavorites()
  }, [session?.user?.id])

  const handleRemoveFavorite = async (postId: string) => {
    const userId = session?.user?.id;
    if (!userId) return;
    try {
      await userService.removeFavorite(userId, postId)
      toast.success('Publicación eliminada')
      setFavorites(favorites.filter(fav => fav._id !== postId))
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Error al eliminar')
    }
  }

  return {
    posts,
    user,
    favorites,
    currentSection,
    setCurrentSection,
    handleRemoveFavorite,
    isOwnProfile: id === session?.user?.id,
  }
}