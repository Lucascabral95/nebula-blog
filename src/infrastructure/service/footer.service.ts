import axios from 'axios'
import { IFooterAuthorData } from '@/infrastructure/interfaces/footer.interface'

export const footerService = {
  getAuthorDetails: async (postId: string): Promise<IFooterAuthorData> => {
    const { data } = await axios.get(`/api/detalles/bio/detalle/${postId}`)
    return data.result
  },
}
