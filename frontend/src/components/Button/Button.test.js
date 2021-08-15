import { act, render } from '@testing-library/react'
import Button from './Button'
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

test('renders Button component without crashing', () => {
  act(() => {
    render(<Button/>, container)
  })
})
