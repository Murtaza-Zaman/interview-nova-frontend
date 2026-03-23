/**
 * @file frontend/src/features/auth/hooks/useAuthContext.js
 * @description Low-level hook for strict AuthContext consumption with provider checks.
 */
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }

  return context
}
