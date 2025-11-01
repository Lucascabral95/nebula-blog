import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import StructureConfigData from './StructureConfigData'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...rest }: any) => <div {...rest}>{children}</div>,
  },
}))

describe('StructureConfigData', () => {
  it('renderiza el componente correctamente', () => {
    render(
      <StructureConfigData
        titulo="Test Título"
        childrenInputs={<div>Test Inputs</div>}
        botones={<button>Test Button</button>}
      />
    )

    expect(screen.getByText('Test Título')).toBeInTheDocument()
    expect(screen.getByText('Test Inputs')).toBeInTheDocument()
    expect(screen.getByText('Test Button')).toBeInTheDocument()
  })

  it('muestra el título en un h3', () => {
    render(
      <StructureConfigData
        titulo="Mi Título"
        childrenInputs={<div>Inputs</div>}
        botones={<button>Botón</button>}
      />
    )

    const titulo = screen.getByRole('heading', { level: 3, name: 'Mi Título' })
    expect(titulo).toBeInTheDocument()
  })

  it('renderiza correctamente los childrenInputs', () => {
    render(
      <StructureConfigData
        titulo="Título"
        childrenInputs={
          <div>
            <input placeholder="test input" />
            <textarea placeholder="test textarea" />
          </div>
        }
        botones={<button>Botón</button>}
      />
    )

    expect(screen.getByPlaceholderText('test input')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('test textarea')).toBeInTheDocument()
  })

  it('renderiza correctamente los botones', () => {
    render(
      <StructureConfigData
        titulo="Título"
        childrenInputs={<div>Inputs</div>}
        botones={
          <>
            <button>Guardar</button>
            <button>Cancelar</button>
          </>
        }
      />
    )

    expect(screen.getByRole('button', { name: 'Guardar' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument()
  })

  it('renderiza con contenido complejo en childrenInputs', () => {
    render(
      <StructureConfigData
        titulo="Formulario"
        childrenInputs={
          <div>
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" type="text" />
            <label htmlFor="email">Email</label>
            <input id="email" type="email" />
          </div>
        }
        botones={<button>Enviar</button>}
      />
    )

    expect(screen.getByText('Nombre')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('aplica las clases CSS correctas', () => {
    const { container } = render(
      <StructureConfigData
        titulo="Título"
        childrenInputs={<div>Inputs</div>}
        botones={<button>Botón</button>}
      />
    )

    expect(container.querySelector('.config-data')).toBeInTheDocument()
    expect(container.querySelector('.contenedor-config-data')).toBeInTheDocument()
    expect(container.querySelector('.titulo-config')).toBeInTheDocument()
    expect(container.querySelector('.children-input')).toBeInTheDocument()
    expect(container.querySelector('.botones-config')).toBeInTheDocument()
  })

  it('renderiza con título vacío', () => {
  render(
    <StructureConfigData
      titulo=""
      childrenInputs={<div>Inputs</div>}
      botones={<button>Botón</button>}
    />
  )

  const h3 = screen.getByRole('heading', { level: 3 })
  expect(h3).toBeInTheDocument()
  expect(h3.textContent?.trim()).toBe('')
})

  it('renderiza múltiples botones en la sección de botones', () => {
    render(
      <StructureConfigData
        titulo="Título"
        childrenInputs={<div>Inputs</div>}
        botones={
          <>
            <button>Primero</button>
            <button>Segundo</button>
            <button>Tercero</button>
          </>
        }
      />
    )

    expect(screen.getByRole('button', { name: 'Primero' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Segundo' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Tercero' })).toBeInTheDocument()
  })

  it('estructura del DOM es correcta', () => {
    const { container } = render(
      <StructureConfigData
        titulo="Test"
        childrenInputs={<div data-testid="inputs-section">Inputs</div>}
        botones={<div data-testid="buttons-section">Buttons</div>}
      />
    )

    const configData = container.querySelector('.config-data')
    const contenedor = configData?.querySelector('.contenedor-config-data')
    const titulo = contenedor?.querySelector('.titulo-config')
    const children = contenedor?.querySelector('.children-input')
    const botones = contenedor?.querySelector('.botones-config')

    expect(configData).toBeInTheDocument()
    expect(contenedor).toBeInTheDocument()
    expect(titulo).toBeInTheDocument()
    expect(children).toBeInTheDocument()
    expect(botones).toBeInTheDocument()
  })

  it('renderiza componentes complejos como children', () => {
    const ComplexComponent = () => (
      <div>
        <p>Componente complejo</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </div>
    )

    render(
      <StructureConfigData
        titulo="Con Componente"
        childrenInputs={<ComplexComponent />}
        botones={<button>OK</button>}
      />
    )

    expect(screen.getByText('Componente complejo')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })
})
