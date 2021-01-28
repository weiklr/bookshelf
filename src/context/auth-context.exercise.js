import React from 'react'
import {useAsync} from 'utils/hooks'
import {queryCache} from 'react-query'
import {FullPageSpinner, FullPageErrorFallback} from 'components/lib'
import * as auth from 'auth-provider'
import {client} from 'utils/api-client'

// 🐨 create and export a React context variable for the AuthContext
const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

async function getUser() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    const data = await client('me', {token})
    user = data.user
  }

  return user
}

const AuthProvider = props => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
    status,
  } = useAsync()

  React.useEffect(() => {
    run(getUser())
  }, [run])

  const login = form => auth.login(form).then(user => setData(user))
  const register = form => auth.register(form).then(user => setData(user))
  const logout = () => {
    auth.logout()
    queryCache.clear()
    setData(null)
  }

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    const value = {user, login, register, logout}
    return <AuthContext.Provider value={value} {...props} />
  }
  throw new Error(`Unhandled status: ${status}`)
}

const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

const useClient = () => {
  const {
    user: {token},
  } = useAuth()
  // use callback to memoize function so that it can be subsequently use in useEffects as a dependency
  return React.useCallback(
    (endpoint, config) => client(endpoint, {...config, token}),
    [token],
  )
}

export {useAuth, AuthContext, AuthProvider, useClient}
// 💰 using React.createContext
