'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

import { IAddress } from '@/infrastructure/interfaces/address.interface'
import { addressService } from '@/infrastructure/service'
import { ISession } from '@/infrastructure/interfaces'

export const useAddressForm = (onClose: () => void) => {
  const { data: session } = useSession() as { data: ISession | null }
  const [formData, setFormData] = useState<IAddress>({
    localidad: '',
    partido: '',
    provincia: '',
    pais: '',
  })
  const [existingData, setExistingData] = useState<IAddress | null>(null)
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    const loadAddress = async () => {
      if (!session?.user?.id) return
      try {
        const data = await addressService.getAddress(session.user.id)
        setExistingData(data)
        setIsUpdate(true)
      } catch (error) {
        console.error('Error al cargar dirección:', error)
      }
    }
    loadAddress()
  }, [session?.user?.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user?.id) return

    try {
      if (isUpdate) {
        await addressService.updateAddress(session.user.id, formData)
        toast.success('Dirección actualizada exitosamente')
      } else {
        await addressService.saveAddress(session.user.id, formData)
        toast.success('Dirección guardada exitosamente')
      }
      setTimeout(onClose, 1400)
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Error al guardar')
    }
  }

  const handleChange = (field: keyof IAddress, value: string) => {
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
