/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import {useAuth} from './context/auth-context'
// 🐨 import the AuthContext you created in ./context/auth-context
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

function App() {
  const {user} = useAuth()
  console.log('user is ', user)
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export {App}
