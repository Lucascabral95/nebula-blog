import axios from 'axios'
import { IBioData } from '@/infrastructure/interfaces/bio.interface'

export const bioService = {
  getBioData: async (userId: string): Promise<IBioData> => {
    const { data } = await axios.get(`/api/detalles/bio?id=${userId}`)
    return data.result
  },

  saveBioData: async (userId: string, bioData: IBioData): Promise<void> => {
    await axios.post(`/api/detalles/bio`, {
      user: userId,
      ...bioData,
    })
  },

  updateBioData: async (userId: string, bioData: IBioData): Promise<void> => {
    await axios.put(`/api/detalles/bio`, {
      user: userId,
      ...bioData,
    })
  },
}
