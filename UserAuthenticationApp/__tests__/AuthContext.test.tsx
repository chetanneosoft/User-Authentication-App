/**
 * @format
 */

import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider, useAuth } from '../src/contexts/AuthContext';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
    (AsyncStorage.removeItem as jest.Mock).mockResolvedValue(undefined);
  });

  describe('Signup', () => {
    it('should successfully signup a new user', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await result.current.signup('John Doe', 'john@example.com', 'Password123!');
      });

      await waitFor(() => {
        expect(result.current.user).toEqual({
          name: 'John Doe',
          email: 'john@example.com',
        });
      });

      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });

    it('should throw error if user already exists', async () => {
      const existingUsers = [
        { name: 'Existing User', email: 'john@example.com', password: 'Password123!' },
      ];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(existingUsers));

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await expect(
          result.current.signup('John Doe', 'john@example.com', 'Password123!')
        ).rejects.toThrow('User with this email already exists');
      });
    });

    it('should convert email to lowercase during signup', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await result.current.signup('John Doe', 'JOHN@EXAMPLE.COM', 'Password123!');
      });

      await waitFor(() => {
        expect(result.current.user?.email).toBe('john@example.com');
      });
    });
  });

  describe('Login', () => {
    it('should successfully login with correct credentials', async () => {
      const users = [
        { name: 'John Doe', email: 'john@example.com', password: 'Password123!' },
      ];
      (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
        if (key === '@users_list') {
          return Promise.resolve(JSON.stringify(users));
        }
        return Promise.resolve(null);
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await result.current.login('john@example.com', 'Password123!');
      });

      await waitFor(() => {
        expect(result.current.user).toEqual({
          name: 'John Doe',
          email: 'john@example.com',
        });
      });
    });

    it('should throw error with wrong email', async () => {
      const users = [
        { name: 'John Doe', email: 'john@example.com', password: 'Password123!' },
      ];
      (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
        if (key === '@users_list') {
          return Promise.resolve(JSON.stringify(users));
        }
        return Promise.resolve(null);
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await expect(
          result.current.login('wrong@example.com', 'Password123!')
        ).rejects.toThrow('Invalid email or password');
      });
    });

    it('should throw error with wrong password', async () => {
      const users = [
        { name: 'John Doe', email: 'john@example.com', password: 'Password123!' },
      ];
      (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
        if (key === '@users_list') {
          return Promise.resolve(JSON.stringify(users));
        }
        return Promise.resolve(null);
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await expect(
          result.current.login('john@example.com', 'WrongPassword!')
        ).rejects.toThrow('Invalid email or password');
      });
    });

    it('should login with case-insensitive email', async () => {
      const users = [
        { name: 'John Doe', email: 'john@example.com', password: 'Password123!' },
      ];
      (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
        if (key === '@users_list') {
          return Promise.resolve(JSON.stringify(users));
        }
        return Promise.resolve(null);
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await result.current.login('JOHN@EXAMPLE.COM', 'Password123!');
      });

      await waitFor(() => {
        expect(result.current.user).toBeTruthy();
      });
    });
  });

  describe('Logout', () => {
    it('should successfully logout user', async () => {
      const users = [
        { name: 'John Doe', email: 'john@example.com', password: 'Password123!' },
      ];
      (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
        if (key === '@users_list') {
          return Promise.resolve(JSON.stringify(users));
        }
        return Promise.resolve(null);
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      // Login first
      await act(async () => {
        await result.current.login('john@example.com', 'Password123!');
      });

      await waitFor(() => {
        expect(result.current.user).toBeTruthy();
      });

      // Logout
      await act(async () => {
        await result.current.logout();
      });

      await waitFor(() => {
        expect(result.current.user).toBeNull();
      });

      expect(AsyncStorage.removeItem).toHaveBeenCalled();
    });
  });

  describe('Session Persistence', () => {
    it('should load user from AsyncStorage on app start', async () => {
      const userData = { name: 'John Doe', email: 'john@example.com' };
      (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
        if (key === '@user_data') {
          return Promise.resolve(JSON.stringify(userData));
        }
        if (key === '@users_list') {
          return Promise.resolve(JSON.stringify([{ ...userData, password: 'Password123!' }]));
        }
        return Promise.resolve(null);
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.user).toEqual(userData);
    });

    it('should set isFirstTime to false if users exist', async () => {
      const users = [
        { name: 'John Doe', email: 'john@example.com', password: 'Password123!' },
      ];
      (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
        if (key === '@users_list') {
          return Promise.resolve(JSON.stringify(users));
        }
        return Promise.resolve(null);
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isFirstTime).toBe(false);
      });
    });

    it('should set isFirstTime to true if no users exist', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isFirstTime).toBe(true);
      });
    });
  });
});

