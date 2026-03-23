/**
 * @file frontend/src/features/auth/api/auth.api.js
 * @description HTTP API adapters for authentication endpoints.
 */
import axiosInstance from '../../../services/axios'

const unwrapResponse = (response) => {
  const payload = response?.data || {}
  return {
    ...(payload?.data || {}),
    success: payload?.success,
    message: payload?.message,
    meta: payload?.meta,
  }
}

export const loginRequest = async (payload) => {
  const response = await axiosInstance.post('/auth/login', payload)
  return unwrapResponse(response)
}

export const registerRequest = async (payload) => {
  const response = await axiosInstance.post('/auth/register', payload)
  return unwrapResponse(response)
}

export const logoutRequest = async () => {
  const response = await axiosInstance.post('/auth/logout')
  return unwrapResponse(response)
}

export const getMeRequest = async () => {
  const response = await axiosInstance.get('/auth/get-me')
  return unwrapResponse(response)
}
