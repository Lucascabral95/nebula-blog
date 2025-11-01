import axios from 'axios'
import { IRegisterData } from '../interfaces'

export const authService = {
  register: async (data: IRegisterData): Promise<void> => {
    await axios.post('/api/register', {
      name: data.name,
      email: data.email.toLowerCase(),
      password: data.password,
    })
  },
}
