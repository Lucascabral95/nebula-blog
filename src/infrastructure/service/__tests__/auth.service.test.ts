import { vi, describe, it, expect, beforeEach } from 'vitest'
import { authService } from '../auth.service'
import axios from 'axios'

vi.mock('axios')
const mockedAxios = axios as unknown as {
  post: {
    mockResolvedValue: (value: any) => void;
    mockRejectedValue: (error: any) => void;
    mockImplementation: (fn: any) => void;
  };
  get: {
    mockResolvedValue: (value: any) => void;
    mockRejectedValue: (error: any) => void;
    mockImplementation: (fn: any) => void;
  };
  // Add other methods as needed
};

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('register', () => {
    it('should make POST request to register endpoint with correct data', async () => {
      const registerData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      }

      // Mock the post method to return a resolved promise
      mockedAxios.post.mockImplementation(() => Promise.resolve({ data: {} }))

      await authService.register(registerData)

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/register', {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      })
    })

    it('should convert email to lowercase before sending', async () => {
      const registerData = {
        name: 'John Doe',
        email: 'JOHN@EXAMPLE.COM',
        password: 'password123'
      }

      // Mock the post method to return a resolved promise
      mockedAxios.post.mockImplementation(() => Promise.resolve({ data: {} }))

      await authService.register(registerData)

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/register', expect.objectContaining({
        email: 'john@example.com'
      }))
    })

    it('should handle registration errors', async () => {
      const registerData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      }

      const error = new Error('Registration failed')
      // Mock the post method to return a rejected promise
      mockedAxios.post.mockImplementation(() => Promise.reject(error))

      await expect(authService.register(registerData)).rejects.toThrow('Registration failed')
    })
  })
})
