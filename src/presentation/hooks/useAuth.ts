'use client'

import { useSession } from 'next-auth/react'
import { ISession, IAuthUser } from '@/infrastructure/interfaces/auth.interface'

export const useAuth = () => {
  const { data: session, status } = useSession()

  const isAuthenticated = status === 'authenticated'
  const isLoading = status === 'loading'
  
  const user: IAuthUser | undefined = session?.user

  const getRedirectPath = (): string => {
    return isAuthenticated ? '/blog' : '/'
  }

  const getButtonText = (): string => {
    return isAuthenticated ? 'Ir a la página principal' : 'Inicia sesión'
  }

  return {
    session: session as ISession,
    isAuthenticated,
    isLoading,
    user,
    getRedirectPath,
    getButtonText,
  }
}
