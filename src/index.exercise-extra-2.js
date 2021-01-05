// 🐨 you'll need to import React and ReactDOM up here
import Dialog from '@reach/dialog'
import React, {useState} from 'react'
import ReactDOM from 'react-dom'
// 🐨 you'll also need to import the Logo component from './components/logo'
import {Logo} from './components/logo'
import '@reach/dialog/styles.css'

/***
 * *LWK NOTES
 * 1. The LoginForm's responsiblity is to render the fields and handle submission.
 * 2. There is an inverse  It exposes a callback prop onSubmit to
 */

// 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
const App = () => {
  const [showModal, setShowModal] = useState('none')

  const close = () => setShowModal('none')

  const login = formData => console.log('login:', formData)

  const register = formData => console.log('register', formData)

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
        <LoginForm onSubmit={login} buttonLabel={'login'} />
      </Dialog>
      <Dialog isOpen={showModal === 'register'} aria-label="Registration form">
        <button onClick={close}>close</button>
        <h3>Registration</h3>
        <LoginForm onSubmit={register} buttonLabel={'register'} />
      </Dialog>
    </div>
  )
}

const LoginForm = props => {
  const {onSubmit, buttonLabel} = props

  // uncontrolled components?
  const handleSubmit = event => {
    event.preventDefault()
    const {username, password} = event.target.elements
    onSubmit({
      username: username.value,
      password: password.value,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label for="username">username</label>
        <input id="username" />
      </div>
      <div>
        <label for="password">password</label>
        <input id="password" type="password" />
      </div>
      <div>
        <button type="submit">{buttonLabel}</button>
      </div>
    </form>
  )
}
// 🐨 for fun, you can add event handlers for both buttons to alert that the button was clicked

// 🐨 use ReactDOM to render the <App /> to the root element
// 💰 find the root element with: document.getElementById('root')
ReactDOM.render(<App />, document.getElementById('root'))
