// 🐨 you'll need to import React and ReactDOM up here
import React from 'react'
import ReactDOM from 'react-dom'
// 🐨 you'll also need to import the Logo component from './components/logo'
import {Logo} from './components/logo'

// 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
const App = () => {
  return (
    <div>
      <Logo />
      <h1>Bookshelf</h1>
      <button onClick={() => alert('login clicked!')}>login</button>
      <button onClick={() => alert('register clicked!')}>register</button>
    </div>
  )
}
// 🐨 for fun, you can add event handlers for both buttons to alert that the button was clicked

// 🐨 use ReactDOM to render the <App /> to the root element
// 💰 find the root element with: document.getElementById('root')
ReactDOM.render(<App />, document.getElementById('root'))
