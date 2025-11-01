'use client'
import { useState } from 'react'

import { IRegisterData } from '@/infrastructure/interfaces'
import { authService } from '@/infrastructure/service'

export const useRegisterForm = () => {
  const [formData, setFormData] = useState<IRegisterData>({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleChange = (field: keyof IRegisterData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await authService.register(formData)
      return true
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error desconocido'
      setError(errorMessage)
      console.error(errorMessage)
      return false
    }
  }

  return {
    formData,
    error,
    handleChange,
    handleSubmit,
  }
}
