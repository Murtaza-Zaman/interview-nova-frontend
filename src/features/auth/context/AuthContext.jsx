/**
 * @file frontend/src/features/auth/context/AuthContext.jsx
 * @description React auth context provider, state, and public auth actions.
 */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useMemo, useState, useEffect } from 'react'

export const AuthContext = createContext(null)

const AUTH_USER_KEY = 'auth_user'
const TOKEN_KEY = 'token'
const INTERVIEW_REPORT_STORAGE_PREFIX = 'latest_interview_report:'

const readPersistedUser = () => {
  const persistedUser = localStorage.getItem(AUTH_USER_KEY)
  if (persistedUser) {
    try {
      return JSON.parse(persistedUser)
    } catch {
      localStorage.removeItem(AUTH_USER_KEY)
    }
  }

  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    return { token, username: '', email: '' }
  }

  return null
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readPersistedUser)
  const [loading] = useState(false)

  useEffect(() => {
    if (!user) {
      localStorage.removeItem(AUTH_USER_KEY)
      localStorage.removeItem(TOKEN_KEY)
      return
    }

    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
    if (user.token) {
      localStorage.setItem(TOKEN_KEY, user.token)
    } else {
      localStorage.removeItem(TOKEN_KEY)
    }
  }, [user])

  const logout = useCallback(() => {
    setUser(null)
    Object.keys(sessionStorage).forEach((key) => {
      if (key === 'latest_interview_report' || key.startsWith(INTERVIEW_REPORT_STORAGE_PREFIX)) {
        sessionStorage.removeItem(key)
      }
    })
  }, [])

  const contextValue = useMemo(() => {
    return {
      user,
      loading,
      setUser,
      logout,
    }
  }, [user, loading, logout])

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}
