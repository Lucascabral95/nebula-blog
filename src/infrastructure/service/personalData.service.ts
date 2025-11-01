import axios from 'axios'

import { IPersonalData } from '../interfaces'

export const personalDataService = {
  getPersonalData: async (userId: string): Promise<IPersonalData> => {
    const { data } = await axios.get(`/api/detalles/detalles?id=${userId}`)
    return data.result
  },

  savePersonalData: async (userId: string, personalData: IPersonalData): Promise<void> => {
    await axios.post('/api/detalles/detalles', {
      user: userId,
      ...personalData,
    })
  },

  updatePersonalData: async (userId: string, personalData: IPersonalData): Promise<void> => {
    await axios.put('/api/detalles/detalles', {
      user: userId,
      ...personalData,
    })
  },
}
