import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Home from '.'

jest.mock('../../hooks/useRental', () => ({
  __esModule: true,
  default: () => ({
    rentals: [],
    loadData: () => {}
  })
}))

jest.mock('../../hooks/useLocalStorage', () => ({
  __esModule: true,
  default: () => ({
    setLocalStorage: () => {}
  })
}))

jest.mock('../../hooks/useSearch', () => ({
  __esModule: true,
  default: () => ({
    list: [],
    search: () => {}
  })
}))

describe('check Button Comonent', () => {
  it('should generate id properly', async () => {
    render(<Home />)
    const bookButton = await screen.findByText('Book')
    expect(bookButton).toBeInTheDocument()

    const returnButton = await screen.findByText('Return')
    expect(returnButton).toBeInTheDocument()

    userEvent.click(bookButton)
    const body = document.getElementsByTagName('body')[0]
    expect(body.classList).toContain('swal2-shown')
  })
})
