import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('renders email and password fields', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />)
    
    expect(screen.getByLabelText('Email:')).toBeInTheDocument()
    expect(screen.getByLabelText('Password:')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '🚀 Sign In' })).toBeInTheDocument()
  })

  it('validates email format', async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />)
    
    const emailInput = screen.getByLabelText('Email:')
    
    // Invalid email - set value and submit
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    
    // Submit the form directly to avoid button click issues
    const form = emailInput.closest('form')!
    fireEvent.submit(form)
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })
    expect(mockOnSubmit).not.toHaveBeenCalled()
    
    // Valid email
    fireEvent.change(emailInput, { target: { value: 'valid@email.com' } })
    fireEvent.submit(form)
    
    expect(mockOnSubmit).toHaveBeenCalledWith('valid@email.com', '')
  })

  it('submits form with valid data', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />)
    
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } })
    fireEvent.click(screen.getByRole('button', { name: '🚀 Sign In' }))
    
    expect(mockOnSubmit).toHaveBeenCalledWith('test@example.com', 'password123')
  })
})