'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { LOGIN_ERRORS } from '@/infrastructure/constants/login.constants'

export const useLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isOpenInputs, setIsOpenInputs] = useState(false)

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
        window.location.href = '/blog'
      } else if (result?.error) {
        switch (result.error) {
          case 'El email o la contraseña son inválidos':
            setError(LOGIN_ERRORS.INVALID_CREDENTIALS)
            break
          case 'Contraseña incorrecta':
            setError(LOGIN_ERRORS.INVALID_PASSWORD)
            break
          default:
            setError(LOGIN_ERRORS.UNEXPECTED)
        }
      }
    } catch (error) {
      setError(LOGIN_ERRORS.SYSTEM)
      console.error(error)
    }
  }

  const handleShowInputs = () => {
    setIsOpenInputs(true)
    setError('')
  }

  return {
    formData,
    error,
    isOpenInputs,
    handleChange,
    handleSubmit,
    handleShowInputs,
  }
}
