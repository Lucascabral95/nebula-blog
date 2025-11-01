import { vi, describe, it, expect, beforeEach } from 'vitest'
import { commentService } from '../comment.service'
import axios from 'axios'

interface AxiosError extends Error {
  response?: {
    status: number;
    data?: any;
  };
}

vi.mock('axios')
const mockedAxios = vi.mocked(axios, true) // true enables deep mocking

const mockComments = [
  {
    _id: 'comment1',
    content: 'Great post! Very helpful.',
    user: { _id: 'user1', name: 'John Doe' },
    createdAt: '2023-01-01T00:00:00Z'
  },
  {
    _id: 'comment2',
    content: 'Thanks for sharing this.',
    user: { _id: 'user2', name: 'Jane Smith' },
    createdAt: '2023-01-02T00:00:00Z'
  }
]

const mockNewComment = {
  _id: 'comment3',
  content: 'Excellent article!',
  user: { _id: 'user3', name: 'Bob Wilson' },
  createdAt: '2023-01-03T00:00:00Z'
}

describe('CommentService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getComments', () => {
    it('should fetch comments by post ID', async () => {
      mockedAxios.get.mockResolvedValue({ data: { comments: mockComments } })

      const result = await commentService.getComments('post1')

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/comment?id=post1')
      expect(result).toEqual(mockComments)
    })

    it('should handle API errors when fetching comments', async () => {
      const error = new Error('Failed to fetch comments')
      mockedAxios.get.mockRejectedValue(error)

      await expect(commentService.getComments('post1')).rejects.toThrow('Failed to fetch comments')
    })

    it('should return empty array when post has no comments', async () => {
      mockedAxios.get.mockResolvedValue({ data: { comments: [] } })

      const result = await commentService.getComments('post1')

      expect(result).toEqual([])
    })
  })

  describe('createComment', () => {
    it('should create a new comment', async () => {
      mockedAxios.post.mockResolvedValue({ data: { comment: mockNewComment } })

      const result = await commentService.createComment('post1', 'user1', 'Great post!')

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/comment', {
        post: 'post1',
        user: 'user1',
        content: 'Great post!'
      })
      expect(result).toEqual(mockNewComment)
    })

    it('should handle API errors when creating comment', async () => {
      const error = new Error('Failed to create comment')
      mockedAxios.post.mockRejectedValue(error)

      await expect(commentService.createComment('post1', 'user1', 'Great post!')).rejects.toThrow('Failed to create comment')
    })

    it('should send correct payload structure', async () => {
      const postId = 'post123'
      const userId = 'user456'
      const content = 'This is a test comment'

      mockedAxios.post.mockResolvedValue({ data: { comment: mockNewComment } })

      await commentService.createComment(postId, userId, content)

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/comment', {
        post: postId,
        user: userId,
        content: content
      })
    })

    it('should handle empty content', async () => {
      const error = new Error('Comment content cannot be empty')
      mockedAxios.post.mockRejectedValue(error)

      await expect(commentService.createComment('post1', 'user1', '')).rejects.toThrow('Comment content cannot be empty')
    })
  })

  describe('likeComment', () => {
    it('should like a comment by comment ID', async () => {
      mockedAxios.put.mockResolvedValue({})

      await commentService.likeComment('comment1')

      expect(mockedAxios.put).toHaveBeenCalledWith('/api/comment?id=comment1')
    })

    it('should handle API errors when liking comment', async () => {
      const error = new Error('Failed to like comment')
      mockedAxios.put.mockRejectedValue(error)

      await expect(commentService.likeComment('comment1')).rejects.toThrow('Failed to like comment')
    })

    it('should handle non-existent comment ID', async () => {
      const error: AxiosError = new Error('Comment not found')
      error.response = { status: 404 }
      mockedAxios.put.mockRejectedValue(error)

      await expect(commentService.likeComment('nonexistent')).rejects.toThrow('Comment not found')
    })
  })
})
