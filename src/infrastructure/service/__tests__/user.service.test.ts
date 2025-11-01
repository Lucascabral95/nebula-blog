import { vi, describe, it, expect, beforeEach } from 'vitest'
import { userService } from '../user.service'
import axios from 'axios'
import type { Mocked } from 'vitest'

vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

const mockUserProfileResponse = {
  result: {
    user: { _id: 'user1', name: 'John Doe' },
    posts: [{ _id: 'post1', title: 'Test Post' }]
  }
}

const mockProfilePosts = [
  { _id: 'post1', title: 'Test Post 1' },
  { _id: 'post2', title: 'Test Post 2' }
]

describe('UserService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getUserProfile', () => {
    it('should fetch user profile data', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockUserProfileResponse })

      const result = await userService.getUserProfile('user1')

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/post/posteos/user1')
      expect(result).toEqual(mockUserProfileResponse.result)
    })

    it('should handle API errors when fetching user profile', async () => {
      const error = new Error('Failed to fetch user profile')
      mockedAxios.get.mockRejectedValue(error)

      await expect(userService.getUserProfile('user1')).rejects.toThrow('Failed to fetch user profile')
    })
  })

  describe('getFavoritePosts', () => {
    it('should fetch user favorite posts', async () => {
      mockedAxios.get.mockResolvedValue({ 
        data: { result: { post: mockProfilePosts } } 
      })

      const result = await userService.getFavoritePosts('user1')

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/post/favoritas?id=user1')
      expect(result).toEqual(mockProfilePosts)
    })

    it('should handle API errors when fetching favorite posts', async () => {
      const error = new Error('Failed to fetch favorite posts')
      mockedAxios.get.mockRejectedValue(error)

      await expect(userService.getFavoritePosts('user1')).rejects.toThrow('Failed to fetch favorite posts')
    })
  })

  describe('removeFavorite', () => {
    it('should remove a post from favorites', async () => {
      mockedAxios.delete.mockResolvedValue({})

      await userService.removeFavorite('user1', 'post1')

      expect(mockedAxios.delete).toHaveBeenCalledWith('/api/post/favoritas?id=user1&post=post1')
    })

    it('should handle API errors when removing favorite', async () => {
      const error = new Error('Failed to remove favorite')
      mockedAxios.delete.mockRejectedValue(error)

      await expect(userService.removeFavorite('user1', 'post1')).rejects.toThrow('Failed to remove favorite')
    })
  })
})
