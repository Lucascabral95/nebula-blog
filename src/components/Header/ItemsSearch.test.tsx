import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ItemsSearch from './ItemsSearch'

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}))

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}))

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...rest }: any) => <div {...rest}>{children}</div>,
  },
}))

describe('ItemsSearch', () => {
  const mockPublicaciones = [
    {
      _id: 'post1',
      title: 'Primera publicación',
      categories: 'tecnología',
      author: [{ avatar: '/img/author1.jpg' }],
    },
    {
      _id: 'post2',
      title: 'Segunda publicación',
      categories: 'tecnología',
      author: [{ avatar: '/img/author2.jpg' }],
    },
  ]

  it('renderiza la lista de publicaciones correctamente', () => {
    render(<ItemsSearch publicacionesEncontradas={mockPublicaciones} />)

    expect(screen.getByText('Primera publicación')).toBeInTheDocument()
    expect(screen.getByText('Segunda publicación')).toBeInTheDocument()
  })

  it('muestra la categoría en mayúsculas', () => {
    render(<ItemsSearch publicacionesEncontradas={mockPublicaciones} />)

    expect(screen.getByText('TECNOLOGÍA')).toBeInTheDocument()
  })

  it('renderiza las imágenes de los autores', () => {
    render(<ItemsSearch publicacionesEncontradas={mockPublicaciones} />)

    const images = screen.getAllByAltText('autor')
    expect(images).toHaveLength(2)
    expect(images[0]).toHaveAttribute('src', '/img/author1.jpg')
    expect(images[1]).toHaveAttribute('src', '/img/author2.jpg')
  })

  it('usa imagen por defecto cuando no hay avatar', () => {
    const publicacionesSinAvatar = [
      {
        _id: 'post3',
        title: 'Publicación sin avatar',
        categories: 'general',
        author: [{}],
      },
    ]

    render(<ItemsSearch publicacionesEncontradas={publicacionesSinAvatar} />)

    const image = screen.getByAltText('autor')
    expect(image).toHaveAttribute('src', '/img/title-doraemon.jpg')
  })

  it('los links apuntan correctamente a cada publicación', () => {
    render(<ItemsSearch publicacionesEncontradas={mockPublicaciones} />)

    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/blog/posteo/post1')
    expect(links[1]).toHaveAttribute('href', '/blog/posteo/post2')
  })

  it('renderiza correctamente con una sola publicación', () => {
    const unaPublicacion = [mockPublicaciones[0]]

    render(<ItemsSearch publicacionesEncontradas={unaPublicacion} />)

    expect(screen.getByText('Primera publicación')).toBeInTheDocument()
    expect(screen.getByText('TECNOLOGÍA')).toBeInTheDocument()
  })

  it('renderiza todas las publicaciones con sus claves únicas', () => {
    const { container } = render(<ItemsSearch publicacionesEncontradas={mockPublicaciones} />)

    const links = container.querySelectorAll('.mapeo-items-search')
    expect(links).toHaveLength(2)
  })

  it('las imágenes tienen width y height correctos', () => {
    render(<ItemsSearch publicacionesEncontradas={mockPublicaciones} />)

    const images = screen.getAllByAltText('autor')
    images.forEach(img => {
      expect(img).toHaveAttribute('width', '24')
      expect(img).toHaveAttribute('height', '24')
    })
  })

  it('maneja autor sin array correctamente', () => {
    const publicacionSinAuthor = [
      {
        _id: 'post4',
        title: 'Sin autor',
        categories: 'test',
        author: [],
      },
    ]

    render(<ItemsSearch publicacionesEncontradas={publicacionSinAuthor} />)

    const image = screen.getByAltText('autor')
    expect(image).toHaveAttribute('src', '/img/title-doraemon.jpg')
  })
})
