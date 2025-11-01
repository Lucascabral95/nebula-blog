import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React, { type ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/presentation/hooks/useLoginForm', () => ({
  useLoginForm: vi.fn(),
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

import { LOGIN_CONTENT } from '@/infrastructure/constants/login.constants'
import { useLoginForm } from '@/presentation/hooks/useLoginForm'
import { signIn } from 'next-auth/react'
import Login from './Login'

type LoginHookReturn = {
  formData: {
    email: string
    password: string
  }
  error: string
  isOpenInputs: boolean
  handleChange: (field: 'email' | 'password', value: string) => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
  handleShowInputs: () => void
}

const mockUseLoginForm = vi.mocked(useLoginForm)
const mockSignIn = vi.mocked(signIn)

describe('Login component', () => {
  const buildHookReturn = (overrides?: Partial<LoginHookReturn>): LoginHookReturn => ({
    formData: {
      email: '',
      password: '',
      ...(overrides?.formData ?? {}),
    },
    error: overrides?.error ?? '',
    isOpenInputs: overrides?.isOpenInputs ?? false,
    handleChange: overrides?.handleChange ?? vi.fn(),
    handleSubmit: overrides?.handleSubmit ?? vi.fn().mockResolvedValue(undefined),
    handleShowInputs: overrides?.handleShowInputs ?? vi.fn(),
  })

  beforeEach(() => {
    mockUseLoginForm.mockReset()
    mockSignIn.mockReset()
  })

  it('renders login content and triggers Google sign-in and register switch', () => {
    const handleShowInputs = vi.fn()
    const setIsOpenLogin = vi.fn()
    const setIsOpenRegister = vi.fn()

    mockUseLoginForm.mockReturnValue(
      buildHookReturn({
        handleShowInputs,
        isOpenInputs: false,
      }),
    )

    render(<Login setIsOpenLogin={setIsOpenLogin} setIsOpenRegister={setIsOpenRegister} />)

    expect(screen.getByRole('heading', { name: LOGIN_CONTENT.TITLE })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: LOGIN_CONTENT.GOOGLE_BTN }))
    expect(mockSignIn).toHaveBeenCalledWith('google')

    fireEvent.click(screen.getByRole('button', { name: LOGIN_CONTENT.EMAIL_BTN }))
    expect(handleShowInputs).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getByRole('button', { name: LOGIN_CONTENT.REGISTER_BTN }))
    expect(setIsOpenLogin).toHaveBeenCalledWith(false)
    expect(setIsOpenRegister).toHaveBeenCalledWith(true)
  })

  it('renders credential form when inputs are open and delegates to the hook', async () => {
    const handleChange = vi.fn()
    const handleSubmit = vi.fn().mockResolvedValue(undefined)
    const errorMessage = 'Credenciales inválidas'

    mockUseLoginForm.mockReturnValue(
      buildHookReturn({
        handleChange,
        handleSubmit,
        error: errorMessage,
        isOpenInputs: true,
        formData: {
          email: 'user@example.com',
          password: 'secret',
        },
      }),
    )

    render(<Login setIsOpenLogin={vi.fn()} setIsOpenRegister={vi.fn()} />)

    const emailInput = screen.getByLabelText(LOGIN_CONTENT.EMAIL_LABEL)
    const passwordInput = screen.getByLabelText(LOGIN_CONTENT.PASSWORD_LABEL)

    expect(emailInput).toHaveValue('user@example.com')
    expect(passwordInput).toHaveValue('secret')

    fireEvent.change(emailInput, { target: { value: 'new@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'updated' } })

    expect(handleChange).toHaveBeenCalledWith('email', 'new@example.com')
    expect(handleChange).toHaveBeenCalledWith('password', 'updated')

    fireEvent.click(screen.getByRole('button', { name: LOGIN_CONTENT.LOGIN_BTN }))

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1)
    })

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })
})
