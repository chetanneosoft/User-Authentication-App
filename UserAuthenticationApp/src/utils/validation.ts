import { appStrings } from '../constants/appStrings';

export const validateEmail = (email: string): string => {
  // Validation removed - no validation for email
  return '';
};

export const validatePassword = (password: string): string => {
  // Validation removed - no validation for password
  return '';
};

export const validatePasswordLength = (password: string): string => {
  if (!password || password.trim() === '') {
    return appStrings.errors.passwordRequired;
  }
  if (password.length < 8) {
    return appStrings.errors.passwordMinLength;
  }
  return '';
};

export const validatePasswordForLogin = (password: string): string => {
  // Validation removed - no validation for password
  return '';
};

export const validateName = (name: string): string => {
  if (!name || name.trim() === '') {
    return appStrings.errors.nameRequired;
  }
  return '';
};

