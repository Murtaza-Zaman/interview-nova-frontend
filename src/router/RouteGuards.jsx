/**
 * @file frontend/src/router/RouteGuards.jsx
 * @description Guard utilities/components for authenticated vs guest-only route access.
 */
import { Navigate } from 'react-router-dom'
import AuthLoading from '../features/auth/components/AuthLoading.jsx'
import useAuth from '../features/auth/hooks/useAuth.js'



// GuestRoute is a component that checks if the user is authenticated. If they are, it redirects them to the home page. If they are not, it renders the children components (which would be the login or register page).
export const GuestRoute = ({ children }) => {
    // children is the component that will be rendered if the user is not authenticated
  const { token, loading } = useAuth()

  if (loading) {
    return <AuthLoading />
  }

  if (token) {
    // If the user is authenticated, redirect them to the home page
    return <Navigate to="/" replace />
  }

  return children
}
