import Button from '.'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('check Button Component', () => {
  it('should generate id properly', () => {
      render(<Button disabled={true}>Submit</Button>)
      const button = screen.getByText('Submit')
      const buttonTwo = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(buttonTwo).toHaveTextContent('Submit')
      expect(button).toBeInTheDocument()
  })
})
