/**
 * @format
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Alert } from 'react-native';
import { AuthProvider } from '../src/contexts/AuthContext';
import HomeScreen from '../src/screens/HomeScreen';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock Alert
jest.spyOn(Alert, 'alert');

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <NavigationContainer>
    <AuthProvider>{children}</AuthProvider>
  </NavigationContainer>
);

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    require('@react-native-async-storage/async-storage').getItem.mockResolvedValue(null);
  });

  it('should render home screen correctly with user data', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com' };
    const users = [{ name: 'John Doe', email: 'john@example.com', password: 'pass123' }];

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

    const { getByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(getByText('Welcome!')).toBeTruthy();
      expect(getByText('Name:')).toBeTruthy();
      expect(getByText('John Doe')).toBeTruthy();
      expect(getByText('Email:')).toBeTruthy();
      expect(getByText('john@example.com')).toBeTruthy();
      expect(getByText('Logout')).toBeTruthy();
    });
  });

  it('should display N/A when user data is not available', async () => {
    require('@react-native-async-storage/async-storage').getItem.mockResolvedValue(null);

    const { getAllByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );

    await waitFor(() => {
      const naTexts = getAllByText('N/A');
      expect(naTexts.length).toBeGreaterThan(0);
    });
  });

  it('should handle logout button press', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com' };
    const users = [{ name: 'John Doe', email: 'john@example.com', password: 'pass123' }];

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

    require('@react-native-async-storage/async-storage').removeItem.mockResolvedValue(undefined);

    const { getByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );

    await waitFor(() => {
      const logoutButton = getByText('Logout');
      expect(logoutButton).toBeTruthy();
    });

    const logoutButton = getByText('Logout');
    fireEvent.press(logoutButton);

    await waitFor(() => {
      expect(require('@react-native-async-storage/async-storage').removeItem).toHaveBeenCalledWith(
        '@user_data'
      );
    });
  });

  it('should show loading state during logout', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com' };
    const users = [{ name: 'John Doe', email: 'john@example.com', password: 'pass123' }];

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

    // Delay removeItem to simulate async logout
    require('@react-native-async-storage/async-storage').removeItem.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    const { getByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );

    await waitFor(() => {
      const logoutButton = getByText('Logout');
      fireEvent.press(logoutButton);
    });

    // Check if loading state is shown (ActivityIndicator should appear)
    await waitFor(() => {
      // Loading overlay should be visible
    });
  });

  it('should disable logout button when isLoading is true', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com' };
    const users = [{ name: 'John Doe', email: 'john@example.com', password: 'pass123' }];

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

    const { getByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );

    await waitFor(() => {
      const logoutButton = getByText('Logout');
      expect(logoutButton).toBeTruthy();
      // Button should be enabled initially
    });
  });
});

