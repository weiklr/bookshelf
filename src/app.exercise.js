/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import {useAuth} from './context/auth-context'
// 🐨 import the AuthContext you created in ./context/auth-context
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

/**
 * *LWK NOTES
 * 1. learnt how to create custom hooks and react context to shared states and functions across components.
 *    for e.g. useAuth, AuthProvider, and useClient
 *
 * 2. learnt that React.callback can be used to provide memoizeed function in a API
 *    so that users can safely use it in useEffects as a dependency in other parts of the code
 */

function App() {
  const {user} = useAuth()
  console.log('user is ', user)
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export {App}
