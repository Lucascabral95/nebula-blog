'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface IModalContext {
  isLoginOpen: boolean
  isRegisterOpen: boolean
  openLogin: () => void
  closeLogin: () => void
  openRegister: () => void
  closeRegister: () => void
  switchToLogin: () => void
  switchToRegister: () => void
}

const ModalContext = createContext<IModalContext | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

  return (
    <ModalContext.Provider value={{
      isLoginOpen,
      isRegisterOpen,
      openLogin: () => { setIsLoginOpen(true); setIsRegisterOpen(false) },
      closeLogin: () => setIsLoginOpen(false),
      openRegister: () => { setIsRegisterOpen(true); setIsLoginOpen(false) },
      closeRegister: () => setIsRegisterOpen(false),
      switchToLogin: () => { setIsRegisterOpen(false); setIsLoginOpen(true) },
      switchToRegister: () => { setIsLoginOpen(false); setIsRegisterOpen(true) },
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModal dentro de ModalProvider')
  return context
}
