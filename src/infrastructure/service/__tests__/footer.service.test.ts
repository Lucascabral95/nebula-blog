import { vi, describe, it, expect, beforeEach } from 'vitest'
import { footerService } from '../footer.service'
import axios, { AxiosError } from 'axios'

vi.mock('axios')
const mockedAxios = vi.mocked(axios, true)

const mockAuthorDetails = {
  name: 'John Doe',
  bio: 'Software developer and tech writer',
  avatar: 'https://example.com/avatar.jpg',
  social: {
    twitter: '@johndoe',
    github: 'johndoe'
  }
}

describe('FooterService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getAuthorDetails', () => {
    it('should fetch author details by post ID', async () => {
      mockedAxios.get.mockImplementation(() => Promise.resolve({ data: { result: mockAuthorDetails } }))

      const result = await footerService.getAuthorDetails('post1')

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/detalles/bio/detalle/post1')
      expect(result).toEqual(mockAuthorDetails)
    })

    it('should handle API errors when fetching author details', async () => {
      const error = new Error('Failed to fetch author details') as AxiosError
      mockedAxios.get.mockImplementation(() => Promise.reject(error))

      await expect(footerService.getAuthorDetails('post1')).rejects.toThrow('Failed to fetch author details')
    })

    it('should handle empty post ID', async () => {
      const error = new Error('Post ID is required') as AxiosError
      mockedAxios.get.mockImplementation(() => Promise.reject(error))

      await expect(footerService.getAuthorDetails('')).rejects.toThrow('Post ID is required')
    })

    it('should handle 404 errors for non-existent posts', async () => {
      const error = {
        message: 'Post not found',
        response: {
          status: 404,
          data: { message: 'Post not found' },
          statusText: 'Not Found',
          headers: {},
          config: {}
        }
      } as AxiosError
      
      mockedAxios.get.mockImplementation(() => Promise.reject(error))

      await expect(footerService.getAuthorDetails('nonexistent')).rejects.toThrow('Post not found')
    })
  })
})
