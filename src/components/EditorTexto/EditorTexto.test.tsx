import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import EditorPrueba from './EditorPrueba'

const { mockUseEditorForm } = vi.hoisted(() => {
  return {
    mockUseEditorForm: vi.fn(),
  }
})

vi.mock('@/presentation/hooks/useEditorForm', () => ({
  useEditorForm: mockUseEditorForm,
}))

vi.mock('react-hot-toast', () => ({
  Toaster: () => <div data-testid="mock-toaster" />,
}))

describe('EditorPrueba', () => {
  const mockSetTitulo = vi.fn()
  const mockSetContent = vi.fn()
  const mockHandleSubmit = vi.fn((e) => e.preventDefault())

  beforeEach(() => {
    vi.clearAllMocks()
    
    mockUseEditorForm.mockReturnValue({
      titulo: '',
      setTitulo: mockSetTitulo,
      content: '',
      setContent: mockSetContent,
      handleSubmit: mockHandleSubmit,
    })
  })

  it('renderiza correctamente todos los elementos', () => {
    render(<EditorPrueba />)

    expect(screen.getByText('Editor de texto')).toBeInTheDocument()
    expect(screen.getByLabelText('Título')).toBeInTheDocument()
    expect(screen.getByLabelText('Contenido')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Publicar' })).toBeInTheDocument()
    expect(screen.getByTestId('mock-toaster')).toBeInTheDocument()
  })

  it('llama a setTitulo cuando se escribe en el input de título', () => {
    render(<EditorPrueba />)

    const titleInput = screen.getByLabelText('Título')
    fireEvent.change(titleInput, { target: { value: 'Mi título' } })

    expect(mockSetTitulo).toHaveBeenCalledWith('Mi título')
    expect(mockSetTitulo).toHaveBeenCalledTimes(1)
  })

  it('llama a setContent cuando se escribe en el textarea', () => {
    render(<EditorPrueba />)

    const contentTextarea = screen.getByLabelText('Contenido')
    fireEvent.change(contentTextarea, { target: { value: 'Mi contenido' } })

    expect(mockSetContent).toHaveBeenCalledWith('Mi contenido')
    expect(mockSetContent).toHaveBeenCalledTimes(1)
  })

  it('llama a handleSubmit al enviar el formulario', () => {
    render(<EditorPrueba />)

    const form = screen.getByRole('button', { name: 'Publicar' }).closest('form')!
    fireEvent.submit(form)

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1)
  })

  it('muestra los valores del hook correctamente', () => {
    mockUseEditorForm.mockReturnValue({
      titulo: 'Título existente',
      setTitulo: mockSetTitulo,
      content: 'Contenido existente',
      setContent: mockSetContent,
      handleSubmit: mockHandleSubmit,
    })

    render(<EditorPrueba />)

    const titleInput = screen.getByLabelText('Título') as HTMLInputElement
    const contentTextarea = screen.getByLabelText('Contenido') as HTMLTextAreaElement

    expect(titleInput.value).toBe('Título existente')
    expect(contentTextarea.value).toBe('Contenido existente')
  })

  it('los campos tienen el atributo required', () => {
    render(<EditorPrueba />)

    expect(screen.getByLabelText('Título')).toHaveAttribute('required')
    expect(screen.getByLabelText('Contenido')).toHaveAttribute('required')
  })

  it('el textarea tiene el atributo rows correcto', () => {
    render(<EditorPrueba />)

    expect(screen.getByLabelText('Contenido')).toHaveAttribute('rows', '10')
  })

  it('los inputs tienen los IDs y names correctos', () => {
    render(<EditorPrueba />)

    const titleInput = screen.getByLabelText('Título')
    const contentTextarea = screen.getByLabelText('Contenido')

    expect(titleInput).toHaveAttribute('id', 'title')
    expect(titleInput).toHaveAttribute('name', 'title')
    expect(contentTextarea).toHaveAttribute('id', 'content')
    expect(contentTextarea).toHaveAttribute('name', 'content')
  })
})
