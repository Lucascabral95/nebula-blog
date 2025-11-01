import axios from 'axios'
import { IPost } from '@/infrastructure/interfaces/blog.interface'

export const settingsService = {
  getUserAddress: async (userId: string) => {
    const { data } = await axios.get(`/api/detalles/direccion/${userId}`)
    return data.result
  },

  getUserPosts: async (userId: string): Promise<IPost[]> => {
    const { data } = await axios.get(`/api/post`)
    return data.posts.filter((post: IPost) => post.author[0]._id === userId)
  },

  getFavoritePosts: async (userId: string): Promise<IPost[]> => {
    const { data } = await axios.get(`/api/post/favoritas?id=${userId}`)
    return data.result.post
  },

  removeFavorite: async (userId: string, postId: string): Promise<void> => {
    await axios.delete(`/api/post/favoritas?id=${userId}&post=${postId}`)
  },
}
