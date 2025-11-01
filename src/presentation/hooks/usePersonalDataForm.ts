'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

import { IPersonalData, ISession } from '@/infrastructure/interfaces'
import { personalDataService } from '@/infrastructure/service'

export const usePersonalDataForm = (onClose: () => void) => {
  const { data: session } = useSession() as { data: ISession | null }
  const [formData, setFormData] = useState<IPersonalData>({
    email: '',
    celular: null,
    fechaNacimiento: null,
    genero: '',
    linkeding: '',
    github: '',
  })
  const [existingData, setExistingData] = useState<IPersonalData | null>(null)
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    const loadPersonalData = async () => {
      if (!session?.user?.id) return
      try {
        const data = await personalDataService.getPersonalData(session.user.id)
        setExistingData(data)
        setIsUpdate(true)
      } catch (error) {
        console.error('Error al cargar datos personales:', error)
      }
    }
    loadPersonalData()
  }, [session?.user?.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user?.id) return

    try {
      if (isUpdate) {
        await personalDataService.updatePersonalData(session.user.id, formData)
        toast.success('Datos actualizados exitosamente')
      } else {
        await personalDataService.savePersonalData(session.user.id, formData)
        toast.success('Datos guardados exitosamente')
      }
      setTimeout(onClose, 1400)
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Error al guardar')
    }
  }

  const handleChange = (field: keyof IPersonalData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return {
    formData,
    existingData,
    isUpdate,
    handleChange,
    handleSubmit,
  }
}
