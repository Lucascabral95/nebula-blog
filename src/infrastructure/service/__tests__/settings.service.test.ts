import { vi, describe, it, expect, beforeEach } from 'vitest'
import { settingsService } from '../settings.service'
import axios from 'axios'
import type { Mocked } from 'vitest'

vi.mock('axios')
const mockedAxios = axios as unknown as Mocked<typeof axios>

const mockUserAddress = {
  street: '456 Oak Ave',
  city: 'Córdoba',
  country: 'Argentina',
  zipCode: '5000'
}

const mockUserPosts = [
  { _id: 'post1', title: 'My First Post', author: [{ _id: 'user1', name: 'John Doe' }] },
  { _id: 'post2', title: 'Another Post', author: [{ _id: 'user2', name: 'Jane Smith' }] },
  { _id: 'post3', title: 'Third Post', author: [{ _id: 'user1', name: 'John Doe' }] }
]

const mockFavoritePosts = [
  { _id: 'fav1', title: 'Favorite Post 1' },
  { _id: 'fav2', title: 'Favorite Post 2' }
]

describe('SettingsService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getUserAddress', () => {
    it('should fetch user address', async () => {
      mockedAxios.get.mockResolvedValue({ data: { result: mockUserAddress } })

      const result = await settingsService.getUserAddress('user1')

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/detalles/direccion/user1')
      expect(result).toEqual(mockUserAddress)
    })

    it('should handle API errors when fetching user address', async () => {
      const error = new Error('Failed to fetch user address')
      mockedAxios.get.mockRejectedValue(error)

      await expect(settingsService.getUserAddress('user1')).rejects.toThrow('Failed to fetch user address')
    })
  })

  describe('getUserPosts', () => {
    it('should fetch and filter user posts by author ID', async () => {
      mockedAxios.get.mockResolvedValue({ data: { posts: mockUserPosts } })

      const result = await settingsService.getUserPosts('user1')

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/post')
      expect(result).toHaveLength(2)
      expect(result.every(post => post.author[0]._id === 'user1')).toBe(true)
    })

    it('should return empty array when user has no posts', async () => {
      mockedAxios.get.mockResolvedValue({ data: { posts: mockUserPosts } })

      const result = await settingsService.getUserPosts('user3')

      expect(result).toHaveLength(0)
    })

    it('should handle API errors when fetching user posts', async () => {
      const error = new Error('Failed to fetch user posts')
      mockedAxios.get.mockRejectedValue(error)

      await expect(settingsService.getUserPosts('user1')).rejects.toThrow('Failed to fetch user posts')
    })
  })

  describe('getFavoritePosts', () => {
    it('should fetch user favorite posts', async () => {
      mockedAxios.get.mockResolvedValue({ 
        data: { result: { post: mockFavoritePosts } } 
      })

      const result = await settingsService.getFavoritePosts('user1')

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/post/favoritas?id=user1')
      expect(result).toEqual(mockFavoritePosts)
    })

    it('should handle API errors when fetching favorite posts', async () => {
      const error = new Error('Failed to fetch favorite posts')
      mockedAxios.get.mockRejectedValue(error)

      await expect(settingsService.getFavoritePosts('user1')).rejects.toThrow('Failed to fetch favorite posts')
    })
  })

  describe('removeFavorite', () => {
    it('should remove a post from favorites', async () => {
      mockedAxios.delete.mockResolvedValue({})

      await settingsService.removeFavorite('user1', 'post1')

      expect(mockedAxios.delete).toHaveBeenCalledWith('/api/post/favoritas?id=user1&post=post1')
    })

    it('should handle API errors when removing favorite', async () => {
      const error = new Error('Failed to remove favorite')
      mockedAxios.delete.mockRejectedValue(error)

      await expect(settingsService.removeFavorite('user1', 'post1')).rejects.toThrow('Failed to remove favorite')
    })
  })
})
