import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import EstructuraCuerpo from './EstructuraCuerpo'

const { mockUseStore } = vi.hoisted(() => {
  return {
    mockUseStore: vi.fn(),
  }
})

vi.mock('@/zustand', () => ({
  __esModule: true,
  default: mockUseStore,
}))

vi.mock('@/components/Header/Header', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-header">Header</div>,
}))

vi.mock('@/components/Header/SearchFull', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-search-full">SearchFull</div>,
}))

describe('EstructuraCuerpo', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseStore.mockReturnValue({ isOpenSearchFull: false })
  })

  it('renderiza Header y children cuando isOpenSearchFull es false', () => {
    render(
      <EstructuraCuerpo>
        <p>Contenido principal</p>
      </EstructuraCuerpo>
    )

    expect(screen.getByTestId('mock-header')).toBeInTheDocument()
    expect(screen.getByText('Contenido principal')).toBeInTheDocument()
    expect(screen.queryByTestId('mock-search-full')).not.toBeInTheDocument()
  })

  it('renderiza SearchFull y oculta children cuando isOpenSearchFull es true', () => {
    mockUseStore.mockReturnValue({ isOpenSearchFull: true })

    render(
      <EstructuraCuerpo>
        <p>Contenido principal</p>
      </EstructuraCuerpo>
    )

    expect(screen.getByTestId('mock-header')).toBeInTheDocument()
    expect(screen.getByTestId('mock-search-full')).toBeInTheDocument()
    expect(screen.queryByText('Contenido principal')).not.toBeInTheDocument()
  })

  it('renderiza main-secundario cuando detalle es true', () => {
    render(
      <EstructuraCuerpo detalle childrenDetail={<p>Detalle secundario</p>}>
        <p>Contenido principal</p>
      </EstructuraCuerpo>
    )

    expect(screen.getByText('Contenido principal')).toBeInTheDocument()
    expect(screen.getByText('Detalle secundario')).toBeInTheDocument()
  })

  it('no renderiza main-secundario cuando detalle es false', () => {
    render(
      <EstructuraCuerpo>
        <p>Contenido principal</p>
      </EstructuraCuerpo>
    )

    expect(screen.getByText('Contenido principal')).toBeInTheDocument()
  })

  it('no rompe cuando no hay children', () => {
    render(<EstructuraCuerpo />)

    expect(screen.getByTestId('mock-header')).toBeInTheDocument()
    expect(screen.queryByTestId('mock-search-full')).not.toBeInTheDocument()
  })

  it('renderiza solo childrenDetail cuando solo se pasa detalle', () => {
    render(<EstructuraCuerpo detalle childrenDetail={<p>Solo detalle</p>} />)

    expect(screen.getByTestId('mock-header')).toBeInTheDocument()
    expect(screen.getByText('Solo detalle')).toBeInTheDocument()
  })
})
