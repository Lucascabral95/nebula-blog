import { vi, describe, it, expect, beforeEach } from 'vitest'
import { bioService } from '../bio.service'
import axios from 'axios'

vi.mock('axios')
const mockedAxios = vi.mocked(axios, true)

const mockBioData = {
  nombreCompleto: 'John Doe',
  pronombres: 'he/him',
  edad: 30,
  bio: 'Passionate software developer with 5 years of experience'
}

const mockBioDataWithSkills = {
  ...mockBioData,
  skills: ['JavaScript', 'TypeScript', 'React']
}

describe('BioService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getBioData', () => {
    it('should fetch bio data by user ID', async () => {
      mockedAxios.get.mockResolvedValue({ data: { result: mockBioData } })

      const result = await bioService.getBioData('user1')

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/detalles/bio?id=user1')
      expect(result).toEqual(mockBioData)
    })

    it('should handle API errors when fetching bio data', async () => {
      const error = new Error('Failed to fetch bio data')
      mockedAxios.get.mockRejectedValue(error)

      await expect(bioService.getBioData('user1')).rejects.toThrow('Failed to fetch bio data')
    })
  })

  describe('saveBioData', () => {
    it('should save bio data with user ID', async () => {
      mockedAxios.post.mockResolvedValue({})

      await bioService.saveBioData('user1', mockBioData)

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/detalles/bio', {
        user: 'user1',
        ...mockBioData
      })
    })

    it('should handle API errors when saving bio data', async () => {
      const error = new Error('Failed to save bio data')
      mockedAxios.post.mockRejectedValue(error)

      await expect(bioService.saveBioData('user1', mockBioData))
        .rejects.toThrow('Failed to save bio data')
    })
  })

  describe('updateBioData', () => {
    it('should update bio data with user ID', async () => {
      mockedAxios.put.mockResolvedValue({})

      await bioService.updateBioData('user1', mockBioDataWithSkills)

      expect(mockedAxios.put).toHaveBeenCalledWith('/api/detalles/bio', {
        user: 'user1',
        ...mockBioDataWithSkills
      })
    })

    it('should handle API errors when updating bio data', async () => {
      const error = new Error('Failed to update bio data')
      mockedAxios.put.mockRejectedValue(error)

      await expect(bioService.updateBioData('user1', mockBioDataWithSkills))
        .rejects.toThrow('Failed to update bio data')
    })
  })
})
