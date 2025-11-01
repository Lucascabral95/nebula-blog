import { vi, describe, it, expect, beforeEach, Mocked } from 'vitest'
import { postService } from '../post.service'
import axios from 'axios'

vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

const mockPostDetail = {
  _id: 'post1',
  title: 'Test Post',
  content: 'Test content',
  author: { _id: 'author1', name: 'John Doe' }
}

const mockComments = [
  { _id: 'comment1', content: 'Great post!' },
  { _id: 'comment2', content: 'Very helpful' }
]

describe('PostService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getPost', () => {
    it('should fetch post details by ID', async () => {
      mockedAxios.get.mockResolvedValue({ data: { result: mockPostDetail } })

      const result = await postService.getPost('post1')

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/post/post1')
      expect(result).toEqual(mockPostDetail)
    })

    it('should handle API errors when fetching post', async () => {
      const error = new Error('Post not found')
      mockedAxios.get.mockRejectedValue(error)

      await expect(postService.getPost('post1')).rejects.toThrow('Post not found')
    })
  })

  describe('getComments', () => {
    it('should fetch comments count for a post', async () => {
      mockedAxios.get.mockResolvedValue({ data: { comments: mockComments } })

      const result = await postService.getComments('post1')

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/comment?id=post1')
      expect(result).toBe(2)
    })

    it('should return 0 for posts with no comments', async () => {
      mockedAxios.get.mockResolvedValue({ data: { comments: [] } })

      const result = await postService.getComments('post1')

      expect(result).toBe(0)
    })

    it('should handle API errors when fetching comments', async () => {
      const error = new Error('Failed to fetch comments')
      mockedAxios.get.mockRejectedValue(error)

      await expect(postService.getComments('post1')).rejects.toThrow('Failed to fetch comments')
    })
  })

  describe('addLike', () => {
    it('should add a like to a post and return new like count', async () => {
      mockedAxios.put.mockResolvedValue({ data: { cantidadDeLikes: 5 } })

      const result = await postService.addLike('post1')

      expect(mockedAxios.put).toHaveBeenCalledWith('/api/post?id=post1')
      expect(result).toBe(5)
    })

    it('should handle API errors when adding like', async () => {
      const error = new Error('Failed to add like')
      mockedAxios.put.mockRejectedValue(error)

      await expect(postService.addLike('post1')).rejects.toThrow('Failed to add like')
    })
  })

  describe('saveFavorite', () => {
    it('should save a post as favorite', async () => {
      mockedAxios.post.mockResolvedValue({})

      await postService.saveFavorite('user1', 'post1')

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/post/favoritas', {
        user: 'user1',
        post: 'post1'
      })
    })

    it('should handle API errors when saving favorite', async () => {
      const error = new Error('Failed to save favorite')
      mockedAxios.post.mockRejectedValue(error)

      await expect(postService.saveFavorite('user1', 'post1')).rejects.toThrow('Failed to save favorite')
    })
  })
})
