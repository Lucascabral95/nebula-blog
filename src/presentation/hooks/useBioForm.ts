'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

import { IBioData, IBioLengths } from '@/infrastructure/interfaces/bio.interface'
import { bioService } from '@/infrastructure/service'
import { ISession } from '@/infrastructure/interfaces'

export const useBioForm = (onClose: () => void) => {
  const { data: session } = useSession() as { data: ISession | null }
  const [formData, setFormData] = useState<IBioData>({
    nombreCompleto: '',
    pronombres: '',
    edad: null,
    bio: '',
  })
  const [lengths, setLengths] = useState<IBioLengths>({
    lengthNombreCompleto: 0,
    lengthPronombres: 0,
    lengthBio: 0,
  })
  const [existingData, setExistingData] = useState<IBioData | null>(null)
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    const loadBioData = async () => {
      if (!session?.user?.id) return
      try {
        const data = await bioService.getBioData(session.user.id)
        setExistingData(data)
        setIsUpdate(true)
      } catch (error) {
        console.error('Error al cargar bio:', error)
      }
    }
    loadBioData()
  }, [session?.user?.id])

  useEffect(() => {
    setLengths({
      lengthNombreCompleto: formData.nombreCompleto.length,
      lengthPronombres: formData.pronombres.length,
      lengthBio: formData.bio.length,
    })
  }, [formData.nombreCompleto, formData.pronombres, formData.bio])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user?.id) return

    try {
      if (isUpdate) {
        await bioService.updateBioData(session.user.id, formData)
        toast.success('Datos actualizados exitosamente')
      } else {
        await bioService.saveBioData(session.user.id, formData)
        toast.success('Datos guardados exitosamente')
      }
      setTimeout(onClose, 1400)
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Error al guardar')
    }
  }

  const handleChange = (field: keyof IBioData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return {
    formData,
    lengths,
    existingData,
    handleChange,
    handleSubmit,
  }
}
