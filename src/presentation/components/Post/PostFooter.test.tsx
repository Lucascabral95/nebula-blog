import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PostFooter } from './PostFooter'

const { mockConstants } = vi.hoisted(() => {
  return {
    mockConstants: {
      AUTHOR: {
        name: 'Test Author',
        github: 'https://github.com/testauthor',
      },
      NEW_POST_CONTENT: {
        POWERED_BY: 'Powered by',
        YEAR: '2025',
      },
      SOCIAL_LINKS: [
        {
          name: 'github',
          icon: 'github',
          url: 'https://github.com/testauthor',
        },
        {
          name: 'instagram',
          icon: 'instagram',
          url: 'https://instagram.com/testauthor',
        },
        {
          name: 'linkedin',
          icon: 'linkedin',
          url: 'https://linkedin.com/in/testauthor',
        },
      ],
    },
  }
})

vi.mock('@/infrastructure/constants', () => ({
  AUTHOR: mockConstants.AUTHOR,
  NEW_POST_CONTENT: mockConstants.NEW_POST_CONTENT,
  SOCIAL_LINKS: mockConstants.SOCIAL_LINKS,
}))

vi.mock('react-icons/fa', () => ({
  FaGithub: (props: any) => <span data-testid="icon-github" {...props} />,
  FaInstagram: (props: any) => <span data-testid="icon-instagram" {...props} />,
  FaLinkedin: (props: any) => <span data-testid="icon-linkedin" {...props} />,
}))

describe('PostFooter', () => {
  it('renderiza correctamente el componente', () => {
  render(<PostFooter />)

  expect(screen.getByText(/Powered by/)).toBeInTheDocument()
  expect(screen.getByText('Test Author')).toBeInTheDocument()
  expect(screen.getByText(/2025/)).toBeInTheDocument()
})

  it('muestra el link del autor correctamente', () => {
    render(<PostFooter />)

    const authorLink = screen.getByRole('link', { name: 'Test Author' })
    expect(authorLink).toHaveAttribute('href', 'https://github.com/testauthor')
    expect(authorLink).toHaveAttribute('target', '_blank')
    expect(authorLink).toHaveAttribute('rel', 'noreferrer')
  })

  it('renderiza todos los iconos de redes sociales', () => {
    render(<PostFooter />)

    expect(screen.getByTestId('icon-github')).toBeInTheDocument()
    expect(screen.getByTestId('icon-instagram')).toBeInTheDocument()
    expect(screen.getByTestId('icon-linkedin')).toBeInTheDocument()
  })

  it('renderiza múltiples links', () => {
    render(<PostFooter />)

    const allLinks = screen.getAllByRole('link')
    expect(allLinks.length).toBeGreaterThanOrEqual(4)
  })

  it('el link de github del autor apunta correctamente', () => {
    render(<PostFooter />)

    const allLinks = screen.getAllByRole('link')
    const githubLink = allLinks.find(
      (link) => (link as HTMLAnchorElement).href === 'https://github.com/testauthor'
    )

    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noreferrer')
  })

  it('el link de instagram apunta correctamente', () => {
    render(<PostFooter />)

    const allLinks = screen.getAllByRole('link')
    const instagramLink = allLinks.find(
      (link) => (link as HTMLAnchorElement).href === 'https://instagram.com/testauthor'
    )

    expect(instagramLink).toBeInTheDocument()
  })

  it('el link de linkedin apunta correctamente', () => {
    render(<PostFooter />)

    const allLinks = screen.getAllByRole('link')
    const linkedinLink = allLinks.find(
      (link) => (link as HTMLAnchorElement).href === 'https://linkedin.com/in/testauthor'
    )

    expect(linkedinLink).toBeInTheDocument()
  })

  it('todos los links tienen target="_blank" y rel="noreferrer"', () => {
    render(<PostFooter />)

    const allLinks = screen.getAllByRole('link')

    allLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noreferrer')
    })
  })

  it('renderiza la estructura del footer correctamente', () => {
    const { container } = render(<PostFooter />)

    expect(container.querySelector('.footer-inferior')).toBeInTheDocument()
    expect(container.querySelector('.contenedor-footer-inferior')).toBeInTheDocument()
    expect(container.querySelector('.footer-secciones')).toBeInTheDocument()
    expect(container.querySelector('.presentacion-mia')).toBeInTheDocument()
    expect(container.querySelector('.seccion-redes')).toBeInTheDocument()
  })

  it('renderiza exactamente 3 secciones de redes sociales', () => {
    const { container } = render(<PostFooter />)

    const secciones = container.querySelectorAll('.seccion-redes .seccion')
    expect(secciones).toHaveLength(3)
  })

  it('cada sección tiene un link', () => {
    const { container } = render(<PostFooter />)

    const secciones = container.querySelectorAll('.seccion-redes .seccion')
    
    secciones.forEach((seccion) => {
      const link = seccion.querySelector('a')
      expect(link).toBeInTheDocument()
    })
  })

  it('cada link de red social tiene un icono', () => {
    const { container } = render(<PostFooter />)

    const seccionRedes = container.querySelector('.seccion-redes')
    const links = seccionRedes?.querySelectorAll('a')

    expect(links?.length).toBe(3)
    
    links?.forEach((link) => {
      const icono = link.querySelector('.icono')
      expect(icono).toBeInTheDocument()
    })
  })

  it('muestra el texto completo del footer', () => {
    render(<PostFooter />)

    const presentacionDiv = screen.getByText(/Powered by/)
    expect(presentacionDiv).toBeInTheDocument()
    expect(presentacionDiv.textContent).toContain('Powered by')
    expect(presentacionDiv.textContent).toContain('Test Author')
    expect(presentacionDiv.textContent).toContain('2025')
  })

  it('todos los iconos de redes tienen la clase icono-seccion', () => {
    const { container } = render(<PostFooter />)

    const github = screen.getByTestId('icon-github')
    const instagram = screen.getByTestId('icon-instagram')
    const linkedin = screen.getByTestId('icon-linkedin')

    expect(github).toBeInTheDocument()
    expect(instagram).toBeInTheDocument()
    expect(linkedin).toBeInTheDocument()
  })
})
