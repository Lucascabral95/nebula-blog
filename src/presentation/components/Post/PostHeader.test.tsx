import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PostHeader } from './PostHeader'

const { mockConstants } = vi.hoisted(() => {
  return {
    mockConstants: {
      NEW_POST_CONTENT: {
        LOGO: 'Nebula',
        WRITING_BY: 'Escribiendo por',
        PUBLISH_BTN: 'Publicar',
      },
    },
  }
})

vi.mock('@/infrastructure/constants', () => ({
  NEW_POST_CONTENT: mockConstants.NEW_POST_CONTENT,
}))
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}))

describe('PostHeader', () => {
  const mockOnPublish = vi.fn()

  beforeEach(() => {
    mockOnPublish.mockClear()
  })

  it('renderiza correctamente el componente', () => {
    render(<PostHeader email="test@example.com" onPublish={mockOnPublish} />)

    expect(screen.getByText('Nebula')).toBeInTheDocument()
    expect(screen.getByText(/test@example.com/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Publicar' })).toBeInTheDocument()
  })

  it('muestra el logo correctamente', () => {
    render(<PostHeader email="user@test.com" onPublish={mockOnPublish} />)

    const logo = screen.getByRole('heading', { level: 2, name: 'Nebula' })
    expect(logo).toBeInTheDocument()
  })

  it('el link del logo apunta a /blog', () => {
    render(<PostHeader email="user@test.com" onPublish={mockOnPublish} />)

    const link = screen.getByRole('link', { name: 'Nebula' })
    expect(link).toHaveAttribute('href', '/blog')
  })

  it('muestra el email del usuario', () => {
    render(<PostHeader email="test@example.com" onPublish={mockOnPublish} />)

    expect(screen.getByText(/test@example.com/)).toBeInTheDocument()
  })

  it('muestra correctamente el texto "Escribiendo por"', () => {
    render(<PostHeader email="author@test.com" onPublish={mockOnPublish} />)

    expect(screen.getByText(/Escribiendo por/)).toBeInTheDocument()
  })

  it('renderiza el botón de publicar', () => {
    render(<PostHeader email="user@test.com" onPublish={mockOnPublish} />)

    const button = screen.getByRole('button', { name: 'Publicar' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('boton-publicar')
  })

  it('llama a onPublish cuando se hace click en el botón', () => {
    render(<PostHeader email="user@test.com" onPublish={mockOnPublish} />)

    const button = screen.getByRole('button', { name: 'Publicar' })
    fireEvent.click(button)

    expect(mockOnPublish).toHaveBeenCalledTimes(1)
  })

  it('llama a onPublish correctamente en múltiples clicks', () => {
    render(<PostHeader email="user@test.com" onPublish={mockOnPublish} />)

    const button = screen.getByRole('button', { name: 'Publicar' })
    
    fireEvent.click(button)
    expect(mockOnPublish).toHaveBeenCalledTimes(1)

    fireEvent.click(button)
    expect(mockOnPublish).toHaveBeenCalledTimes(2)
  })

  it('maneja email nulo correctamente', () => {
    render(<PostHeader email={null} onPublish={mockOnPublish} />)

    expect(screen.getByText('Nebula')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Publicar' })).toBeInTheDocument()
  })

  it('maneja email undefined correctamente', () => {
    render(<PostHeader email={undefined} onPublish={mockOnPublish} />)

    expect(screen.getByText('Nebula')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Publicar' })).toBeInTheDocument()
  })

  it('renderiza la estructura del header correctamente', () => {
    const { container } = render(<PostHeader email="user@test.com" onPublish={mockOnPublish} />)

    expect(container.querySelector('.header-posteo')).toBeInTheDocument()
    expect(container.querySelector('.logo-posteo')).toBeInTheDocument()
    expect(container.querySelector('.descripcion')).toBeInTheDocument()
    expect(container.querySelector('.publicacion-posteo')).toBeInTheDocument()
  })

  it('el link tiene la clase correcta', () => {
    render(<PostHeader email="user@test.com" onPublish={mockOnPublish} />)

    const link = screen.getByRole('link', { name: 'Nebula' })
    expect(link).toHaveClass('tituloo')
  })

  it('muestra diferentes emails correctamente', () => {
    const { rerender } = render(<PostHeader email="primero@test.com" onPublish={mockOnPublish} />)

    expect(screen.getByText(/primero@test.com/)).toBeInTheDocument()

    rerender(<PostHeader email="segundo@test.com" onPublish={mockOnPublish} />)

    expect(screen.getByText(/segundo@test.com/)).toBeInTheDocument()
  })

  it('el botón está en la sección de publicación correcta', () => {
    const { container } = render(<PostHeader email="user@test.com" onPublish={mockOnPublish} />)

    const publicacionSection = container.querySelector('.publicacion-posteo')
    const button = publicacionSection?.querySelector('.boton-publicar')

    expect(button).toBeInTheDocument()
  })

  it('el logo está en la sección correcta', () => {
    const { container } = render(<PostHeader email="user@test.com" onPublish={mockOnPublish} />)

    const logoSection = container.querySelector('.logo-posteo')
    const h2 = logoSection?.querySelector('h2')

    expect(h2).toBeInTheDocument()
    expect(h2?.textContent).toBe('Nebula')
  })
})
