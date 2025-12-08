/**
 * @format
 */

import {
  validateName,
  validatePasswordLength,
} from '../src/utils/validation';
import { appStrings } from '../src/constants/appStrings';

describe('Validation Functions', () => {
  describe('validateName', () => {
    it('should return error when name is empty', () => {
      const result = validateName('');
      expect(result).toBe(appStrings.errors.nameRequired);
    });

    it('should return error when name is only whitespace', () => {
      const result = validateName('   ');
      expect(result).toBe(appStrings.errors.nameRequired);
    });

    it('should return empty string when name is valid', () => {
      const result = validateName('John Doe');
      expect(result).toBe('');
    });

    it('should return empty string when name has valid characters', () => {
      const result = validateName('Test User 123');
      expect(result).toBe('');
    });
  });

  describe('validatePasswordLength', () => {
    it('should return error when password is empty', () => {
      const result = validatePasswordLength('');
      expect(result).toBe(appStrings.errors.passwordRequired);
    });

    it('should return error when password is only whitespace', () => {
      const result = validatePasswordLength('   ');
      expect(result).toBe(appStrings.errors.passwordRequired);
    });

    it('should return error when password is less than 8 characters', () => {
      const result = validatePasswordLength('Pass1!');
      expect(result).toBe(appStrings.errors.passwordMinLength);
    });

    it('should return error when password is exactly 7 characters', () => {
      const result = validatePasswordLength('Pass1!@');
      expect(result).toBe(appStrings.errors.passwordMinLength);
    });

    it('should return empty string when password is exactly 8 characters', () => {
      const result = validatePasswordLength('Password');
      expect(result).toBe('');
    });

    it('should return empty string when password is more than 8 characters', () => {
      const result = validatePasswordLength('Password123!');
      expect(result).toBe('');
    });
  });
});

