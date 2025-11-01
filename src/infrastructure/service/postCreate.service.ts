import axios from 'axios'
import { ICreatePost } from '../interfaces'

export const postCreateService = {
  generateSlug: (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  },

  createPost: async (post: ICreatePost): Promise<void> => {
    await axios.post('/api/post', post)
  },
}
