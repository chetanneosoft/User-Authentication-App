# Test Cases Documentation

## Overview
This folder contains all test cases for the User Authentication App. Tests are written using Jest and React Native Testing Library.

**Total Test Suites:** 7  
**Total Tests:** 80  
**Test Coverage:** 73.68%

## Test Files Structure

### 1. `validation.test.ts`
Tests for validation functions:
- `validateName()` - Name validation
- `validatePasswordLength()` - Password length validation
- `validateEmail()` - Email validation (currently returns empty)
- `validatePassword()` - Password validation (currently returns empty)
- `validatePasswordForLogin()` - Login password validation (currently returns empty)

**Test Cases:**
- ✅ Empty name validation
- ✅ Whitespace-only name validation
- ✅ Valid name
- ✅ Empty password validation
- ✅ Password less than 8 characters
- ✅ Password exactly 8 characters
- ✅ Password more than 8 characters
- ✅ Email validation (returns empty)
- ✅ Password validation (returns empty)
- ✅ Login password validation (returns empty)

### 2. `AuthContext.test.tsx`
Tests for authentication context (Login, Signup, Logout):
- Signup functionality
- Login functionality
- Logout functionality
- Session persistence
- First-time user detection

**Test Cases:**
- ✅ Successful signup
- ✅ Signup with existing email (error)
- ✅ Email lowercase conversion
- ✅ Successful login with correct credentials
- ✅ Login with wrong email (error)
- ✅ Login with wrong password (error)
- ✅ Case-insensitive email login
- ✅ Successful logout
- ✅ Load user from AsyncStorage on app start
- ✅ First-time user detection
- ✅ Multiple users storage
- ✅ User data persistence after login
- ✅ User data clearing after logout

### 3. `LoginScreen.test.tsx`
Tests for Login Screen component:
- UI rendering
- Input handling
- Password visibility toggle
- Form submission
- Error handling
- Navigation

**Test Cases:**
- ✅ Render login screen correctly
- ✅ Update email input when user types
- ✅ Update password input when user types
- ✅ Toggle password visibility
- ✅ Show loading state during login
- ✅ Handle successful login
- ✅ Handle login error with wrong credentials
- ✅ Clear email error when user starts typing
- ✅ Clear password error when user starts typing
- ✅ Navigate to signup screen when go to signup is pressed
- ✅ Disable login button when loading
- ✅ Preserve email and password fields after error
- ✅ Execute validateForm when login button is pressed
- ✅ Handle successful login flow completely
- ✅ Handle login error completely including animation and alert
- ✅ Test error clearing when email error exists
- ✅ Test error clearing when password error exists

### 4. `SignupScreen.test.tsx`
Tests for Signup Screen component:
- UI rendering
- Input handling
- Password visibility toggle
- Form validation
- Error handling
- Navigation

**Test Cases:**
- ✅ Render signup screen correctly
- ✅ Update name input when user types
- ✅ Update email input when user types
- ✅ Update password input when user types
- ✅ Toggle password visibility
- ✅ Show error when name is empty
- ✅ Allow signup with any password length
- ✅ Handle successful signup
- ✅ Handle signup error when email already exists
- ✅ Clear name error when user starts typing
- ✅ Clear email error when user starts typing
- ✅ Clear password error when user starts typing
- ✅ Navigate to login screen when go to login is pressed
- ✅ Disable signup button when loading
- ✅ Show error message when signup fails
- ✅ Test validateForm function execution
- ✅ Handle successful signup flow completely
- ✅ Handle signup error completely
- ✅ Test error clearing when name error exists
- ✅ Test error clearing when email error exists
- ✅ Test error clearing when password error exists

### 5. `HomeScreen.test.tsx`
Tests for Home Screen component:
- UI rendering
- User data display
- Logout functionality
- Loading states

**Test Cases:**
- ✅ Render home screen correctly with user data
- ✅ Display N/A when user data is not available
- ✅ Handle logout button press
- ✅ Show loading state during logout
- ✅ Disable logout button when isLoading is true

### 6. `AppNavigator.test.tsx`
Tests for App Navigator:
- Navigation logic
- Route determination
- Loading states
- User state-based navigation

**Test Cases:**
- ✅ Show loading indicator when isLoading is true
- ✅ Navigate to Home screen when user is logged in
- ✅ Navigate to Signup screen when isFirstTime is true
- ✅ Navigate to Login screen when user is not logged in and not first time
- ✅ Determine correct initial route when user is logged in
- ✅ Determine correct initial route when isFirstTime is true
- ✅ Handle navigation when isLoading is false and navigationRef exists
- ✅ Handle getInitialRoute function for different states

### 7. `App.test.tsx`
Tests for App component:
- App rendering

**Test Cases:**
- ✅ Renders without crashing

## Running Tests

### Run all tests:
```bash
npm test
```

### Run specific test file:
```bash
npm test validation.test.ts
npm test AuthContext.test.tsx
```

### Run tests in watch mode:
```bash
npm test -- --watch
```

### Run tests with coverage:
```bash
npm test -- --coverage
```

## Test Coverage

**Overall Coverage: 73.68%**
- **Statements:** 73.68%
- **Branch:** 72%
- **Functions:** 75%
- **Lines:** 73.45%

### File-wise Coverage:
- ✅ `CustomTextInput` - **100%**
- ✅ `constants` - **100%**
- ✅ `AuthContext` - **97.01%** (> 80%)
- ✅ `HomeScreen` - **84.61%** (> 80%)
- ✅ `validation.ts` - **81.25%** (> 80%)
- ⚠️ `AppNavigator` - **72.41%**
- ⚠️ `LoginScreen` - **51.85%**
- ⚠️ `SignupScreen` - **56.81%**

The test cases cover:
1. **Validation Logic** - All validation functions
2. **Authentication Flow** - Login, Signup, Logout
3. **Session Management** - AsyncStorage persistence
4. **UI Components** - Screen rendering and interactions
5. **Error Handling** - Invalid inputs and error messages
6. **Navigation** - Route determination and navigation logic
7. **State Management** - Context API and state updates
8. **User Experience** - Loading states, error clearing, field preservation

## Dependencies

- `jest` - Testing framework
- `@testing-library/react-native` - React Native testing utilities
- `react-test-renderer` - Component rendering for tests
- `@react-native-async-storage/async-storage` - Mocked for testing

## Notes

- All AsyncStorage calls are mocked in tests
- Navigation is mocked using NavigationContainer wrapper
- Tests use `act()` and `waitFor()` for async operations
- Test files follow the naming convention: `*.test.ts` or `*.test.tsx`

