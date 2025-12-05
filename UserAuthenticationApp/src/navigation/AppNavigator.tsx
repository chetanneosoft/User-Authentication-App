import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../constants/colors';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { user, isLoading, isFirstTime } = useAuth();
  const navigationRef = useRef<any>(null);
  const hasNavigatedRef = useRef<boolean>(false);

  // Navigate based on user state changes (only when user state actually changes, not on initial load)
  useEffect(() => {
    // Skip navigation on initial load - let initialRouteName handle it
    if (isLoading || !navigationRef.current) {
      return;
    }

    // Only navigate if user state changes AFTER initial load
    if (!hasNavigatedRef.current) {
      hasNavigatedRef.current = true;
      return; // Let initialRouteName handle the first navigation
    }

    let targetRoute: string;
    
    if (user) {
      // User logged in - navigate to Home
      targetRoute = 'Home';
    } else {
      // User logged out - navigate based on first time
      if (isFirstTime) {
        // First time user - show Signup screen
        targetRoute = 'Signup';
      } else {
        // Returning user - show Login screen
        targetRoute = 'Login';
      }
    }

    // Only navigate if we're not already on the target route
    const currentRoute = navigationRef.current.getCurrentRoute()?.name;
    if (currentRoute !== targetRoute) {
      navigationRef.current.reset({
        index: 0,
        routes: [{ name: targetRoute as any }],
      });
    }
  }, [user, isFirstTime, isLoading]); // Include isLoading to prevent navigation during initial load

  // Show loading screen while checking auth state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Determine initial route
  const getInitialRoute = () => {
    if (user) return 'Home';
    if (isFirstTime) return 'Signup';
    return 'Login';
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={getInitialRoute()}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 300,
        }}>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});

export default AppNavigator;

