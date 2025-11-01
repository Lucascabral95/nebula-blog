import axios from 'axios'
import { IAddress } from '@/infrastructure/interfaces/address.interface'

export const addressService = {
  getAddress: async (userId: string): Promise<IAddress> => {
    const { data } = await axios.get(`/api/detalles/direccion?id=${userId}`)
    return data.result
  },

  saveAddress: async (userId: string, address: IAddress): Promise<void> => {
    await axios.post('/api/detalles/direccion', {
      user: userId,
      ...address,
    })
  },

  updateAddress: async (userId: string, address: IAddress): Promise<void> => {
    await axios.put('/api/detalles/direccion', {
      user: userId,
      ...address,
    })
  },
}
