import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React, { type ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/presentation/hooks/useCredentialsForm', () => ({
  useCredentialsForm: vi.fn(),
}))

vi.mock('../EstructuraLoginRegister/EstructuraLoginRegister', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => <div data-testid="estructura-login-register">{children}</div>,
}))

import { CREDENTIALS_CONTENT } from '@/infrastructure/constants/credentials.constants'
import { useCredentialsForm } from '@/presentation/hooks/useCredentialsForm'
import Credentials from './Credentials'

type CredentialsHookReturn = {
  formData: {
    email: string
    password: string
  }
  error: string
  handleChange: (field: 'email' | 'password', value: string) => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
}

const mockUseCredentialsForm = vi.mocked(useCredentialsForm)

describe('Credentials component', () => {
  const buildHookReturn = (overrides?: Partial<CredentialsHookReturn>): CredentialsHookReturn => ({
    formData: {
      email: '',
      password: '',
      ...(overrides?.formData ?? {}),
    },
    error: overrides?.error ?? '',
    handleChange: overrides?.handleChange ?? vi.fn(),
    handleSubmit: overrides?.handleSubmit ?? vi.fn().mockResolvedValue(undefined),
  })

  beforeEach(() => {
    mockUseCredentialsForm.mockReset()
  })

  it('renders titles and delegates field changes', () => {
    const handleChange = vi.fn()

    mockUseCredentialsForm.mockReturnValue(
      buildHookReturn({
        handleChange,
        formData: {
          email: 'user@example.com',
          password: 'secret',
        },
      }),
    )

    render(<Credentials />)

    expect(screen.getByRole('heading', { name: CREDENTIALS_CONTENT.TITLE })).toBeInTheDocument()
    expect(screen.getByText(CREDENTIALS_CONTENT.INSTRUCTION)).toBeInTheDocument()

    const emailInput = screen.getByLabelText(CREDENTIALS_CONTENT.EMAIL_LABEL)
    const passwordInput = screen.getByLabelText(CREDENTIALS_CONTENT.PASSWORD_LABEL)

    expect(emailInput).toHaveValue('user@example.com')
    expect(passwordInput).toHaveValue('secret')

    fireEvent.change(emailInput, { target: { value: 'new@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'updated' } })

    expect(handleChange).toHaveBeenCalledWith('email', 'new@example.com')
    expect(handleChange).toHaveBeenCalledWith('password', 'updated')
  })

  it('submits the form and shows backend errors when provided', async () => {
    const handleSubmit = vi.fn().mockResolvedValue(undefined)
    const errorMessage = 'Credenciales inválidas'

    mockUseCredentialsForm.mockReturnValue(
      buildHookReturn({
        handleSubmit,
        error: errorMessage,
      }),
    )

    render(<Credentials />)

    const form = screen.getByTestId('estructura-login-register').querySelector('form')
    expect(form).not.toBeNull()

    fireEvent.submit(form as HTMLFormElement)

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1)
    })

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })
})
