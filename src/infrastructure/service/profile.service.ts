import axios from 'axios'
import { IProfileBio, IProfileAddress, IProfileDetails } from '@/infrastructure/interfaces/profile.interface'

export const profileService = {
  getBio: async (userId: string): Promise<IProfileBio> => {
    const { data } = await axios.get(`/api/detalles/bio?id=${userId}`)
    return data.result
  },

  getAddress: async (userId: string): Promise<IProfileAddress> => {
    const { data } = await axios.get(`/api/detalles/direccion?id=${userId}`)
    return data.result
  },

  getDetails: async (userId: string): Promise<IProfileDetails> => {
    const { data } = await axios.get(`/api/detalles/detalles?id=${userId}`)
    return data.result
  },
}
