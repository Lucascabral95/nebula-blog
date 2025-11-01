import { vi, describe, it, expect, beforeEach, Mocked } from 'vitest'
import { searchService } from '../search.service'
import axios from 'axios'

vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

const mockSearchResults = [
  {
    _id: 'post1',
    title: 'JavaScript Best Practices',
    categories: 'Programming, JavaScript',
    author: [{ name: 'John Doe' }]
  },
  {
    _id: 'post2',
    title: 'React Hooks Guide',
    categories: 'Programming, React',
    author: [{ name: 'Jane Smith' }]
  },
  {
    _id: 'post3',
    title: 'TypeScript Tips',
    categories: 'Programming, TypeScript',
    author: [{ name: 'John Doe' }]
  }
]

describe('SearchService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getAllPosts', () => {
    it('should fetch all posts for search', async () => {
mockedAxios.get.mockResolvedValue({ data: { posts: mockSearchResults } })

      const result = await searchService.getAllPosts()

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/post')
      expect(result).toEqual(mockSearchResults)
    })

    it('should handle API errors when fetching all posts', async () => {
      const error = new Error('Failed to fetch posts')
      mockedAxios.get.mockRejectedValueOnce(error)

      await expect(searchService.getAllPosts()).rejects.toThrow('Failed to fetch posts')
    })
  })

  describe('filterPosts', () => {
    it('should filter posts by category (case insensitive)', () => {
      const result = searchService.filterPosts(mockSearchResults, 'javascript')

      expect(result).toHaveLength(1)
      expect(result[0]._id).toBe('post1')
    })

    it('should filter posts by title (case insensitive)', () => {
      const result = searchService.filterPosts(mockSearchResults, 'react')

      expect(result).toHaveLength(1)
      expect(result[0]._id).toBe('post2')
    })

    it('should filter posts by author name (case insensitive)', () => {
      const result = searchService.filterPosts(mockSearchResults, 'john')

      expect(result).toHaveLength(2)
      expect(result.map(post => post._id)).toEqual(['post1', 'post3'])
    })

    it('should filter posts by partial matches', () => {
      const result = searchService.filterPosts(mockSearchResults, 'script')

      expect(result).toHaveLength(2)
      expect(result.map(post => post._id)).toEqual(['post1', 'post3'])
    })

    it('should return posts matching any field (title, category, or author)', () => {
      const result = searchService.filterPosts(mockSearchResults, 'programming')

      expect(result).toHaveLength(3)
    })

    it('should handle case insensitive search', () => {
      const result1 = searchService.filterPosts(mockSearchResults, 'JAVASCRIPT')
      const result2 = searchService.filterPosts(mockSearchResults, 'javascript')

      expect(result1).toEqual(result2)
      expect(result1).toHaveLength(1)
    })

    it('should return empty array for non-matching search term', () => {
      const result = searchService.filterPosts(mockSearchResults, 'nonexistent')

      expect(result).toHaveLength(0)
    })

    it('should handle empty posts array', () => {
      const result = searchService.filterPosts([], 'javascript')

      expect(result).toHaveLength(0)
    })

    it('should handle empty search term', () => {
      const result = searchService.filterPosts(mockSearchResults, '')

      expect(result).toHaveLength(3)
    })

    it('should handle posts with multiple authors', () => {
      const postsWithMultipleAuthors = [
        {
          _id: 'post4',
          title: 'Multi Author Post',
          categories: 'Programming',
          author: [
            { name: 'Alice Johnson' },
            { name: 'Bob Smith' }
          ]
        }
      ]

      const result = searchService.filterPosts(postsWithMultipleAuthors, 'alice')

      expect(result).toHaveLength(1)
      expect(result[0]._id).toBe('post4')
    })
  })
})
