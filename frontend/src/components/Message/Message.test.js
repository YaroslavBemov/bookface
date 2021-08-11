import { act, render, screen } from '@testing-library/react'
import Message from './Message'
import { unmountComponentAtNode } from 'react-dom'

let container = null
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

test('renders Message component without crashing', () => {
  act(() => {
    render(<Message/>, container)
  })
})

test('renders message without props', () => {
  act(() => {
    render(<Message/>, container)
  })
  expect(screen.getByText('Anonymous')).toBeInTheDocument()
  expect(screen.getByText('No message')).toBeInTheDocument()
})

test('renders message from props', () => {
  act(() => {
    const sender = 'Kram Toille Grebrekcuz'
    const message = 'Hello from Message component!'
    const props = { from: sender, text: message }

    render(<Message {...props}/>, container)
  })
  expect(screen.getByText('Kram Toille Grebrekcuz')).toBeInTheDocument()
  expect(screen.getByText('Hello from Message component!')).toBeInTheDocument()
})
