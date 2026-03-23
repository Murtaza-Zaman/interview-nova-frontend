/**
 * @file frontend/src/features/auth/hooks/useAuth.js
 * @description Convenience hook exposing auth state and actions from context.
 */
import { useAuthContext } from './useAuthContext.js'

export default function useAuth() {
  const { user, loading, setUser, logout } = useAuthContext()
  const token = user?.token

  return { user, loading, setUser, logout, token }
}
