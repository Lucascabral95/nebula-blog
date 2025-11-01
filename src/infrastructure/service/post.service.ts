import axios from 'axios'
import { IPostDetail } from '../interfaces'

export const postService = {
  getPost: async (id: string): Promise<IPostDetail> => {
    const { data } = await axios.get(`/api/post/${id}`)
    return data.result
  },

  getComments: async (id: string): Promise<number> => {
    const { data } = await axios.get(`/api/comment?id=${id}`)
    return data.comments.length
  },

  addLike: async (id: string): Promise<number> => {
    const { data } = await axios.put(`/api/post?id=${id}`)
    return data.cantidadDeLikes
  },

  saveFavorite: async (userId: string, postId: string): Promise<void> => {
    await axios.post(`/api/post/favoritas`, { user: userId, post: postId })
  }
}
