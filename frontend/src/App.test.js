import { act, render } from '@testing-library/react'
import App from './App'
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

test('renders App component without crashing', () => {
  act(() => {
    render(<App/>, container)
  })
})
