import axios from 'axios'
import { ISearchResult } from '@/infrastructure/interfaces/search.interface'

export const searchService = {
  getAllPosts: async (): Promise<ISearchResult[]> => {
    const { data } = await axios.get('/api/post')
    return data.posts
  },

  filterPosts: (posts: ISearchResult[], searchTerm: string): ISearchResult[] => {
    const term = searchTerm.toLowerCase()
    return posts.filter(post =>
      post.categories.toLowerCase().includes(term) ||
      post.title.toLowerCase().includes(term) ||
      post.author.some(author => author.name.toLowerCase().includes(term))
    )
  },
}
