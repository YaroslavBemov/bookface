import { act, render } from '@testing-library/react'
import MessageList from './MessageList'
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

test('renders MessageList component without crashing', () => {
  act(() => {
    render(<MessageList/>, container)
  })
})
