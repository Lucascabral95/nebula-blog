import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { SettingsIcon } from './SettingsIcon'

vi.mock('react-icons/lu', () => ({
  LuUser: (props: any) => <span data-testid="icon-user" {...props} />,
}))

vi.mock('react-icons/fa', () => ({
  FaRegNewspaper: (props: any) => <span data-testid="icon-newspaper" {...props} />,
}))

vi.mock('react-icons/ri', () => ({
  RiSaveLine: (props: any) => <span data-testid="icon-save" {...props} />,
}))

vi.mock('react-icons/io5', () => ({
  IoStatsChart: (props: any) => <span data-testid="icon-stats" {...props} />,
}))

describe('SettingsIcon', () => {
  it('renderiza el icono user correctamente', () => {
    const { container } = render(<SettingsIcon iconType="user" />)

    const icon = container.querySelector('[data-testid="icon-user"]')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('icono-seccion')
  })

  it('renderiza el icono newspaper correctamente', () => {
    const { container } = render(<SettingsIcon iconType="newspaper" />)

    const icon = container.querySelector('[data-testid="icon-newspaper"]')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('icono-seccion')
  })

  it('renderiza el icono save correctamente', () => {
    const { container } = render(<SettingsIcon iconType="save" />)

    const icon = container.querySelector('[data-testid="icon-save"]')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('icono-seccion')
  })

  it('renderiza el icono stats correctamente', () => {
    const { container } = render(<SettingsIcon iconType="stats" />)

    const icon = container.querySelector('[data-testid="icon-stats"]')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('icono-seccion')
  })

  it('todos los iconos tienen la clase icono-seccion', () => {
    const types: Array<'user' | 'newspaper' | 'save' | 'stats'> = ['user', 'newspaper', 'save', 'stats']

    types.forEach((type) => {
      const { container } = render(<SettingsIcon iconType={type} />)
      const icon = container.querySelector('.icono-seccion')
      expect(icon).toBeInTheDocument()
    })
  })

  it('cambia de icono correctamente con rerender', () => {
    const { container, rerender } = render(<SettingsIcon iconType="user" />)

    expect(container.querySelector('[data-testid="icon-user"]')).toBeInTheDocument()

    rerender(<SettingsIcon iconType="stats" />)

    expect(container.querySelector('[data-testid="icon-stats"]')).toBeInTheDocument()
    expect(container.querySelector('[data-testid="icon-user"]')).not.toBeInTheDocument()
  })

  it('renderiza solo un icono a la vez', () => {
    const { container } = render(<SettingsIcon iconType="newspaper" />)

    const icons = container.querySelectorAll('.icono-seccion')
    expect(icons).toHaveLength(1)
  })

  it('el componente no tiene contenedor adicional', () => {
    const { container } = render(<SettingsIcon iconType="save" />)

    expect(container.firstChild).toHaveClass('icono-seccion')
  })
})
