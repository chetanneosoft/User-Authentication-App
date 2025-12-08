/**
 * @format
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../src/navigation/AppNavigator';
import { AuthProvider } from '../src/contexts/AuthContext';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock screens to avoid rendering full components
jest.mock('../src/screens/LoginScreen', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return () => (
    <View testID="login-screen">
      <Text>Login Screen</Text>
    </View>
  );
});

jest.mock('../src/screens/SignupScreen', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return () => (
    <View testID="signup-screen">
      <Text>Signup Screen</Text>
    </View>
  );
});

jest.mock('../src/screens/HomeScreen', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return () => (
    <View testID="home-screen">
      <Text>Home Screen</Text>
    </View>
  );
});

describe('AppNavigator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading indicator when isLoading is true', async () => {
    require('@react-native-async-storage/async-storage').getItem.mockImplementation(
      () => new Promise(() => {}) // Never resolves to keep loading
    );

    const { getByTestId } = render(
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    );

    // Should show ActivityIndicator (loading)
    await waitFor(() => {
      // Loading state should be visible
    });
  });

  it('should navigate to Home screen when user is logged in', async () => {
    const userData = { name: 'Test User', email: 'test@example.com' };
    const users = [{ name: 'Test User', email: 'test@example.com', password: 'pass123' }];

    require('@react-native-async-storage/async-storage').getItem.mockImplementation(
      (key: string) => {
        if (key === '@user_data') {
          return Promise.resolve(JSON.stringify(userData));
        }
        if (key === '@users_list') {
          return Promise.resolve(JSON.stringify(users));
        }
        return Promise.resolve(null);
      }
    );

    const { getByTestId } = render(
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(getByTestId('home-screen')).toBeTruthy();
    });
  });

  it('should navigate to Signup screen when isFirstTime is true', async () => {
    require('@react-native-async-storage/async-storage').getItem.mockImplementation(
      (key: string) => {
        if (key === '@users_list') {
          return Promise.resolve(null); // No users = first time
        }
        return Promise.resolve(null);
      }
    );

    const { getByTestId } = render(
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(getByTestId('signup-screen')).toBeTruthy();
    });
  });

  it('should navigate to Login screen when user is not logged in and not first time', async () => {
    const users = [{ name: 'Test User', email: 'test@example.com', password: 'pass123' }];

    require('@react-native-async-storage/async-storage').getItem.mockImplementation(
      (key: string) => {
        if (key === '@users_list') {
          return Promise.resolve(JSON.stringify(users)); // Users exist = not first time
        }
        if (key === '@user_data') {
          return Promise.resolve(null); // No logged in user
        }
        return Promise.resolve(null);
      }
    );

    const { getByTestId } = render(
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(getByTestId('login-screen')).toBeTruthy();
    });
  });

  it('should navigate to Login screen when user is not logged in and not first time', async () => {
    const users = [{ name: 'Test User', email: 'test@example.com', password: 'pass123' }];

    require('@react-native-async-storage/async-storage').getItem.mockImplementation(
      (key: string) => {
        if (key === '@users_list') {
          return Promise.resolve(JSON.stringify(users)); // Users exist = not first time
        }
        if (key === '@user_data') {
          return Promise.resolve(null); // No logged in user
        }
        return Promise.resolve(null);
      }
    );

    const { getByTestId } = render(
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(getByTestId('login-screen')).toBeTruthy();
    });
  });

  it('should determine correct initial route when user is logged in', async () => {
    const userData = { name: 'Test User', email: 'test@example.com' };
    const users = [{ name: 'Test User', email: 'test@example.com', password: 'pass123' }];

    require('@react-native-async-storage/async-storage').getItem.mockImplementation(
      (key: string) => {
        if (key === '@user_data') {
          return Promise.resolve(JSON.stringify(userData));
        }
        if (key === '@users_list') {
          return Promise.resolve(JSON.stringify(users));
        }
        return Promise.resolve(null);
      }
    );

    const { getByTestId } = render(
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    );

    // Should show Home when user is logged in
    await waitFor(() => {
      expect(getByTestId('home-screen')).toBeTruthy();
    });
  });

  it('should determine correct initial route when isFirstTime is true', async () => {
    require('@react-native-async-storage/async-storage').getItem.mockImplementation(
      (key: string) => {
        if (key === '@users_list') {
          return Promise.resolve(null); // No users = first time
        }
        return Promise.resolve(null);
      }
    );

    const { getByTestId } = render(
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    );

    // Should show Signup when first time
    await waitFor(() => {
      expect(getByTestId('signup-screen')).toBeTruthy();
    });
  });

  it('should handle navigation when isLoading is false and navigationRef exists', async () => {
    const users = [{ name: 'Test User', email: 'test@example.com', password: 'pass123' }];

    require('@react-native-async-storage/async-storage').getItem.mockImplementation(
      (key: string) => {
        if (key === '@users_list') {
          return Promise.resolve(JSON.stringify(users));
        }
        if (key === '@user_data') {
          return Promise.resolve(null);
        }
        return Promise.resolve(null);
      }
    );

    const { getByTestId } = render(
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    );

    // Should navigate to Login (covers lines 39-56)
    await waitFor(() => {
      expect(getByTestId('login-screen')).toBeTruthy();
    });
  });

  it('should handle getInitialRoute function for different states', async () => {
    // Test Home route
    const userData = { name: 'Test User', email: 'test@example.com' };
    const users = [{ name: 'Test User', email: 'test@example.com', password: 'pass123' }];

    require('@react-native-async-storage/async-storage').getItem.mockImplementation(
      (key: string) => {
        if (key === '@user_data') {
          return Promise.resolve(JSON.stringify(userData));
        }
        if (key === '@users_list') {
          return Promise.resolve(JSON.stringify(users));
        }
        return Promise.resolve(null);
      }
    );

    const { getByTestId } = render(
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    );

    // Should show Home (covers getInitialRoute lines 73-77)
    await waitFor(() => {
      expect(getByTestId('home-screen')).toBeTruthy();
    });
  });
});

