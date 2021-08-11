import './App.css'
import Message from './components/Message'

function App () {
  const sender = 'Kram Toille Grebrekcuz'
  const message = 'Hello from Message component!'
  const props = {from: sender, text: message}

  return (
    <div className="App">
      <Message {...props}/>
    </div>
  )
}

export default App
