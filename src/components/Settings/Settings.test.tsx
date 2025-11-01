import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useSession } from 'next-auth/react'
import * as nextAuthReact from 'next-auth/react'
import Settings from './Settings'

vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
  signOut: vi.fn(),
}))

vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}))

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

vi.mock('react-icons/lu', () => ({
  LuUser: () => <span data-testid="icon-user" />,
}))

vi.mock('react-icons/io5', () => ({
  IoStatsChart: () => <span data-testid="icon-chart" />,
}))

vi.mock('react-icons/fa', () => ({
  FaRegNewspaper: () => <span data-testid="icon-newspaper" />,
}))

vi.mock('react-icons/ri', () => ({
  RiSaveLine: () => <span data-testid="icon-save" />,
}))

describe('Settings', () => {
  const mockSession = {
    user: {
      id: 'user123',
      email: 'test@example.com',
      name: 'Test User',
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useSession as any).mockReturnValue({ data: mockSession })
  })

  it('renders the settings component with all sections', () => {
    render(<Settings />)

    expect(screen.getByText('Perfil')).toBeInTheDocument()
    expect(screen.getByText('Mis publicaciones')).toBeInTheDocument()
    expect(screen.getByText('Publicaciones guardadas')).toBeInTheDocument()
    expect(screen.getByText('Configuración')).toBeInTheDocument()
  })

  it('displays user email in logout section', () => {
    render(<Settings />)

    expect(screen.getByText(`Cerrar sesión: ${mockSession.user.email}`)).toBeInTheDocument()
  })

  it('renders profile link with correct href', () => {
    render(<Settings />)

    const profileLink = screen.getByRole('link', { name: /Perfil/i })
    expect(profileLink).toHaveAttribute('href', `/blog/mi-perfil/${mockSession.user.id}`)
  })

  it('renders publications link with correct href', () => {
    render(<Settings />)

    const publicationsLink = screen.getByRole('link', { name: /Mis publicaciones/i })
    expect(publicationsLink).toHaveAttribute('href', `/blog/mi-perfil/${mockSession.user.id}/ajustes/publicaciones`)
  })

  it('renders saved publications link with correct href', () => {
    render(<Settings />)

    const savedLink = screen.getByRole('link', { name: /Publicaciones guardadas/i })
    expect(savedLink).toHaveAttribute('href', `/blog/mi-perfil/${mockSession.user.id}/ajustes/publicacionesguardadas`)
  })

  it('renders account settings link with correct href', () => {
    render(<Settings />)

    const accountLink = screen.getByRole('link', { name: /Configuración/i })
    expect(accountLink).toHaveAttribute('href', `/blog/mi-perfil/${mockSession.user.id}/ajustes/cuenta`)
  })

  it('calls signOut when logout section is clicked', async () => {
    const mockSignOut = vi.fn()
    ;(nextAuthReact.signOut as any) = mockSignOut

    render(<Settings />)

    const logoutSection = screen.getByText(`Cerrar sesión: ${mockSession.user.email}`).closest('div')
    await userEvent.click(logoutSection!)

    expect(mockSignOut).toHaveBeenCalled()
  })

  it('handles missing session gracefully', () => {
  ;(useSession as any).mockReturnValue({ data: null })

  render(<Settings />)

  const logoutSection = screen.getByText(/Cerrar sesión/).closest('.texto-logout')
  expect(logoutSection).toBeInTheDocument()
})
})
