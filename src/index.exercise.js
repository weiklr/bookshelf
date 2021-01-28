// 🐨 you don't need to do anything for the exercise, but there's an extra credit!
import * as React from 'react'
import ReactDOM from 'react-dom'
import {loadDevTools} from './dev-tools/load'
import './bootstrap'
import {App} from './app'
import {AppProviders} from 'context'

loadDevTools(() => {
  ReactDOM.render(
    <AppProviders>
      <App />
    </AppProviders>,
    document.getElementById('root'),
  )
})
