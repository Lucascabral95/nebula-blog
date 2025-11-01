import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useSession } from 'next-auth/react'
import ItemComment from './ItemComment'
import axios from 'axios'

vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
}))

vi.mock('axios', () => {
  const mocked = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  }
  return {
    __esModule: true,
    default: mocked,
    ...mocked,
  }
})
const axiosMock = vi.mocked(axios, true)

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt = '', ...props }: any) => <img alt={alt} {...props} />,
}))

  vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...rest }: any) => <div {...rest}>{children}</div>,
  },
}))

vi.mock('react-icons/io', () => ({ IoMdClose: () => <span data-testid="icon-close" /> }))
vi.mock('react-icons/fa', () => ({ FaHeart: () => <span data-testid="icon-heart" /> }))

describe('ItemComment', () => {
  const mockSession = {
    user: { id: 'u1', name: 'juan', email: 'a@a.com', image: '/img/u.png' },
  }

  const defaultProps = {
    setIsOpenComment: vi.fn(),
    posteo: null,
    id: 'p1',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useSession as any).mockReturnValue({ data: mockSession })
    axiosMock.get.mockResolvedValue({ status: 200, data: { comments: [] } })
    axiosMock.post.mockResolvedValue({
      status: 201,
      data: {
        comment: {
          _id: 'c2',
          content: 'nuevo',
          user: [{ name: 'juan', image: '/img/u.png' }],
          createdAt: new Date().toISOString(),
          likes: 0,
        },
      },
    })
    axiosMock.put.mockResolvedValue({ status: 200, data: {} })
  })

  it('renderiza y hace fetch inicial mostrando Respuestas (0)', async () => {
    render(<ItemComment {...defaultProps} />)
    await waitFor(() => {
      expect(axiosMock.get).toHaveBeenCalledWith('/api/comment?id=p1')
    })
    expect(screen.getByText(/Respuestas \(0\)/)).toBeInTheDocument()
  })

  it('muestra imagen y nombre del usuario actual', async () => {
    render(<ItemComment {...defaultProps} />)
    const imgs = await screen.findAllByAltText('perfil')
    expect(imgs[0]).toHaveAttribute('src', '/img/u.png')
    expect(screen.getByText('Juan')).toBeInTheDocument()
  })

  it('envía un comentario y aparece en la lista', async () => {
    render(<ItemComment {...defaultProps} />)
    const textarea = screen.getByPlaceholderText('¿Qué estás pensando?')
    await userEvent.type(textarea, 'hola mundo')
    await userEvent.click(screen.getByRole('button', { name: 'Enviar' }))
    await waitFor(() => {
      expect(axiosMock.post).toHaveBeenCalledWith('/api/comment', {
        post: 'p1',
        user: 'u1',
        content: 'hola mundo',
      })
    })
    expect(screen.getByText('nuevo')).toBeInTheDocument()
  })

  it('cancela y limpia el textarea', async () => {
    render(<ItemComment {...defaultProps} />)
    const textarea = screen.getByPlaceholderText('¿Qué estás pensando?') as HTMLTextAreaElement
    await userEvent.type(textarea, 'texto temporal')
    expect(textarea.value).toBe('texto temporal')
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(textarea.value).toBe('')
  })

  it('da like y dispara PUT y refetch', async () => {
    axiosMock.get.mockResolvedValueOnce({
      status: 200,
      data: {
        comments: [
          {
            _id: 'c1',
            content: 'existente',
            user: [{ name: 'maria', image: '/img/u2.png' }],
            createdAt: new Date().toISOString(),
            likes: 3,
          },
        ],
      },
    })
    render(<ItemComment {...defaultProps} />)
    await screen.findByText('existente')
    await userEvent.click(screen.getByTestId('icon-heart'))
    await waitFor(() => {
      expect(axiosMock.put).toHaveBeenCalledWith('/api/comment?id=c1')
    })
  })

  it('cierra con el botón de cerrar', async () => {
    render(<ItemComment {...defaultProps} />)
    await userEvent.click(screen.getByTestId('icon-close'))
    expect(defaultProps.setIsOpenComment).toHaveBeenCalledWith(false)
  })

  it('maneja sesión nula mostrando imagen por defecto y UI básica', async () => {
    ;(useSession as any).mockReturnValue({ data: null })
    render(<ItemComment {...defaultProps} />)
    const imgs = await screen.findAllByAltText('perfil')
    expect(imgs[0]).toHaveAttribute('src', '/img/title-doraemon.jpg')
    expect(screen.getByPlaceholderText('¿Qué estás pensando?')).toBeInTheDocument()
  })
})
