/**
 * @file frontend/src/features/auth/validation/register.validation.js
 * @description Client-side validation schema for registration form values.
 */
import Joi from 'joi'

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Username is required',
    'string.min': 'Username must be at least 3 characters',
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please enter a valid email',
  }),
  password: Joi.string().min(3).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 3 characters',
  }),
})
