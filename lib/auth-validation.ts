import * as yup from 'yup';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

// Email validation schema
export const emailSchema = yup.string()
  .email('Please enter a valid email address')
  .required('Email is required');

// Password validation schema
export const passwordSchema = yup.string()
  .min(8, 'Password must be at least 8 characters')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[0-9]/, 'Password must contain at least one digit')
  .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
  .required('Password is required');

// Phone validation schema
export const phoneSchema = yup.string()
  .test('phone', 'Please enter a valid phone number', function(value) {
    if (!value) return false;
    try {
      return isValidPhoneNumber(value);
    } catch {
      return false;
    }
  })
  .required('Phone number is required');

// Name validation schema
export const nameSchema = yup.string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
  .required('Name is required');

// OTP validation schema
export const otpSchema = yup.string()
  .matches(/^\d{4}$/, 'OTP must be exactly 4 digits')
  .required('OTP is required');

// Signup form validation schema
export const signupSchema = yup.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  password: passwordSchema,
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password')
});

// Login form validation schema
export const loginSchema = yup.object({
  email: emailSchema,
  password: yup.string().required('Password is required')
});

// Phone login validation schema
export const phoneLoginSchema = yup.object({
  phone: phoneSchema
});

// OTP verification schema
export const otpVerificationSchema = yup.object({
  otp: otpSchema
});

// Utility function to format phone number
export const formatPhoneNumber = (phone: string): string => {
  try {
    const phoneNumber = parsePhoneNumber(phone);
    return phoneNumber.format('E.164');
  } catch {
    return phone;
  }
};

// Utility function to get phone number display format
export const getPhoneDisplayFormat = (phone: string): string => {
  try {
    const phoneNumber = parsePhoneNumber(phone);
    return phoneNumber.formatInternational();
  } catch {
    return phone;
  }
};