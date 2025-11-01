import { vi, describe, it, expect, beforeEach, Mocked } from 'vitest'
import { postCreateService } from '../postCreate.service'
import axios from 'axios'

// Mock axios
vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

const mockCreatePost = {
  title: 'My New Post',
  slug: 'my-new-post',
  content: 'This is the content of my new post',
  author: 'user1',
  categories: 'Programming, JavaScript'
}

describe('PostCreateService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('generateSlug', () => {
    it('should generate a proper slug from title', () => {
      const title = 'My Awesome Blog Post'
      const result = postCreateService.generateSlug(title)

      expect(result).toBe('my-awesome-blog-post')
    })

    it('should convert to lowercase', () => {
      const title = 'UPPERCASE TITLE'
      const result = postCreateService.generateSlug(title)

      expect(result).toBe('uppercase-title')
    })

    it('should remove special characters', () => {
      const title = 'Title with @special #characters!'
      const result = postCreateService.generateSlug(title)

      expect(result).toBe('title-with-special-characters')
    })

    it('should replace spaces and underscores with hyphens', () => {
      const title = 'Title with spaces_and_underscores'
      const result = postCreateService.generateSlug(title)

      expect(result).toBe('title-with-spaces-and-underscores')
    })

    it('should remove leading and trailing hyphens', () => {
      const title = '---Title with hyphens---'
      const result = postCreateService.generateSlug(title)

      expect(result).toBe('title-with-hyphens')
    })

    it('should handle multiple consecutive separators', () => {
      const title = 'Title   with___multiple---separators'
      const result = postCreateService.generateSlug(title)

      expect(result).toBe('title-with-multiple-separators')
    })

    it('should handle empty string', () => {
      const result = postCreateService.generateSlug('')

      expect(result).toBe('')
    })

    it('should handle title with only special characters', () => {
      const title = '@#$%^&*()'
      const result = postCreateService.generateSlug(title)

      expect(result).toBe('')
    })

    it('should trim whitespace', () => {
      const title = '   Title with spaces   '
      const result = postCreateService.generateSlug(title)

      expect(result).toBe('title-with-spaces')
    })
  })

  describe('createPost', () => {
    it('should create a new post', async () => {
      mockedAxios.post.mockResolvedValue({})

      await postCreateService.createPost(mockCreatePost)

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/post', mockCreatePost)
    })

    it('should handle API errors when creating post', async () => {
      const error = new Error('Failed to create post')
      mockedAxios.post.mockRejectedValue(error)

      await expect(postCreateService.createPost(mockCreatePost)).rejects.toThrow('Failed to create post')
    })

    it('should send post data with correct structure', async () => {
      const postData = {
        title: 'Test Post',
        slug: 'test-post',
        content: 'Test content',
        author: 'author1',
        categories: 'Test, Category'
      }

      mockedAxios.post.mockResolvedValue({})

      await postCreateService.createPost(postData)

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/post', postData)
    })
  })
})
