import { vi, describe, it, expect, beforeEach } from 'vitest'
import { addressService } from '../address.service'
import axios from 'axios'

vi.mock('axios')
const mockedAxios = vi.mocked(axios, true)

const mockAddress = {
  localidad: 'Buenos Aires',
  partido: 'Capital Federal',
  provincia: 'Buenos Aires',
  pais: 'Argentina'
}

describe('AddressService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getAddress', () => {
    it('should fetch address by user ID', async () => {
      mockedAxios.get.mockResolvedValue({ data: { result: mockAddress } })

      const result = await addressService.getAddress('user1')

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/detalles/direccion?id=user1')
      expect(result).toEqual(mockAddress)
    })

    it('should handle API errors when fetching address', async () => {
      const error = new Error('Failed to fetch address')
      mockedAxios.get.mockRejectedValue(error)

      await expect(addressService.getAddress('user1')).rejects.toThrow('Failed to fetch address')
    })
  })

  describe('saveAddress', () => {
    it('should save address with user ID', async () => {
      mockedAxios.post.mockResolvedValue({})

      await addressService.saveAddress('user1', mockAddress)

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/detalles/direccion', {
        user: 'user1',
        ...mockAddress
      })
    })

    it('should handle API errors when saving address', async () => {
      const error = new Error('Failed to save address')
      mockedAxios.post.mockRejectedValue(error)

      await expect(addressService.saveAddress('user1', mockAddress)).rejects.toThrow('Failed to save address')
    })

    it('should send correct payload structure', async () => {
      const address = {
        localidad: 'Córdoba',
        partido: 'Capital',
        provincia: 'Córdoba',
        pais: 'Argentina'
      }

      mockedAxios.post.mockResolvedValue({})

      await addressService.saveAddress('user123', address)

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/detalles/direccion', {
        user: 'user123',
        localidad: 'Córdoba',
        partido: 'Capital',
        provincia: 'Córdoba',
        pais: 'Argentina'
      })
    })
  })

  describe('updateAddress', () => {
    it('should update address with user ID', async () => {
      mockedAxios.put.mockResolvedValue({})

      await addressService.updateAddress('user1', mockAddress)

      expect(mockedAxios.put).toHaveBeenCalledWith('/api/detalles/direccion', {
        user: 'user1',
        ...mockAddress
      })
    })

    it('should handle API errors when updating address', async () => {
      const error = new Error('Failed to update address')
      mockedAxios.put.mockRejectedValue(error)

      await expect(addressService.updateAddress('user1', mockAddress)).rejects.toThrow('Failed to update address')
    })

    it('should send correct payload structure for update', async () => {
      const address = {
        localidad: 'Rosario',
        partido: 'Rosario',
        provincia: 'Santa Fe',
        pais: 'Argentina'
      }

      mockedAxios.put.mockResolvedValue({})

      await addressService.updateAddress('user456', address)

      expect(mockedAxios.put).toHaveBeenCalledWith('/api/detalles/direccion', {
        user: 'user456',
        localidad: 'Rosario',
        partido: 'Rosario',
        provincia: 'Santa Fe',
        pais: 'Argentina'
      })
    })
  })
})
