import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import DataDireccion from './DataDireccion'

const { mockUseAddressForm } = vi.hoisted(() => {
  return {
    mockUseAddressForm: vi.fn(),
  }
})

vi.mock('@/presentation/hooks/useAddressForm', () => ({
  useAddressForm: mockUseAddressForm,
}))

vi.mock('@/infrastructure/constants', () => ({
  DEFAULT_PLACEHOLDERS: {
    localidad: 'Ej: Buenos Aires',
    partido: 'Ej: La Matanza',
    provincia: 'Ej: Buenos Aires',
    pais: 'Ej: Argentina',
  },
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

describe('DataDireccion', () => {
  const mockSetDataDireccion = vi.fn()
  const mockHandleChange = vi.fn()
  const mockHandleSubmit = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    mockUseAddressForm.mockReturnValue({
      formData: {
        localidad: '',
        partido: '',
        provincia: '',
        pais: '',
      },
      existingData: null,
      isUpdate: false,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    })
  })

  it('renderiza el componente correctamente', () => {
    render(<DataDireccion setDataDireccion={mockSetDataDireccion} />)

    expect(screen.getByTestId('structure-config')).toBeInTheDocument()
    expect(screen.getByText('Dirección')).toBeInTheDocument()
    expect(screen.getByTestId('toaster')).toBeInTheDocument()
  })

  it('renderiza todos los campos del formulario', () => {
    render(<DataDireccion setDataDireccion={mockSetDataDireccion} />)

    expect(screen.getByText('Localidad')).toBeInTheDocument()
    expect(screen.getByText('Partido')).toBeInTheDocument()
    expect(screen.getByText('Provincia')).toBeInTheDocument()
    expect(screen.getByText('País')).toBeInTheDocument()
  })

  it('muestra los placeholders por defecto', () => {
    render(<DataDireccion setDataDireccion={mockSetDataDireccion} />)

    expect(screen.getAllByPlaceholderText('Ej: Buenos Aires')).toHaveLength(2)
    expect(screen.getByPlaceholderText('Ej: La Matanza')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Ej: Argentina')).toBeInTheDocument()
  })

  it('muestra placeholders con datos existentes', () => {
    mockUseAddressForm.mockReturnValue({
      formData: {
        localidad: '',
        partido: '',
        provincia: '',
        pais: '',
      },
      existingData: {
        localidad: 'CABA',
        partido: 'Palermo',
        provincia: 'Buenos Aires',
        pais: 'Argentina',
      },
      isUpdate: true,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    })

    render(<DataDireccion setDataDireccion={mockSetDataDireccion} />)

    expect(screen.getByPlaceholderText('CABA')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Palermo')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Buenos Aires')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Argentina')).toBeInTheDocument()
  })

  it('llama a handleChange cuando se escribe en localidad', () => {
    render(<DataDireccion setDataDireccion={mockSetDataDireccion} />)

    const inputs = screen.getAllByPlaceholderText('Ej: Buenos Aires')
    fireEvent.change(inputs[0], { target: { value: 'Córdoba' } })

    expect(mockHandleChange).toHaveBeenCalledWith('localidad', 'Córdoba')
  })

  it('llama a handleChange cuando se escribe en partido', () => {
    render(<DataDireccion setDataDireccion={mockSetDataDireccion} />)

    const input = screen.getByPlaceholderText('Ej: La Matanza')
    fireEvent.change(input, { target: { value: 'Morón' } })

    expect(mockHandleChange).toHaveBeenCalledWith('partido', 'Morón')
  })

  it('llama a handleChange cuando se escribe en provincia', () => {
    render(<DataDireccion setDataDireccion={mockSetDataDireccion} />)

    const inputs = screen.getAllByPlaceholderText('Ej: Buenos Aires')
    fireEvent.change(inputs[1], { target: { value: 'Mendoza' } })

    expect(mockHandleChange).toHaveBeenCalledWith('provincia', 'Mendoza')
  })

  it('llama a handleChange cuando se escribe en pais', () => {
    render(<DataDireccion setDataDireccion={mockSetDataDireccion} />)

    const input = screen.getByPlaceholderText('Ej: Argentina')
    fireEvent.change(input, { target: { value: 'Chile' } })

    expect(mockHandleChange).toHaveBeenCalledWith('pais', 'Chile')
  })

  it('muestra valores del formData en los inputs', () => {
    mockUseAddressForm.mockReturnValue({
      formData: {
        localidad: 'Rosario',
        partido: 'Centro',
        provincia: 'Santa Fe',
        pais: 'Argentina',
      },
      existingData: null,
      isUpdate: false,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    })

    render(<DataDireccion setDataDireccion={mockSetDataDireccion} />)

    expect(screen.getByDisplayValue('Rosario')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Centro')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Santa Fe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Argentina')).toBeInTheDocument()
  })

  it('muestra "Guardar" cuando isUpdate es false', () => {
    render(<DataDireccion setDataDireccion={mockSetDataDireccion} />)

    expect(screen.getByRole('button', { name: 'Guardar' })).toBeInTheDocument()
  })

  it('muestra "Actualizar" cuando isUpdate es true', () => {
    mockUseAddressForm.mockReturnValue({
      formData: {
        localidad: '',
        partido: '',
        provincia: '',
        pais: '',
      },
      existingData: null,
      isUpdate: true,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    })

    render(<DataDireccion setDataDireccion={mockSetDataDireccion} />)

    expect(screen.getByRole('button', { name: 'Actualizar' })).toBeInTheDocument()
  })

  it('llama a handleSubmit al hacer click en Guardar', () => {
    render(<DataDireccion setDataDireccion={mockSetDataDireccion} />)

    const botonGuardar = screen.getByRole('button', { name: 'Guardar' })
    fireEvent.click(botonGuardar)

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1)
  })

  it('llama a setDataDireccion(false) al hacer click en Cancelar', () => {
    render(<DataDireccion setDataDireccion={mockSetDataDireccion} />)

    const botonCancelar = screen.getByRole('button', { name: 'Cancelar' })
    fireEvent.click(botonCancelar)

    expect(mockSetDataDireccion).toHaveBeenCalledWith(false)
    expect(mockSetDataDireccion).toHaveBeenCalledTimes(1)
  })

  it('todos los inputs tienen atributo required', () => {
    render(<DataDireccion setDataDireccion={mockSetDataDireccion} />)

    const buenosAires = screen.getAllByPlaceholderText('Ej: Buenos Aires')
    const partido = screen.getByPlaceholderText('Ej: La Matanza')
    const pais = screen.getByPlaceholderText('Ej: Argentina')

    expect(buenosAires[0]).toHaveAttribute('required')
    expect(buenosAires[1]).toHaveAttribute('required')
    expect(partido).toHaveAttribute('required')
    expect(pais).toHaveAttribute('required')
  })

  it('todos los inputs tienen type="text"', () => {
    render(<DataDireccion setDataDireccion={mockSetDataDireccion} />)

    const buenosAires = screen.getAllByPlaceholderText('Ej: Buenos Aires')
    const partido = screen.getByPlaceholderText('Ej: La Matanza')

    expect(buenosAires[0]).toHaveAttribute('type', 'text')
    expect(buenosAires[1]).toHaveAttribute('type', 'text')
    expect(partido).toHaveAttribute('type', 'text')
  })
})
