import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EstructuraLoginRegister from './EstructuraLoginRegister'

describe('EstructuraLoginRegister', () => {
  it('renders children correctly', () => {
    const testText = 'Test Content'
    
    render(
      <EstructuraLoginRegister>
        <div>{testText}</div>
      </EstructuraLoginRegister>
    )
    
    expect(screen.getByText(testText)).toBeInTheDocument()
  })

  it('has the correct CSS classes', () => {
    render(
      <EstructuraLoginRegister>
        <div>Test</div>
      </EstructuraLoginRegister>
    )
    
    const container = screen.getByText('Test').parentElement?.parentElement
    
    expect(container).toHaveClass('estructura-login-register')
    expect(container?.firstChild).toHaveClass('contenedor-estructura-login-register')
  })

  it('renders multiple children correctly', () => {
    render(
      <EstructuraLoginRegister>
        <div>First Child</div>
        <div>Second Child</div>
        <div>Third Child</div>
      </EstructuraLoginRegister>
    )
    
    expect(screen.getByText('First Child')).toBeInTheDocument()
    expect(screen.getByText('Second Child')).toBeInTheDocument()
    expect(screen.getByText('Third Child')).toBeInTheDocument()
  })
})