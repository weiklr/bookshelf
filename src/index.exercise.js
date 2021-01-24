import {loadDevTools} from './dev-tools/load'
import './bootstrap'
import * as React from 'react'
import ReactDOM from 'react-dom'
import {App} from './app'
import {ReactQueryConfigProvider} from 'react-query'

const queryConfig = {
  queries: {
    refetchOnWindowFocus: true,
    useErrorBoundary: true,
    retry(failureCount, error) {
      if (error.status === 404) {
        return false
      } else if (failureCount < 2) return true
      else return false
    },
  },
}

loadDevTools(() => {
  ReactDOM.render(
    <ReactQueryConfigProvider config={queryConfig}>
      <App />
    </ReactQueryConfigProvider>,
    document.getElementById('root'),
  )
})
