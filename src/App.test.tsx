import React from 'react'
import { render, screen } from '@testing-library/react'
import MyBusinessLogicApp from './App'

test('renders learn react link', () => {
    render(<MyBusinessLogicApp />)
    const linkElement = screen.getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()
})
