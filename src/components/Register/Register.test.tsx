import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React, { type ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/presentation/hooks/useRegisterForm', () => ({
  useRegisterForm: vi.fn(),
}))

vi.mock('next-auth/react', () => ({
  signIn: vi.fn(),
}))

vi.mock('../EstructuraLoginRegister/EstructuraLoginRegister', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => <div data-testid="estructura-login-register">{children}</div>,
}))

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  },
}))

import { REGISTER_CONTENT } from '@/infrastructure/constants/auth.constants'
import { useRegisterForm } from '@/presentation/hooks/useRegisterForm'
import { signIn } from 'next-auth/react'
import Register from './Register'

type RegisterHookReturn = {
  formData: {
    name: string
    email: string
    password: string
  }
  error: string
  handleChange: (field: 'name' | 'email' | 'password', value: string) => void
  handleSubmit: (e: React.FormEvent) => Promise<boolean>
}

const mockUseRegisterForm = vi.mocked(useRegisterForm)
const mockSignIn = vi.mocked(signIn)

describe('Register component', () => {
  const buildHookReturn = (overrides?: Partial<RegisterHookReturn>): RegisterHookReturn => ({
    formData: {
      name: '',
      email: '',
      password: '',
      ...(overrides?.formData ?? {}),
    },
    error: overrides?.error ?? '',
    handleChange: overrides?.handleChange ?? vi.fn(),
    handleSubmit: overrides?.handleSubmit ?? vi.fn().mockResolvedValue(true),
  })

  beforeEach(() => {
    mockUseRegisterForm.mockReset()
    mockSignIn.mockReset()
  })

  it('renders all register fields and headings', () => {
    mockUseRegisterForm.mockReturnValue(buildHookReturn())

    render(<Register setIsOpenRegister={vi.fn()} setIsOpenLogin={vi.fn()} />)

    expect(screen.getByRole('heading', { name: REGISTER_CONTENT.WELCOME })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: REGISTER_CONTENT.CREATE_ACCOUNT })).toBeInTheDocument()
    expect(screen.getByLabelText(REGISTER_CONTENT.NAME_LABEL)).toBeInTheDocument()
    expect(screen.getByLabelText(REGISTER_CONTENT.EMAIL_LABEL)).toBeInTheDocument()
    expect(screen.getByLabelText(REGISTER_CONTENT.PASSWORD_LABEL)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: REGISTER_CONTENT.REGISTER_BTN })).toBeInTheDocument()
  })

  it('delegates input changes to the register form hook', () => {
    const handleChange = vi.fn()
    mockUseRegisterForm.mockReturnValue(buildHookReturn({ handleChange }))

    render(<Register setIsOpenRegister={vi.fn()} setIsOpenLogin={vi.fn()} />)

    fireEvent.change(screen.getByLabelText(REGISTER_CONTENT.NAME_LABEL), { target: { value: 'Lucas' } })
    fireEvent.change(screen.getByLabelText(REGISTER_CONTENT.EMAIL_LABEL), { target: { value: 'lucas@example.com' } })
    fireEvent.change(screen.getByLabelText(REGISTER_CONTENT.PASSWORD_LABEL), { target: { value: 'secret123' } })

    expect(handleChange).toHaveBeenCalledWith('name', 'Lucas')
    expect(handleChange).toHaveBeenCalledWith('email', 'lucas@example.com')
    expect(handleChange).toHaveBeenCalledWith('password', 'secret123')
  })

  it('submits the form and toggles modals when registration succeeds', async () => {
    const handleSubmit = vi.fn().mockResolvedValue(true)
    mockUseRegisterForm.mockReturnValue(buildHookReturn({ handleSubmit }))

    const setIsOpenRegister = vi.fn()
    const setIsOpenLogin = vi.fn()

    render(<Register setIsOpenRegister={setIsOpenRegister} setIsOpenLogin={setIsOpenLogin} />)

    fireEvent.change(screen.getByLabelText(REGISTER_CONTENT.NAME_LABEL), { target: { value: 'Lucas' } })
    fireEvent.change(screen.getByLabelText(REGISTER_CONTENT.EMAIL_LABEL), { target: { value: 'lucas@example.com' } })
    fireEvent.change(screen.getByLabelText(REGISTER_CONTENT.PASSWORD_LABEL), { target: { value: 'secret123' } })

    const form = screen.getByTestId('estructura-login-register').querySelector('form')
    expect(form).not.toBeNull()

    fireEvent.submit(form as HTMLFormElement)

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1)
    })

    expect(setIsOpenRegister).toHaveBeenCalledWith(false)
    expect(setIsOpenLogin).toHaveBeenCalledWith(true)
  })

  it('shows the backend error message when registration fails', () => {
    const errorMessage = 'Correo ya registrado'
    mockUseRegisterForm.mockReturnValue(buildHookReturn({ error: errorMessage }))

    render(<Register setIsOpenRegister={vi.fn()} setIsOpenLogin={vi.fn()} />)

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('invokes Google sign-in when clicking the Google button', () => {
    mockUseRegisterForm.mockReturnValue(buildHookReturn())

    render(<Register setIsOpenRegister={vi.fn()} setIsOpenLogin={vi.fn()} />)

    fireEvent.click(screen.getByRole('button', { name: REGISTER_CONTENT.GOOGLE_BTN }))

    expect(mockSignIn).toHaveBeenCalledWith('google')
  })
})
