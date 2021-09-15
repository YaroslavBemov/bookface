import { act, render } from '@testing-library/react'
import MessageItem from './MessageList'
import { unmountComponentAtNode } from 'react-dom'

let container = null
beforeEach(() => {
  window.HTMLElement.prototype.scrollIntoView = function() {};
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
    render(<MessageItem/>, container)
  })
})
