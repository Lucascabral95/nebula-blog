import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import DataDatos from './DataDatos'

const { mockUsePersonalDataForm } = vi.hoisted(() => {
  return {
    mockUsePersonalDataForm: vi.fn(),
  }
})

vi.mock('@/presentation/hooks/usePersonalDataForm', () => ({
  usePersonalDataForm: mockUsePersonalDataForm,
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

vi.mock('react-hot-toast', () => ({
  Toaster: () => <div data-testid="toaster" />,
}))

describe('DataDatos', () => {
  const mockSetDataDatos = vi.fn()
  const mockHandleChange = vi.fn()
  const mockHandleSubmit = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    mockUsePersonalDataForm.mockReturnValue({
      formData: {
        email: '',
        celular: '',
        fechaNacimiento: '',
        genero: '',
        linkeding: '',
        github: '',
      },
      existingData: null,
      isUpdate: false,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    })
  })

  it('renderiza el componente correctamente', () => {
    render(<DataDatos setDataDatos={mockSetDataDatos} />)

    expect(screen.getByTestId('structure-config')).toBeInTheDocument()
    expect(screen.getByText('Datos personales')).toBeInTheDocument()
    expect(screen.getByTestId('toaster')).toBeInTheDocument()
  })

  it('renderiza todos los campos del formulario', () => {
    render(<DataDatos setDataDatos={mockSetDataDatos} />)

    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Celular')).toBeInTheDocument()
    expect(screen.getByText('Fecha de nacimiento')).toBeInTheDocument()
    expect(screen.getByText('Género')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('Github')).toBeInTheDocument()
  })

  it('muestra los placeholders por defecto', () => {
    render(<DataDatos setDataDatos={mockSetDataDatos} />)

    expect(screen.getByPlaceholderText('NextJS@hotmail.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('123456789')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('dd/mm/aaaa')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Masculino/Femenino')).toBeInTheDocument()
    expect(screen.getAllByPlaceholderText('/example')).toHaveLength(2)
  })

  it('muestra placeholders con datos existentes', () => {
    mockUsePersonalDataForm.mockReturnValue({
      formData: {
        email: '',
        celular: '',
        fechaNacimiento: '',
        genero: '',
        linkeding: '',
        github: '',
      },
      existingData: {
        email: 'user@test.com',
        celular: '987654321',
        fechaNacimiento: '01/01/1990',
        genero: 'Masculino',
        linkeding: '/linkedin-profile',
        github: '/github-profile',
      },
      isUpdate: true,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    })

    render(<DataDatos setDataDatos={mockSetDataDatos} />)

    expect(screen.getByPlaceholderText('user@test.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('987654321')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('01/01/1990')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Masculino')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('/linkedin-profile')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('/github-profile')).toBeInTheDocument()
  })

  it('llama a handleChange cuando se escribe en email', () => {
    render(<DataDatos setDataDatos={mockSetDataDatos} />)

    const input = screen.getByPlaceholderText('NextJS@hotmail.com')
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    expect(mockHandleChange).toHaveBeenCalledWith('email', 'test@example.com')
  })

  it('llama a handleChange cuando se escribe en celular', () => {
    render(<DataDatos setDataDatos={mockSetDataDatos} />)

    const input = screen.getByPlaceholderText('123456789')
    fireEvent.change(input, { target: { value: '999888777' } })

    expect(mockHandleChange).toHaveBeenCalledWith('celular', '999888777')
  })

  it('llama a handleChange cuando se escribe en fechaNacimiento', () => {
    render(<DataDatos setDataDatos={mockSetDataDatos} />)

    const input = screen.getByPlaceholderText('dd/mm/aaaa')
    fireEvent.change(input, { target: { value: '15/05/1995' } })

    expect(mockHandleChange).toHaveBeenCalledWith('fechaNacimiento', '15/05/1995')
  })

  it('llama a handleChange cuando se escribe en genero', () => {
    render(<DataDatos setDataDatos={mockSetDataDatos} />)

    const input = screen.getByPlaceholderText('Masculino/Femenino')
    fireEvent.change(input, { target: { value: 'Femenino' } })

    expect(mockHandleChange).toHaveBeenCalledWith('genero', 'Femenino')
  })

  it('llama a handleChange cuando se escribe en linkedin', () => {
    render(<DataDatos setDataDatos={mockSetDataDatos} />)

    const inputs = screen.getAllByPlaceholderText('/example')
    fireEvent.change(inputs[0], { target: { value: '/mi-linkedin' } })

    expect(mockHandleChange).toHaveBeenCalledWith('linkeding', '/mi-linkedin')
  })

  it('llama a handleChange cuando se escribe en github', () => {
    render(<DataDatos setDataDatos={mockSetDataDatos} />)

    const inputs = screen.getAllByPlaceholderText('/example')
    fireEvent.change(inputs[1], { target: { value: '/mi-github' } })

    expect(mockHandleChange).toHaveBeenCalledWith('github', '/mi-github')
  })

  it('muestra valores del formData en los inputs', () => {
    mockUsePersonalDataForm.mockReturnValue({
      formData: {
        email: 'test@test.com',
        celular: '123123123',
        fechaNacimiento: '10/10/2000',
        genero: 'Masculino',
        linkeding: '/mylinkedin',
        github: '/mygithub',
      },
      existingData: null,
      isUpdate: false,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    })

    render(<DataDatos setDataDatos={mockSetDataDatos} />)

    expect(screen.getByDisplayValue('test@test.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('123123123')).toBeInTheDocument()
    expect(screen.getByDisplayValue('10/10/2000')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Masculino')).toBeInTheDocument()
    expect(screen.getByDisplayValue('/mylinkedin')).toBeInTheDocument()
    expect(screen.getByDisplayValue('/mygithub')).toBeInTheDocument()
  })

  it('muestra "Guardar" cuando isUpdate es false', () => {
    render(<DataDatos setDataDatos={mockSetDataDatos} />)

    expect(screen.getByRole('button', { name: 'Guardar' })).toBeInTheDocument()
  })

  it('muestra "Actualizar" cuando isUpdate es true', () => {
    mockUsePersonalDataForm.mockReturnValue({
      formData: {
        email: '',
        celular: '',
        fechaNacimiento: '',
        genero: '',
        linkeding: '',
        github: '',
      },
      existingData: null,
      isUpdate: true,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    })

    render(<DataDatos setDataDatos={mockSetDataDatos} />)

    expect(screen.getByRole('button', { name: 'Actualizar' })).toBeInTheDocument()
  })

  it('llama a handleSubmit al hacer click en Guardar', () => {
    render(<DataDatos setDataDatos={mockSetDataDatos} />)

    const botonGuardar = screen.getByRole('button', { name: 'Guardar' })
    fireEvent.click(botonGuardar)

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1)
  })

  it('llama a setDataDatos(false) al hacer click en Cancelar', () => {
    render(<DataDatos setDataDatos={mockSetDataDatos} />)

    const botonCancelar = screen.getByRole('button', { name: 'Cancelar' })
    fireEvent.click(botonCancelar)

    expect(mockSetDataDatos).toHaveBeenCalledWith(false)
    expect(mockSetDataDatos).toHaveBeenCalledTimes(1)
  })

  it('los inputs tienen los atributos required', () => {
    render(<DataDatos setDataDatos={mockSetDataDatos} />)

    const email = screen.getByPlaceholderText('NextJS@hotmail.com') as HTMLInputElement
    const celular = screen.getByPlaceholderText('123456789') as HTMLInputElement

    expect(email).toHaveAttribute('required')
    expect(celular).toHaveAttribute('required')
  })

  it('el input de email tiene type="email"', () => {
    render(<DataDatos setDataDatos={mockSetDataDatos} />)

    const email = screen.getByPlaceholderText('NextJS@hotmail.com') as HTMLInputElement
    expect(email).toHaveAttribute('type', 'email')
  })

  it('el input de celular tiene type="number"', () => {
    render(<DataDatos setDataDatos={mockSetDataDatos} />)

    const celular = screen.getByPlaceholderText('123456789') as HTMLInputElement
    expect(celular).toHaveAttribute('type', 'number')
  })
})
