'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

import { CREDENTIALS_CONTENT, CREDENTIALS_ERRORS } from '@/infrastructure/constants/credentials.constants'

export const useCredentialsForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleChange = (field: 'email' | 'password', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.ok) {
        window.location.href = CREDENTIALS_CONTENT.REDIRECT_URL
      } else if (result?.error) {
        switch (result.error) {
          case 'El email o la contraseña son inválidos':
            setError(CREDENTIALS_ERRORS.INVALID_CREDENTIALS)
            break
          case 'Contraseña incorrecta':
            setError(CREDENTIALS_ERRORS.INVALID_PASSWORD)
            break
          default:
            setError(CREDENTIALS_ERRORS.UNEXPECTED)
        }
      }
    } catch (error) {
      setError(CREDENTIALS_ERRORS.SYSTEM)
      console.error(error)
    }
  }

  return {
    formData,
    error,
    handleChange,
    handleSubmit,
  }
}
