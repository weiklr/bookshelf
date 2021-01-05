// 🐨 you'll need to import React and ReactDOM up here
import Dialog from '@reach/dialog'
import React, {useState} from 'react'
import ReactDOM from 'react-dom'
// 🐨 you'll also need to import the Logo component from './components/logo'
import {Logo} from './components/logo'
import '@reach/dialog/styles.css'

// 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
const App = () => {
  const [showModal, setShowModal] = useState('none')

  const close = () => setShowModal('none')

  return (
    <div>
      <Logo height="80" width="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setShowModal('login')}>login</button>
      </div>
      <div>
        <button onClick={() => setShowModal('register')}>register</button>
      </div>
      <Dialog isOpen={showModal === 'login'} aria-label="Login form">
        <button onClick={close}>close</button>
        <h3>Login</h3>
      </Dialog>
      <Dialog isOpen={showModal === 'register'} aria-label="Registration form">
        <button onClick={close}>close</button>
        <h3>Registration</h3>
      </Dialog>
    </div>
  )
}
// 🐨 for fun, you can add event handlers for both buttons to alert that the button was clicked

// 🐨 use ReactDOM to render the <App /> to the root element
// 💰 find the root element with: document.getElementById('root')
ReactDOM.render(<App />, document.getElementById('root'))
