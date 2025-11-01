import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EstructuraCuerpoInterior from './EstructuraCuerpoInterior'

describe('EstructuraCuerpoInterior', () => {
  it('renders noticias and recomendaciones correctly', () => {
    const noticiasContent = 'Contenido de Noticias'
    const recomendacionesContent = 'Contenido de Recomendaciones'
    
    render(
      <EstructuraCuerpoInterior
        noticias={<div>{noticiasContent}</div>}
        recomendaciones={<div>{recomendacionesContent}</div>}
      />
    )
    
    expect(screen.getByText(noticiasContent)).toBeInTheDocument()
    expect(screen.getByText(recomendacionesContent)).toBeInTheDocument()
  })

  it('has the correct CSS structure', () => {
    render(
      <EstructuraCuerpoInterior
        noticias={<div>Noticias</div>}
        recomendaciones={<div>Recomendaciones</div>}
      />
    )
    
    const container = screen.getByText('Noticias').parentElement?.parentElement
    
    expect(container).toHaveClass('estructura-cuerpo-interior')
    expect(screen.getByText('Noticias').parentElement).toHaveClass('noticias')
    expect(screen.getByText('Recomendaciones').parentElement).toHaveClass('recomendaciones')
  })

  it('renders complex components as children', () => {
    const TestComponent = () => <div data-testid="test-component">Componente de Prueba</div>
    
    render(
      <EstructuraCuerpoInterior
        noticias={<TestComponent />}
        recomendaciones={<div>Otras recomendaciones</div>}
      />
    )
    
    expect(screen.getByTestId('test-component')).toBeInTheDocument()
    expect(screen.getByText('Otras recomendaciones')).toBeInTheDocument()
  })
})
