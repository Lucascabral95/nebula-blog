import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CuentaEmail from './CuentaEmail'

const { mockUseSession } = vi.hoisted(() => {
  return {
    mockUseSession: vi.fn(),
  }
})

vi.mock('next-auth/react', () => ({
  useSession: mockUseSession,
}))

vi.mock('./StructureConfigData', () => ({
  __esModule: true,
  default: ({ titulo, childrenInputs, botones }: any) => (
    <div data-testid="structure-config">
      <h2>{titulo}</h2>
      <div data-testid="children-inputs">{childrenInputs}</div>
      <div data-testid="botones">{botones}</div>
    </div>
  ),
}))

describe('CuentaEmail', () => {
  const mockSetDataEmail = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    mockUseSession.mockReturnValue({
      data: {
        user: {
          id: 'u1',
          name: 'Test User',
          email: 'test@example.com',
        },
      },
    })
  })

  it('renderiza el componente correctamente', () => {
    render(<CuentaEmail setDataEmail={mockSetDataEmail} />)

    expect(screen.getByTestId('structure-config')).toBeInTheDocument()
    expect(screen.getByText('Dirección de Email')).toBeInTheDocument()
  })

  it('muestra el email del usuario en el input', () => {
    render(<CuentaEmail setDataEmail={mockSetDataEmail} />)

    const input = screen.getByDisplayValue('test@example.com')
    expect(input).toBeInTheDocument()
  })

  it('el input es de solo lectura', () => {
    render(<CuentaEmail setDataEmail={mockSetDataEmail} />)

    const input = screen.getByDisplayValue('test@example.com') as HTMLInputElement
    expect(input).toHaveAttribute('readOnly')
    expect(input.readOnly).toBe(true)
  })

  it('muestra el texto aclaratorio correcto', () => {
    render(<CuentaEmail setDataEmail={mockSetDataEmail} />)

    expect(
      screen.getByText(/Podés iniciar sesión en Medium con esta dirección de correo electrónico/i)
    ).toBeInTheDocument()
    expect(screen.getByText('No es mutable')).toBeInTheDocument()
  })

  it('llama a setDataEmail(false) al hacer click en Aceptar', () => {
    render(<CuentaEmail setDataEmail={mockSetDataEmail} />)

    const botonAceptar = screen.getByRole('button', { name: 'Aceptar' })
    fireEvent.click(botonAceptar)

    expect(mockSetDataEmail).toHaveBeenCalledWith(false)
    expect(mockSetDataEmail).toHaveBeenCalledTimes(1)
  })

  it('renderiza el botón Aceptar correctamente', () => {
    render(<CuentaEmail setDataEmail={mockSetDataEmail} />)

    const boton = screen.getByRole('button', { name: 'Aceptar' })
    expect(boton).toBeInTheDocument()
    expect(boton).toHaveClass('boton-guardar')
  })

  it('maneja sesión sin email correctamente', () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          id: 'u1',
          name: 'Test User',
          email: undefined,
        },
      },
    })

    render(<CuentaEmail setDataEmail={mockSetDataEmail} />)

    expect(screen.getByTestId('structure-config')).toBeInTheDocument()
  })

  it('maneja sesión nula correctamente', () => {
    mockUseSession.mockReturnValue({ data: null })

    render(<CuentaEmail setDataEmail={mockSetDataEmail} />)

    expect(screen.getByTestId('structure-config')).toBeInTheDocument()
  })

  it('el input tiene el tipo text', () => {
    render(<CuentaEmail setDataEmail={mockSetDataEmail} />)

    const input = screen.getByDisplayValue('test@example.com') as HTMLInputElement
    expect(input).toHaveAttribute('type', 'text')
  })

  it('pasa correctamente las props a StructureConfigData', () => {
    render(<CuentaEmail setDataEmail={mockSetDataEmail} />)

    expect(screen.getByTestId('children-inputs')).toBeInTheDocument()
    expect(screen.getByTestId('botones')).toBeInTheDocument()
  })
})
