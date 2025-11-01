import axios from 'axios'

import { IProfilePost, IUserProfileResponse,  } from '@/infrastructure/interfaces/user.interface'

export const userService = {
  getUserProfile: async (userId: string): Promise<IUserProfileResponse> => {
    const { data } = await axios.get(`/api/post/posteos/${userId}`)
    return data.result
  },

  getFavoritePosts: async (userId: string): Promise<IProfilePost[]> => {
    const { data } = await axios.get(`/api/post/favoritas?id=${userId}`)
    return data.result.post
  },

  removeFavorite: async (userId: string, postId: string): Promise<void> => {
    await axios.delete(`/api/post/favoritas?id=${userId}&post=${postId}`)
  },
}
