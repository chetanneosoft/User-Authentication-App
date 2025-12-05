import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  name: string;
  email: string;
};

const USER_STORAGE_KEY = '@user_data';
const USERS_STORAGE_KEY = '@users_list';

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isFirstTime: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);

  // Load user from AsyncStorage on app start
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const loadUserFromStorage = async () => {
    try {
      // Check if any users exist (to determine if first time)
      const usersData = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      const hasUsers = usersData && JSON.parse(usersData).length > 0;
      setIsFirstTime(!hasUsers);

      // Load logged in user
      const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    } catch (error) {
      // Error loading user from storage - silently fail
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Get stored users
      const usersData = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      const users = usersData ? JSON.parse(usersData) : [];

      // Find user with matching email and password
      const foundUser = users.find(
        (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!foundUser) {
        setIsLoading(false);
        throw new Error('Invalid email or password');
      }

      // Set user data
      const userData = {
        name: foundUser.name,
        email: foundUser.email,
      };

      setUser(userData);
      
      // Save to AsyncStorage
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Get stored users
      const usersData = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      const users = usersData ? JSON.parse(usersData) : [];

      // Check if user already exists
      const existingUser = users.find(
        (u: any) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const newUser = {
        name,
        email: email.toLowerCase(),
        password,
      };

      // Add to users list
      users.push(newUser);
      await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

      // Set user data
      const userData = {
        name: newUser.name,
        email: newUser.email,
      };

      setUser(userData);
      setIsFirstTime(false); // After first signup, no longer first time
      
      // Save to AsyncStorage
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Clear user data
      setUser(null);
      
      // Remove from AsyncStorage
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isLoading,
    isFirstTime,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

