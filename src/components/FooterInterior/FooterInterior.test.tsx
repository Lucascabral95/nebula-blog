import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import FooterInterior from './FooterInterior'

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

vi.mock('react-icons/fa', () => ({
  FaGithub: () => <span data-testid="icon-github" />,
  FaInstagram: () => <span data-testid="icon-instagram" />,
  FaLinkedin: () => <span data-testid="icon-linkedin" />,
}))

vi.mock('@/presentation/hooks/useFooterAuthor', () => ({
  useFooterAuthor: vi.fn(),
}))

vi.mock('@/infrastructure/constants', () => ({
  AUTHOR_INFO: {
    name: 'Autor Prueba',
    year: '2025',
    github: 'https://github.com/autor',
    instagram: 'https://instagram.com/autor',
    linkedin: 'https://linkedin.com/in/autor',
  },
}))

describe('FooterInterior', async () => {
  const { useFooterAuthor } = await import('@/presentation/hooks/useFooterAuthor')

  const baseDataPost = {
    author: [{ name: 'juan perez', avatar: '/img/juan.png' }],
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useFooterAuthor as any).mockReturnValue({
      authorData: { user: 'u1', nombreCompleto: 'Juan Perez', bio: 'Bio corta' },
    })
  })

  it('renderiza imagen, nombre y bio desde el hook', () => {
    render(<FooterInterior dataPost={baseDataPost as any} id="u1" />)

    const img = screen.getByAltText('Perfil')
    expect(img).toHaveAttribute('src', '/img/juan.png')

    expect(screen.getByText('Juan Perez')).toBeInTheDocument()
    expect(screen.getByText('Bio corta')).toBeInTheDocument()
  })

  it('links a perfil usan authorData.user', () => {
    render(<FooterInterior dataPost={baseDataPost as any} id="u1" />)

    const links = screen.getAllByRole('link', { name: 'Juan Perez' })
    const profileLinks = screen.getAllByRole('link').filter((a) =>
      (a as HTMLAnchorElement).href.includes('/blog/perfil/u1')
    )
    expect(profileLinks.length).toBeGreaterThanOrEqual(2)
  })

  it('renderiza Powered by y redes sociales desde AUTHOR_INFO', () => {
    render(<FooterInterior dataPost={baseDataPost as any} id="u1" />)

    expect(screen.getByText(/Powered by/i)).toBeInTheDocument()
    expect(screen.getByText('Autor Prueba')).toBeInTheDocument()
    expect(screen.getByText(/2025/)).toBeInTheDocument()

    const github = screen.getAllByRole('link').find((a) =>
      (a as HTMLAnchorElement).href.includes('https://github.com/autor')
    )
    expect(github).toBeTruthy()

    const instagram = screen.getAllByRole('link').find((a) =>
      (a as HTMLAnchorElement).href.includes('https://instagram.com/autor')
    )
    expect(instagram).toBeTruthy()

    const linkedin = screen.getAllByRole('link').find((a) =>
      (a as HTMLAnchorElement).href.includes('https://linkedin.com/in/autor')
    )
    expect(linkedin).toBeTruthy()
  })

  it('usa fallbacks cuando falta authorData y dataPost', () => {
    ;(useFooterAuthor as any).mockReturnValue({ authorData: null })

    render(<FooterInterior dataPost={{} as any} id="uX" />)

    const img = screen.getByAltText('Perfil')
    expect(img).toHaveAttribute('src', '/img/title-doraemon.jpg')

    expect(screen.getByText('Nombre no disponible')).toBeInTheDocument()
    expect(screen.getByText('Sin biografía por el momento...')).toBeInTheDocument()
  })
})
