import { vi, describe, it, expect, beforeEach } from 'vitest'
import { blogService } from '../blog.service'
import axios from 'axios'
import type { IPost } from '@/infrastructure/interfaces/blog.interface'

vi.mock('axios')
const mockedAxios = vi.mocked(axios, true) // true enables deep mocking

const mockPosts: IPost[] = [
  {
    _id: 'post1',
    title: 'JavaScript Tips',
    categories: 'Programming, JavaScript',
    content: 'Great JS tips',
    author: [],
    createdAt: '2023-01-01',
    likes: 0,
    comments: []
  },
  {
    _id: 'post2',
    title: 'React Best Practices',
    categories: 'Programming, React',
    content: 'React best practices guide',
    author: [],
    createdAt: '2023-01-02',
    likes: 0,
    comments: []
  }
]

const mockCategories = [
  { _id: 'cat1', name: 'Programming' },
  { _id: 'cat2', name: 'JavaScript' },
  { _id: 'cat3', name: 'React' }
]

describe('BlogService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getPosts', () => {
    it('should fetch all posts', async () => {
      mockedAxios.get.mockResolvedValue({ data: { posts: mockPosts } })

      const result = await blogService.getPosts()

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/post')
      expect(result).toEqual(mockPosts)
    })

    it('should handle API errors when fetching posts', async () => {
      const error = new Error('Failed to fetch posts')
      mockedAxios.get.mockRejectedValue(error)

      await expect(blogService.getPosts()).rejects.toThrow('Failed to fetch posts')
    })
  })

  describe('getCategories', () => {
    it('should fetch all categories', async () => {
      mockedAxios.get.mockResolvedValue({ data: { categorias: mockCategories } })

      const result = await blogService.getCategories()

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/category')
      expect(result).toEqual(mockCategories)
    })

    it('should handle API errors when fetching categories', async () => {
      const error = new Error('Failed to fetch categories')
      mockedAxios.get.mockRejectedValue(error)

      await expect(blogService.getCategories()).rejects.toThrow('Failed to fetch categories')
    })
  })

  describe('filterByCategory', () => {
    it('should filter posts by category (case insensitive)', async () => {
      const result = await blogService.filterByCategory(mockPosts, 'javascript')

      expect(result).toHaveLength(1)
      expect(result[0]._id).toBe('post1')
    })

    it('should filter posts by partial category match', async () => {
      const result = await blogService.filterByCategory(mockPosts, 'program')

      expect(result).toHaveLength(2)
    })

    it('should handle category filtering with different cases', async () => {
      const result = await blogService.filterByCategory(mockPosts, 'REACT')

      expect(result).toHaveLength(1)
      expect(result[0]._id).toBe('post2')
    })

    it('should return empty array when no posts match category', async () => {
      const result = await blogService.filterByCategory(mockPosts, 'nonexistent')

      expect(result).toHaveLength(0)
    })

    it('should handle empty posts array', async () => {
      const result = await blogService.filterByCategory([], 'javascript')

      expect(result).toHaveLength(0)
    })
  })
})
