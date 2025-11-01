import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { LoadingSpinner } from './Spinner'

describe('LoadingSpinner', () => {
  it('renderiza correctamente', () => {
    const { container } = render(<LoadingSpinner />)

    expect(container.querySelector('.loading-spinner-overlay')).toBeInTheDocument()
    expect(container.querySelector('.loading-spinner')).toBeInTheDocument()
  })

  it('usa tamaño medium por defecto', () => {
    const { container } = render(<LoadingSpinner />)

    const spinner = container.querySelector('.loading-spinner')
    expect(spinner).toHaveClass('loading-spinner--medium')
  })

  it('aplica la clase small cuando se pasa size="small"', () => {
    const { container } = render(<LoadingSpinner size="small" />)

    const spinner = container.querySelector('.loading-spinner')
    expect(spinner).toHaveClass('loading-spinner--small')
  })

  it('aplica la clase medium cuando se pasa size="medium"', () => {
    const { container } = render(<LoadingSpinner size="medium" />)

    const spinner = container.querySelector('.loading-spinner')
    expect(spinner).toHaveClass('loading-spinner--medium')
  })

  it('aplica la clase large cuando se pasa size="large"', () => {
    const { container } = render(<LoadingSpinner size="large" />)

    const spinner = container.querySelector('.loading-spinner')
    expect(spinner).toHaveClass('loading-spinner--large')
  })

  it('tiene la estructura DOM correcta', () => {
    const { container } = render(<LoadingSpinner />)

    const overlay = container.querySelector('.loading-spinner-overlay')
    const spinner = overlay?.querySelector('.loading-spinner')

    expect(overlay).toBeInTheDocument()
    expect(spinner).toBeInTheDocument()
  })

  it('aplica ambas clases al spinner', () => {
    const { container } = render(<LoadingSpinner size="large" />)

    const spinner = container.querySelector('.loading-spinner')
    expect(spinner).toHaveClass('loading-spinner')
    expect(spinner).toHaveClass('loading-spinner--large')
  })

  it('cambia de tamaño correctamente con rerender', () => {
    const { container, rerender } = render(<LoadingSpinner size="small" />)

    let spinner = container.querySelector('.loading-spinner')
    expect(spinner).toHaveClass('loading-spinner--small')

    rerender(<LoadingSpinner size="large" />)

    spinner = container.querySelector('.loading-spinner')
    expect(spinner).toHaveClass('loading-spinner--large')
    expect(spinner).not.toHaveClass('loading-spinner--small')
  })

  it('el overlay contiene exactamente un spinner', () => {
    const { container } = render(<LoadingSpinner />)

    const overlay = container.querySelector('.loading-spinner-overlay')
    const spinners = overlay?.querySelectorAll('.loading-spinner')

    expect(spinners).toHaveLength(1)
  })

  it('no renderiza contenido adicional', () => {
    const { container } = render(<LoadingSpinner />)

    const overlay = container.querySelector('.loading-spinner-overlay')
    expect(overlay?.children).toHaveLength(1)
  })
})
