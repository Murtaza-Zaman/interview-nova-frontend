/**
 * @file frontend/src/features/auth/validation/login.validation.js
 * @description Client-side validation schema for login form values.
 */
import Joi from 'joi'

export const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please enter a valid email',
  }),
  password: Joi.string().min(3).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 3 characters',
  }),
})
