/**
 * @file frontend/src/router/ProtectedRoute.jsx
 * @description Route guard that blocks unauthenticated users from protected screens.
 */
import { Navigate } from 'react-router-dom'
import AuthLoading from '../features/auth/components/AuthLoading.jsx'
import useAuth from '../features/auth/hooks/useAuth.js'
export const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth()

  if (loading) {
    return <AuthLoading />
  }

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}