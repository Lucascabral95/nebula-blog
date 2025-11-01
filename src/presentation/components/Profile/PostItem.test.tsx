import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import PostItem from './PostItem'

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}))

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}))

vi.mock('moment', () => ({
  __esModule: true,
  default: (date: any) => ({
    fromNow: () => 'hace 2 horas',
  }),
}))

vi.mock('react-icons/fc', () => ({
  FcLike: () => <span data-testid="icon-like" />,
}))

vi.mock('react-icons/fa', () => ({
  FaCommentAlt: () => <span data-testid="icon-comment" />,
}))

describe('PostItem', () => {
  const mockPost = {
    _id: 'post1',
    title: 'Test Post',
    content: 'Este es el contenido del post',
    categories: 'Tecnología',
    createdAt: new Date('2025-01-01'),
    likes: 15,
    comments: ['c1', 'c2', 'c3'],
    author: [
      {
        _id: 'author1',
        email: 'author@test.com',
      },
    ],
  }

  it('renderiza correctamente el componente', () => {
    render(<PostItem post={mockPost} />)

    expect(screen.getByText('Test Post')).toBeInTheDocument()
    expect(screen.getByText('author@test.com')).toBeInTheDocument()
    expect(screen.getByText('Tecnología')).toBeInTheDocument()
  })

  it('muestra el contenido del post', () => {
    render(<PostItem post={mockPost} />)

    expect(screen.getByText('Este es el contenido del post')).toBeInTheDocument()
  })

  it('muestra la cantidad de likes correctamente', () => {
    render(<PostItem post={mockPost} />)

    expect(screen.getByText('15')).toBeInTheDocument()
  })

  it('muestra la cantidad de comentarios correctamente', () => {
    render(<PostItem post={mockPost} />)

    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('muestra la fecha formateada con moment', () => {
    render(<PostItem post={mockPost} />)

    expect(screen.getByText('hace 2 horas')).toBeInTheDocument()
  })

  it('renderiza los iconos de like y comentario', () => {
    render(<PostItem post={mockPost} />)

    expect(screen.getByTestId('icon-like')).toBeInTheDocument()
    expect(screen.getByTestId('icon-comment')).toBeInTheDocument()
  })

  it('renderiza la imagen del perfil', () => {
    render(<PostItem post={mockPost} />)

    const img = screen.getByAltText('Perfil')
    expect(img).toHaveAttribute('src', '/img/title-doraemon.jpg')
    expect(img).toHaveAttribute('width', '20')
    expect(img).toHaveAttribute('height', '20')
  })

  it('el link del post apunta correctamente', () => {
    const { container } = render(<PostItem post={mockPost} />)

    const mainLink = container.querySelector('.posteoss')
    expect(mainLink).toHaveAttribute('href', '/blog/posteo/post1')
  })

  it('los links del perfil apuntan correctamente', () => {
    render(<PostItem post={mockPost} />)

    const links = screen.getAllByRole('link')
    const profileLinks = links.filter((link) =>
      (link as HTMLAnchorElement).href.includes('/blog/perfil/author1')
    )

    expect(profileLinks.length).toBe(2)
  })

  it('el título se renderiza en un h3', () => {
    render(<PostItem post={mockPost} />)

    const titulo = screen.getByRole('heading', { level: 3, name: 'Test Post' })
    expect(titulo).toBeInTheDocument()
  })

  it('formatea el contenido reemplazando saltos de línea', () => {
  const postConSaltos = {
    ...mockPost,
    content: 'Línea 1\nLínea 2\nLínea 3',
  }

  const { container } = render(<PostItem post={postConSaltos} />)

  const descripcion = container.querySelector('.descripcion-ultimo-posteo p')
  expect(descripcion?.innerHTML).toMatch(/<br\s*\/?>/i)
})

  it('maneja contenido vacío correctamente', () => {
    const postVacio = {
      ...mockPost,
      content: '',
    }

    render(<PostItem post={postVacio} />)

    expect(screen.getByText('Test Post')).toBeInTheDocument()
  })

  it('renderiza con diferentes categorías', () => {
    const postDiferente = {
      ...mockPost,
      categories: 'Deportes',
    }

    render(<PostItem post={postDiferente} />)

    expect(screen.getByText('Deportes')).toBeInTheDocument()
  })

  it('muestra cero likes correctamente', () => {
    const postSinLikes = {
      ...mockPost,
      likes: 0,
    }

    render(<PostItem post={postSinLikes} />)

    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('muestra cero comentarios correctamente', () => {
    const postSinComentarios = {
      ...mockPost,
      comments: [],
    }

    render(<PostItem post={postSinComentarios} />)

    const ceros = screen.getAllByText('0')
    expect(ceros.length).toBeGreaterThan(0)
  })

  it('la estructura del DOM es correcta', () => {
    const { container } = render(<PostItem post={mockPost} />)

    expect(container.querySelector('.posteoss')).toBeInTheDocument()
    expect(container.querySelector('.perfil-nombre-categoria')).toBeInTheDocument()
    expect(container.querySelector('.titulo-contenido')).toBeInTheDocument()
    expect(container.querySelector('.likes-comentarios')).toBeInTheDocument()
  })

  it('renderiza múltiples posts independientemente', () => {
    const { container, rerender } = render(<PostItem post={mockPost} />)

    expect(screen.getByText('Test Post')).toBeInTheDocument()

    const otroPost = {
      ...mockPost,
      _id: 'post2',
      title: 'Otro Post',
    }

    rerender(<PostItem post={otroPost} />)

    expect(screen.getByText('Otro Post')).toBeInTheDocument()
  })

  it('acepta props opcionales sin errores', () => {
    render(
      <PostItem post={mockPost} showDelete={true} onDelete={() => {}} />
    )

    expect(screen.getByText('Test Post')).toBeInTheDocument()
  })
})
