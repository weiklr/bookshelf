/** @jsx jsx */
import {jsx} from '@emotion/core'

import React, {useEffect, useState} from 'react'
// 🐨 you're going to need this:
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import {client} from 'utils/api-client'

function App() {
  // 🐨 useState for the user
  const [user, setUser] = useState(null)

  // 🐨 create a login function that calls auth.login then sets the user
  const login = form => auth.login(form).then(u => setUser(u))
  // 💰 const login = form => auth.login(form).then(u => setUser(u))
  // 🐨 create a registration function that does the same as login except for register
  const register = form => auth.register(form).then(u => setUser(u))
  // 🐨 create a logout function that calls auth.logout() and sets the user to null

  const logout = () => {
    auth.logout().then(setUser(null))
  }

  useEffect(() => {
    const getUser = async () => {
      const token = await auth.getToken()
      if (token) {
        const {user} = await client('me', {token})
        setUser(user)
      } else {
        setUser(null)
      }
    }
    getUser()
  }, [])

  // 🐨 if there's a user, then render the AuthenticatedApp with the user and logout
  if (user) {
    return <AuthenticatedApp user={user} logout={logout} />
  }
  // 🐨 if there's not a user, then render the UnauthenticatedApp with login and register

  return <UnauthenticatedApp login={login} register={register} />
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
