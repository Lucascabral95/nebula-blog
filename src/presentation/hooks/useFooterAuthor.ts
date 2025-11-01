'use client'
import { useEffect, useState } from 'react'

import { IFooterAuthorData } from '@/infrastructure/interfaces/footer.interface'
import { footerService } from '@/infrastructure/service'

export const useFooterAuthor = (postId: string) => {
  const [authorData, setAuthorData] = useState<IFooterAuthorData | null>(null)

  useEffect(() => {
    const loadAuthorData = async () => {
      try {
        const data = await footerService.getAuthorDetails(postId)
        setAuthorData(data)
      } catch (error) {
        console.error('Error al cargar datos del autor:', error)
      }
    }

    loadAuthorData()
  }, [postId])

  return { authorData }
}
