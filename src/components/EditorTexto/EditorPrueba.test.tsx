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
  Toaster: () => <div data-testid="mock-toaster">Toaster</div>,
}))

describe('EditorPrueba', () => {
  const mockHandleSubmit = vi.fn()
  const mockSetTitulo = vi.fn()
  const mockSetContent = vi.fn()

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

  it('renderiza el formulario correctamente', () => {
    render(<EditorPrueba />)

    expect(screen.getByText('Editor de texto')).toBeInTheDocument()
    expect(screen.getByLabelText('Título')).toBeInTheDocument()
    expect(screen.getByLabelText('Contenido')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Publicar' })).toBeInTheDocument()
    expect(screen.getByTestId('mock-toaster')).toBeInTheDocument()
  })

  it('actualiza el título al escribir', async () => {
    render(<EditorPrueba />)

    const titleInput = screen.getByLabelText('Título') as HTMLInputElement
    
    fireEvent.change(titleInput, { target: { value: 'Nuevo título' } })

    expect(mockSetTitulo).toHaveBeenCalledWith('Nuevo título')
  })

  it('actualiza el contenido al escribir', async () => {
    render(<EditorPrueba />)

    const contentTextarea = screen.getByLabelText('Contenido') as HTMLTextAreaElement
    
    fireEvent.change(contentTextarea, { target: { value: 'Nuevo contenido' } })

    expect(mockSetContent).toHaveBeenCalledWith('Nuevo contenido')
  })

  it('llama a handleSubmit cuando se envía el formulario', () => {
    render(<EditorPrueba />)

    const form = screen.getByRole('button', { name: 'Publicar' }).closest('form')!
    fireEvent.submit(form)

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1)
  })

  it('muestra valores iniciales del hook', () => {
    mockUseEditorForm.mockReturnValue({
      titulo: 'Título inicial',
      setTitulo: mockSetTitulo,
      content: 'Contenido inicial',
      setContent: mockSetContent,
      handleSubmit: mockHandleSubmit,
    })

    render(<EditorPrueba />)

    const titleInput = screen.getByLabelText('Título') as HTMLInputElement
    const contentTextarea = screen.getByLabelText('Contenido') as HTMLTextAreaElement

    expect(titleInput.value).toBe('Título inicial')
    expect(contentTextarea.value).toBe('Contenido inicial')
  })

  it('inputs tienen atributo required', () => {
    render(<EditorPrueba />)

    const titleInput = screen.getByLabelText('Título')
    const contentTextarea = screen.getByLabelText('Contenido')

    expect(titleInput).toHaveAttribute('required')
    expect(contentTextarea).toHaveAttribute('required')
  })

  it('textarea tiene 10 rows', () => {
    render(<EditorPrueba />)

    const contentTextarea = screen.getByLabelText('Contenido')
    expect(contentTextarea).toHaveAttribute('rows', '10')
  })

  it('inputs están vacíos inicialmente', () => {
    render(<EditorPrueba />)

    const titleInput = screen.getByLabelText('Título') as HTMLInputElement
    const contentTextarea = screen.getByLabelText('Contenido') as HTMLTextAreaElement

    expect(titleInput.value).toBe('')
    expect(contentTextarea.value).toBe('')
  })
})
