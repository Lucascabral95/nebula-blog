import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SearchFull from './SearchFull'

const { mockUseStore } = vi.hoisted(() => {
  return {
    mockUseStore: vi.fn(),
  }
})

vi.mock('@/zustand', () => ({
  __esModule: true,
  default: mockUseStore,
}))

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, onClick, ...rest }: any) => (
    <a href={href} onClick={onClick} {...rest}>
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

vi.mock('react-icons/hi2', () => ({
  HiMiniMagnifyingGlass: () => <span data-testid="icon-search" />,
}))

describe('SearchFull', () => {
  const mockToggleSearchFull = vi.fn()
  const mockSetSearch = vi.fn()

  const mockPosts = [
    {
      _id: 'post1',
      title: 'Primera publicación',
      content: 'Contenido de la primera publicación',
      categories: 'Tecnología',
      createdAt: new Date('2025-01-01'),
      likes: 10,
      comments: ['c1', 'c2'],
      author: [
        {
          _id: 'author1',
          email: 'autor1@test.com',
          avatar: '/img/avatar1.jpg',
        },
      ],
    },
    {
      _id: 'post2',
      title: 'Segunda publicación',
      content: 'Contenido con\nsaltos de línea',
      categories: 'Deportes',
      createdAt: new Date('2025-01-02'),
      likes: 5,
      comments: ['c1'],
      author: [
        {
          _id: 'author2',
          email: 'autor2@test.com',
          avatar: null,
        },
      ],
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()

    mockUseStore.mockReturnValue({
      toggleSearchFull: mockToggleSearchFull,
      arrayDePosteos: mockPosts,
      search: '',
      setSearch: mockSetSearch,
    })
  })

  it('renderiza el input de búsqueda correctamente', () => {
    render(<SearchFull />)

    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument()
    expect(screen.getByTestId('icon-search')).toBeInTheDocument()
  })

  it('muestra el valor de búsqueda del store', () => {
    mockUseStore.mockReturnValue({
      toggleSearchFull: mockToggleSearchFull,
      arrayDePosteos: mockPosts,
      search: 'tecnología',
      setSearch: mockSetSearch,
    })

    render(<SearchFull />)

    const input = screen.getByPlaceholderText('Buscar...') as HTMLInputElement
    expect(input.value).toBe('tecnología')
  })

  it('llama a setSearch cuando se escribe en el input', () => {
    render(<SearchFull />)

    const input = screen.getByPlaceholderText('Buscar...')
    fireEvent.change(input, { target: { value: 'nueva búsqueda' } })

    expect(mockSetSearch).toHaveBeenCalledWith('nueva búsqueda')
  })

  it('muestra el texto de resultados cuando hay búsqueda', () => {
    mockUseStore.mockReturnValue({
      toggleSearchFull: mockToggleSearchFull,
      arrayDePosteos: mockPosts,
      search: 'test',
      setSearch: mockSetSearch,
    })

    render(<SearchFull />)

    expect(screen.getByText('Resultados para')).toBeInTheDocument()
    expect(screen.getByText('test')).toBeInTheDocument()
  })

  it('no muestra el texto de resultados cuando no hay búsqueda', () => {
    render(<SearchFull />)

    expect(screen.queryByText('Resultados para')).not.toBeInTheDocument()
  })

  it('renderiza todas las publicaciones', () => {
    render(<SearchFull />)

    expect(screen.getByText('Primera publicación')).toBeInTheDocument()
    expect(screen.getByText('Segunda publicación')).toBeInTheDocument()
  })

  it('muestra correctamente los datos de cada publicación', () => {
    render(<SearchFull />)

    expect(screen.getByText('autor1@test.com')).toBeInTheDocument()
    expect(screen.getByText('autor2@test.com')).toBeInTheDocument()
    expect(screen.getByText('Tecnología')).toBeInTheDocument()
    expect(screen.getByText('Deportes')).toBeInTheDocument()
  })

  it('muestra los likes y comentarios correctamente', () => {
    render(<SearchFull />)

    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('muestra la fecha formateada con moment', () => {
    render(<SearchFull />)

    const fechas = screen.getAllByText('hace 2 horas')
    expect(fechas.length).toBeGreaterThan(0)
  })

  it('usa imagen por defecto cuando no hay avatar', () => {
    render(<SearchFull />)

    const images = screen.getAllByAltText('Perfil')
    expect(images[0]).toHaveAttribute('src', '/img/avatar1.jpg')
    expect(images[1]).toHaveAttribute('src', '/img/title-doraemon.jpg')
  })

  it('los links de publicación apuntan correctamente', () => {
    const { container } = render(<SearchFull />)

    const postLinks = container.querySelectorAll('.posteoss')
    expect(postLinks[0]).toHaveAttribute('href', '/blog/posteo/post1')
    expect(postLinks[1]).toHaveAttribute('href', '/blog/posteo/post2')
  })

  it('los links de perfil apuntan correctamente', () => {
    render(<SearchFull />)

    const links = screen.getAllByRole('link')
    const perfilLinks = links.filter((link) => 
      (link as HTMLAnchorElement).href.includes('/blog/perfil/')
    )
    
    expect(perfilLinks.length).toBeGreaterThan(0)
  })

  it('llama a handlePostClick al hacer click en una publicación', () => {
    const { container } = render(<SearchFull />)

    const postLink = container.querySelector('.posteoss')!
    fireEvent.click(postLink)

    expect(mockSetSearch).toHaveBeenCalledWith('')
    expect(mockToggleSearchFull).toHaveBeenCalledTimes(1)
  })

 it('renderiza el contenido con dangerouslySetInnerHTML', () => {
  const { container } = render(<SearchFull />)

  const descripcionDivs = container.querySelectorAll('.descripcion-ultimo-posteo p')
  expect(descripcionDivs.length).toBeGreaterThan(0)
  
  const tieneContenido = Array.from(descripcionDivs).some(
    (div) => div.innerHTML.length > 0
  )
  expect(tieneContenido).toBe(true)
})

  it('renderiza los iconos correctamente', () => {
    render(<SearchFull />)

    expect(screen.getAllByTestId('icon-like')).toHaveLength(2)
    expect(screen.getAllByTestId('icon-comment')).toHaveLength(2)
  })

  it('maneja array vacío de posts', () => {
    mockUseStore.mockReturnValue({
      toggleSearchFull: mockToggleSearchFull,
      arrayDePosteos: [],
      search: '',
      setSearch: mockSetSearch,
    })

    render(<SearchFull />)

    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument()
    expect(screen.queryByText('Primera publicación')).not.toBeInTheDocument()
  })
})
