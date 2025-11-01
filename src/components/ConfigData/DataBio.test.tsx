import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import DataBio from './DataBio'

const { mockUseBioForm } = vi.hoisted(() => {
  return {
    mockUseBioForm: vi.fn(),
  }
})

vi.mock('@/presentation/hooks/useBioForm', () => ({
  useBioForm: mockUseBioForm,
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

// Mock de react-hot-toast
vi.mock('react-hot-toast', () => ({
  Toaster: () => <div data-testid="toaster" />,
}))

describe('DataBio', () => {
  const mockSetIsOpenDataBio = vi.fn()
  const mockHandleChange = vi.fn()
  const mockHandleSubmit = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    mockUseBioForm.mockReturnValue({
      formData: {
        nombreCompleto: '',
        edad: null,
        pronombres: '',
        bio: '',
      },
      lengths: {
        lengthNombreCompleto: 0,
        lengthPronombres: 0,
        lengthBio: 0,
      },
      existingData: null,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    })
  })

  it('renderiza el componente correctamente', () => {
    render(<DataBio setIsOpenDataBio={mockSetIsOpenDataBio} />)

    expect(screen.getByTestId('structure-config')).toBeInTheDocument()
    expect(screen.getByText('Biografía')).toBeInTheDocument()
    expect(screen.getByTestId('toaster')).toBeInTheDocument()
  })

  it('renderiza todos los campos del formulario', () => {
    render(<DataBio setIsOpenDataBio={mockSetIsOpenDataBio} />)

    expect(screen.getByText('Nombre y apellidos')).toBeInTheDocument()
    expect(screen.getByText('Edad')).toBeInTheDocument()
    expect(screen.getByText('Pronombres')).toBeInTheDocument()
    expect(screen.getByText('Bio')).toBeInTheDocument()
  })

  it('muestra los placeholders por defecto', () => {
    render(<DataBio setIsOpenDataBio={mockSetIsOpenDataBio} />)

    expect(screen.getByPlaceholderText('Jack McCormick')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('29')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Ej: El, Ella, Ello, Elle...')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Escriba una biografía suya...')).toBeInTheDocument()
  })

  it('muestra placeholders con datos existentes', () => {
    mockUseBioForm.mockReturnValue({
      formData: {
        nombreCompleto: '',
        edad: null,
        pronombres: '',
        bio: '',
      },
      lengths: {
        lengthNombreCompleto: 0,
        lengthPronombres: 0,
        lengthBio: 0,
      },
      existingData: {
        nombreCompleto: 'Juan Pérez',
        edad: 30,
        pronombres: 'El',
        bio: 'Mi biografía',
      },
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    })

    render(<DataBio setIsOpenDataBio={mockSetIsOpenDataBio} />)

    expect(screen.getByPlaceholderText('Juan Pérez')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('El')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Mi biografía')).toBeInTheDocument()
  })

  it('llama a handleChange cuando se escribe en nombreCompleto', () => {
    render(<DataBio setIsOpenDataBio={mockSetIsOpenDataBio} />)

    const input = screen.getByPlaceholderText('Jack McCormick')
    fireEvent.change(input, { target: { value: 'John Doe' } })

    expect(mockHandleChange).toHaveBeenCalledWith('nombreCompleto', 'John Doe')
  })

  it('llama a handleChange cuando se escribe en edad', () => {
    render(<DataBio setIsOpenDataBio={mockSetIsOpenDataBio} />)

    const input = screen.getByPlaceholderText('29')
    fireEvent.change(input, { target: { value: '25' } })

    expect(mockHandleChange).toHaveBeenCalledWith('edad', 25)
  })

  it('llama a handleChange cuando se escribe en pronombres', () => {
    render(<DataBio setIsOpenDataBio={mockSetIsOpenDataBio} />)

    const input = screen.getByPlaceholderText('Ej: El, Ella, Ello, Elle...')
    fireEvent.change(input, { target: { value: 'El' } })

    expect(mockHandleChange).toHaveBeenCalledWith('pronombres', 'El')
  })

  it('llama a handleChange cuando se escribe en bio', () => {
    render(<DataBio setIsOpenDataBio={mockSetIsOpenDataBio} />)

    const textarea = screen.getByPlaceholderText('Escriba una biografía suya...')
    fireEvent.change(textarea, { target: { value: 'Mi bio' } })

    expect(mockHandleChange).toHaveBeenCalledWith('bio', 'Mi bio')
  })

  it('muestra los contadores de caracteres correctamente', () => {
    mockUseBioForm.mockReturnValue({
      formData: {
        nombreCompleto: 'John',
        edad: null,
        pronombres: 'El',
        bio: 'Test',
      },
      lengths: {
        lengthNombreCompleto: 4,
        lengthPronombres: 2,
        lengthBio: 4,
      },
      existingData: null,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    })

    render(<DataBio setIsOpenDataBio={mockSetIsOpenDataBio} />)

    expect(screen.getByText('4/50')).toBeInTheDocument()
    expect(screen.getByText('2/4')).toBeInTheDocument()
    expect(screen.getByText('4/200')).toBeInTheDocument()
  })

  it('muestra el color rojo cuando se alcanza el límite máximo', () => {
  mockUseBioForm.mockReturnValue({
    formData: {
      nombreCompleto: 'A'.repeat(50),
      edad: null,
      pronombres: 'Ello',
      bio: '',
    },
    lengths: {
      lengthNombreCompleto: 50,
      lengthPronombres: 4,
      lengthBio: 0,
    },
    existingData: null,
    handleChange: mockHandleChange,
    handleSubmit: mockHandleSubmit,
  })

  render(<DataBio setIsOpenDataBio={mockSetIsOpenDataBio} />)

  expect(screen.getByText('50/50')).toBeInTheDocument()
  expect(screen.getByText('4/4')).toBeInTheDocument()
})


  it('muestra color rojo cuando edad está fuera de rango', () => {
    mockUseBioForm.mockReturnValue({
      formData: {
        nombreCompleto: '',
        edad: 100,
        pronombres: '',
        bio: '',
      },
      lengths: {
        lengthNombreCompleto: 0,
        lengthPronombres: 0,
        lengthBio: 0,
      },
      existingData: null,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    })

    render(<DataBio setIsOpenDataBio={mockSetIsOpenDataBio} />)

    expect(screen.getByText('de 0 a 99')).toBeInTheDocument()
  })

  it('llama a handleSubmit al hacer click en Guardar', () => {
    render(<DataBio setIsOpenDataBio={mockSetIsOpenDataBio} />)

    const botonGuardar = screen.getByRole('button', { name: 'Guardar' })
    fireEvent.click(botonGuardar)

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1)
  })

  it('llama a setIsOpenDataBio(false) al hacer click en Cancelar', () => {
    render(<DataBio setIsOpenDataBio={mockSetIsOpenDataBio} />)

    const botonCancelar = screen.getByRole('button', { name: 'Cancelar' })
    fireEvent.click(botonCancelar)

    expect(mockSetIsOpenDataBio).toHaveBeenCalledWith(false)
    expect(mockSetIsOpenDataBio).toHaveBeenCalledTimes(1)
  })

  it('los inputs tienen los atributos correctos', () => {
    render(<DataBio setIsOpenDataBio={mockSetIsOpenDataBio} />)

    const inputNombre = screen.getByPlaceholderText('Jack McCormick') as HTMLInputElement
    const inputEdad = screen.getByPlaceholderText('29') as HTMLInputElement
    const inputPronombres = screen.getByPlaceholderText('Ej: El, Ella, Ello, Elle...') as HTMLInputElement
    const textareaBio = screen.getByPlaceholderText('Escriba una biografía suya...') as HTMLTextAreaElement

    expect(inputNombre).toHaveAttribute('maxLength', '50')
    expect(inputNombre).toHaveAttribute('required')
    expect(inputEdad).toHaveAttribute('type', 'number')
    expect(inputEdad).toHaveAttribute('required')
    expect(inputPronombres).toHaveAttribute('maxLength', '4')
    expect(inputPronombres).toHaveAttribute('required')
    expect(textareaBio).toHaveAttribute('maxLength', '200')
    expect(textareaBio).toHaveAttribute('required')
  })

  it('muestra valores del formData en los inputs', () => {
    mockUseBioForm.mockReturnValue({
      formData: {
        nombreCompleto: 'Test Name',
        edad: 25,
        pronombres: 'El',
        bio: 'Test bio',
      },
      lengths: {
        lengthNombreCompleto: 9,
        lengthPronombres: 2,
        lengthBio: 8,
      },
      existingData: null,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    })

    render(<DataBio setIsOpenDataBio={mockSetIsOpenDataBio} />)

    expect(screen.getByDisplayValue('Test Name')).toBeInTheDocument()
    expect(screen.getByDisplayValue('25')).toBeInTheDocument()
    expect(screen.getByDisplayValue('El')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Test bio')).toBeInTheDocument()
  })
})
