import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'

const { mockUseSession, mockUseStore, mockUseSearch } = vi.hoisted(() => {
  return {
    mockUseSession: vi.fn(),
    mockUseStore: vi.fn(),
    mockUseSearch: vi.fn(),
  }
})

vi.mock('next-auth/react', () => ({
  useSession: mockUseSession,
}))

vi.mock('@/zustand', () => ({
  __esModule: true,
  default: mockUseStore,
}))

vi.mock('@/presentation/hooks/useSearch', () => ({
  useSearch: mockUseSearch,
}))

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

vi.mock('react-icons/tfi', () => ({
  TfiWrite: () => <span data-testid="icon-write" />,
}))

vi.mock('react-icons/hi2', () => ({
  HiMiniMagnifyingGlass: () => <span data-testid="icon-search" />,
}))

vi.mock('./ItemsSearch', () => ({
  __esModule: true,
  default: ({ publicacionesEncontradas }: any) => (
    <div data-testid="items-search">
      Items: {publicacionesEncontradas.length}
    </div>
  ),
}))

vi.mock('../Settings/Settings', () => ({
  __esModule: true,
  default: () => <div data-testid="settings">Settings</div>,
}))

describe('Header', () => {
  const mockToggleSearchFull = vi.fn()
  const mockSetSearch = vi.fn()
  const mockSetIsOpenMenu = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    mockUseSession.mockReturnValue({
      data: {
        user: {
          id: 'u1',
          name: 'Test User',
          email: 'test@test.com',
          image: '/img/user.png',
        },
      },
    })

    mockUseStore.mockReturnValue({
      toggleSearchFull: mockToggleSearchFull,
    })

    mockUseSearch.mockReturnValue({
      search: '',
      setSearch: mockSetSearch,
      results: [],
      isOpenMenu: false,
      setIsOpenMenu: mockSetIsOpenMenu,
      shouldShowResults: false,
    })
  })

  it('renderiza correctamente el header', () => {
    render(<Header />)

    expect(screen.getByText('Nebula')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument()
    expect(screen.getByText('Escribir')).toBeInTheDocument()
    expect(screen.getByAltText('imagen de perfil')).toBeInTheDocument()
  })

  it('muestra la imagen del usuario de la sesión', () => {
    render(<Header />)

    const img = screen.getByAltText('imagen de perfil')
    expect(img).toHaveAttribute('src', '/img/user.png')
  })

  it('muestra imagen por defecto cuando no hay sesión', () => {
    mockUseSession.mockReturnValue({ data: null })

    render(<Header />)

    const img = screen.getByAltText('imagen de perfil')
    expect(img).toHaveAttribute('src', '/img/title-doraemon.jpg')
  })

  it('llama a setSearch cuando se escribe en el input', () => {
    render(<Header />)

    const input = screen.getByPlaceholderText('Buscar...')
    fireEvent.change(input, { target: { value: 'test búsqueda' } })

    expect(mockSetSearch).toHaveBeenCalledWith('test búsqueda')
  })

  it('muestra el valor de búsqueda del hook', () => {
    mockUseSearch.mockReturnValue({
      search: 'búsqueda actual',
      setSearch: mockSetSearch,
      results: [],
      isOpenMenu: false,
      setIsOpenMenu: mockSetIsOpenMenu,
      shouldShowResults: false,
    })

    render(<Header />)

    const input = screen.getByPlaceholderText('Buscar...') as HTMLInputElement
    expect(input.value).toBe('búsqueda actual')
  })

  it('llama a toggleSearchFull al hacer click en el botón lupa', () => {
    const { container } = render(<Header />)

    const lupaButton = container.querySelector('.boton-lupa')!
    fireEvent.click(lupaButton)

    expect(mockToggleSearchFull).toHaveBeenCalledTimes(1)
  })

  it('muestra ItemsSearch cuando shouldShowResults es true', () => {
    mockUseSearch.mockReturnValue({
      search: 'test',
      setSearch: mockSetSearch,
      results: [{ id: 1 }, { id: 2 }],
      isOpenMenu: false,
      setIsOpenMenu: mockSetIsOpenMenu,
      shouldShowResults: true,
    })

    render(<Header />)

    expect(screen.getByTestId('items-search')).toBeInTheDocument()
    expect(screen.getByText('Items: 2')).toBeInTheDocument()
  })

  it('no muestra ItemsSearch cuando shouldShowResults es false', () => {
    render(<Header />)

    expect(screen.queryByTestId('items-search')).not.toBeInTheDocument()
  })

  it('muestra Settings cuando isOpenMenu es true', () => {
    mockUseSearch.mockReturnValue({
      search: '',
      setSearch: mockSetSearch,
      results: [],
      isOpenMenu: true,
      setIsOpenMenu: mockSetIsOpenMenu,
      shouldShowResults: false,
    })

    render(<Header />)

    expect(screen.getByTestId('settings')).toBeInTheDocument()
  })

  it('no muestra Settings cuando isOpenMenu es false', () => {
    render(<Header />)

    expect(screen.queryByTestId('settings')).not.toBeInTheDocument()
  })

  it('llama a setIsOpenMenu al hacer click en el perfil', () => {
    const { container } = render(<Header />)

    const perfil = container.querySelector('.perfil')!
    fireEvent.click(perfil)

    expect(mockSetIsOpenMenu).toHaveBeenCalledWith(true)
  })

  it('toggle isOpenMenu correctamente', () => {
    mockUseSearch.mockReturnValue({
      search: '',
      setSearch: mockSetSearch,
      results: [],
      isOpenMenu: true,
      setIsOpenMenu: mockSetIsOpenMenu,
      shouldShowResults: false,
    })

    const { container } = render(<Header />)

    const perfil = container.querySelector('.perfil')!
    fireEvent.click(perfil)

    expect(mockSetIsOpenMenu).toHaveBeenCalledWith(false)
  })

  it('el link del logo apunta a /blog', () => {
    render(<Header />)

    const logoLink = screen.getByText('Nebula').closest('a')!
    expect(logoLink).toHaveAttribute('href', '/blog')
  })

  it('el link de escribir apunta a /blog/escribir-posteo', () => {
    render(<Header />)

    const writeLink = screen.getByText('Escribir').closest('a')!
    expect(writeLink).toHaveAttribute('href', '/blog/escribir-posteo')
  })

  it('renderiza los iconos correctamente', () => {
    render(<Header />)

    expect(screen.getAllByTestId('icon-search')).toHaveLength(2)
    expect(screen.getByTestId('icon-write')).toBeInTheDocument()
  })
})
