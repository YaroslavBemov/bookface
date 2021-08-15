import { act, render } from '@testing-library/react'
import InputText from './InputText'
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

test('renders InputText component without crashing', () => {
  act(() => {
    render(<InputText/>, container)
  })
})
