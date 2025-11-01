import axios from 'axios'
import { IPost, ICategory } from '@/infrastructure/interfaces/blog.interface'

export const blogService = {
  getPosts: async (): Promise<IPost[]> => {
    const { data } = await axios.get('/api/post')
    return data.posts
  },

  getCategories: async (): Promise<ICategory[]> => {
    const { data } = await axios.get('/api/category')
    return data.categorias
  },

  filterByCategory: async (posts: IPost[], category: string): Promise<IPost[]> => {
    return posts.filter(post => post.categories.toLowerCase().includes(category.toLowerCase()))
  }
}
