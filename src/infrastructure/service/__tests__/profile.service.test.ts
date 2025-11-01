import { vi, describe, it, expect, beforeEach } from 'vitest'
import type { Mocked } from 'vitest'
import type { AxiosStatic } from 'axios'
import { profileService } from '../profile.service'
import axios from 'axios'

vi.mock('axios')
const mockedAxios = axios as Mocked<AxiosStatic>

const mockBioData = {
  bio: 'Software developer passionate about React',
  experience: '5 years',
  skills: ['JavaScript', 'React', 'TypeScript']
}

const mockAddressData = {
  street: '123 Main St',
  city: 'Buenos Aires',
  country: 'Argentina',
  zipCode: '1001'
}

const mockDetailsData = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+5491112345678',
  website: 'https://johndoe.dev'
}

describe('ProfileService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getBio', () => {
    it('should fetch user bio data', async () => {
      mockedAxios.get.mockResolvedValue({ data: { result: mockBioData } })

      const result = await profileService.getBio('user1')

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/detalles/bio?id=user1')
      expect(result).toEqual(mockBioData)
    })

    it('should handle API errors when fetching bio', async () => {
      const error = new Error('Failed to fetch bio')
      mockedAxios.get.mockRejectedValue(error)

      await expect(profileService.getBio('user1')).rejects.toThrow('Failed to fetch bio')
    })
  })

  describe('getAddress', () => {
    it('should fetch user address data', async () => {
      mockedAxios.get.mockResolvedValue({ data: { result: mockAddressData } })

      const result = await profileService.getAddress('user1')

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/detalles/direccion?id=user1')
      expect(result).toEqual(mockAddressData)
    })

    it('should handle API errors when fetching address', async () => {
      const error = new Error('Failed to fetch address')
      mockedAxios.get.mockRejectedValue(error)

      await expect(profileService.getAddress('user1')).rejects.toThrow('Failed to fetch address')
    })
  })

  describe('getDetails', () => {
    it('should fetch user personal details', async () => {
      mockedAxios.get.mockResolvedValue({ data: { result: mockDetailsData } })

      const result = await profileService.getDetails('user1')

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/detalles/detalles?id=user1')
      expect(result).toEqual(mockDetailsData)
    })

    it('should handle API errors when fetching details', async () => {
      const error = new Error('Failed to fetch details')
      mockedAxios.get.mockRejectedValue(error)

      await expect(profileService.getDetails('user1')).rejects.toThrow('Failed to fetch details')
    })
  })
})
