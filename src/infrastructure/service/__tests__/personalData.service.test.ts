import { vi, describe, it, expect, beforeEach } from 'vitest'
import { personalDataService } from '../personalData.service'
import axios, { AxiosError } from 'axios'

vi.mock('axios')
const mockedAxios = vi.mocked(axios, true)

const mockPersonalData = {
  email: 'john@example.com',
  celular: '+5491112345678',
  fechaNacimiento: '1990-01-01',
  genero: 'male',
  linkeding: 'https://linkedin.com/in/johndoe',
  github: 'https://github.com/johndoe'
}

describe('PersonalDataService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getPersonalData', () => {
    it('should fetch personal data by user ID', async () => {
      mockedAxios.get.mockImplementation(() => Promise.resolve({ 
        data: { result: mockPersonalData } 
      }))

      const result = await personalDataService.getPersonalData('user1')

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/detalles/detalles?id=user1')
      expect(result).toEqual(mockPersonalData)
    })

    it('should handle API errors when fetching personal data', async () => {
      const error = new Error('Failed to fetch personal data') as AxiosError
      mockedAxios.get.mockImplementation(() => Promise.reject(error))

      await expect(personalDataService.getPersonalData('user1')).rejects.toThrow('Failed to fetch personal data')
    })
  })

  describe('savePersonalData', () => {
    it('should save personal data with user ID', async () => {
      mockedAxios.post.mockImplementation(() => Promise.resolve({ data: {} }))

      await personalDataService.savePersonalData('user1', mockPersonalData)

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/detalles/detalles', {
        user: 'user1',
        ...mockPersonalData
      })
    })

    it('should handle API errors when saving personal data', async () => {
      const error = new Error('Failed to save personal data') as AxiosError
      mockedAxios.post.mockRejectedValue(error)

      await expect(personalDataService.savePersonalData('user1', mockPersonalData)).rejects.toThrow('Failed to save personal data')
    })

    it('should send correct payload structure', async () => {
      const personalData = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        celular: null,
        fechaNacimiento: null,
        genero: 'femenino',
        linkeding: 'https://linkedin.com/in/janesmith',
        github: 'https://github.com/janesmith'
      }

      mockedAxios.post.mockImplementation(() => Promise.resolve({ data: {} }))

      await personalDataService.savePersonalData('user123', personalData)

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/detalles/detalles', {
        user: 'user123',
        name: 'Jane Smith',
        email: 'jane@example.com',
        celular: null,
        fechaNacimiento: null,
        genero: 'femenino',
        linkeding: 'https://linkedin.com/in/janesmith',
        github: 'https://github.com/janesmith'
      })
    })
  })

  describe('updatePersonalData', () => {
    it('should update personal data with user ID', async () => {
      mockedAxios.put.mockImplementation(() => Promise.resolve({ data: {} }))

      await personalDataService.updatePersonalData('user1', mockPersonalData)

      expect(mockedAxios.put).toHaveBeenCalledWith('/api/detalles/detalles', {
        user: 'user1',
        ...mockPersonalData
      })
    })

    it('should handle API errors when updating personal data', async () => {
      const error = new Error('Failed to update personal data') as AxiosError
      mockedAxios.put.mockImplementation(() => Promise.reject(error))

      await expect(personalDataService.updatePersonalData('user1', mockPersonalData)).rejects.toThrow('Failed to update personal data')
    })

    it('should send correct payload structure for update', async () => {
      const personalData = {
        email: 'updated@example.com',
        celular: '+5491198765432',
        fechaNacimiento: '1990-01-01',
        genero: 'otro',
        linkeding: 'https://linkedin.com/in/updated',
        github: 'https://github.com/updated'
      }

      mockedAxios.put.mockImplementation(() => Promise.resolve({ data: {} }))

      await personalDataService.updatePersonalData('user456', personalData)

      expect(mockedAxios.put).toHaveBeenCalledWith('/api/detalles/detalles', {
        user: 'user456',
        email: 'updated@example.com',
        celular: '+5491198765432',
        fechaNacimiento: '1990-01-01',
        genero: 'otro',
        linkeding: 'https://linkedin.com/in/updated',
        github: 'https://github.com/updated'
      })
    })
  })
})
