import React from 'react'
import {ReactQueryConfigProvider} from 'react-query'
import {AuthProvider} from 'context/auth-context'
import {BrowserRouter as Router} from 'react-router-dom'

const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchAllOnWindowFocus: false,
    retry(failureCount, error) {
      if (error.status === 404) return false
      else if (failureCount < 2) return true
      else return false
    },
  },
}

const AppProviders = props => {
  const {children} = props
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router>
        <AuthProvider>{children}</AuthProvider>
      </Router>
    </ReactQueryConfigProvider>
  )
}

export {AppProviders}

// this module doesn't do anything for the exercise. But you'll use this for
// the extra credit!
