# User-Authentication-App

A React Native mobile application with complete user authentication functionality including Login, Signup, and Home screens. Built with React Context API for state management and AsyncStorage for data persistence.

## 📦 Downloads

### Release APK
The release APK file is available in the `Attatchments` folder:
- **Location:** `UserAuthenticationApp/Attatchments/UserAuthenticationApp-release.apk`
- **Installation:** Download and install directly on Android devices

### Demo Video
A demo video showcasing the app functionality is available:
- **Location:** `UserAuthenticationApp/Attatchments/Recording_UserAuthenticationApp.mp4`
- **Content:** App walkthrough and feature demonstration

## 📱 Features

### ✅ Authentication Features
- **User Login** - Secure login with email and password
- **User Signup** - New user registration with validation
- **User Logout** - Secure logout functionality
- **Session Persistence** - User remains logged in after app restart
- **First-time User Flow** - Direct navigation to Signup for new users

### ✅ Form Validation
- **Email Validation**
  - Required field validation
  - Email format validation
  - Domain must be lowercase (e.g., @gmail.com)
  - Special characters rejection (#, (, ), etc.)
  - Automatic space removal
- **Password Validation**
  - Minimum 8 characters
  - At least one capital letter (A-Z)
  - At least one lowercase letter (a-z)
  - At least one symbol (!@#$%^&*()_+-=[]{};':"\\|,.<>/?)
  - Real-time password hints with visual feedback
- **Name Validation**
  - Required field validation

### ✅ User Experience
- **Loading States** - Animated loading indicators during login/logout
- **Error Handling** - Clear error messages for invalid inputs
- **Password Visibility Toggle** - Show/hide password functionality
- **Smooth Navigation** - Slide animations between screens
- **Field Preservation** - Input fields remain filled on error
- **Custom Alert** - Native alert for wrong credentials

### ✅ UI/UX Features
- **Clean & Modern Design** - Minimalist interface with consistent styling
- **Responsive Layout** - Works on all screen sizes
- **Keyboard Handling** - Proper keyboard avoidance
- **Color Constants** - Centralized color management
- **Reusable Components** - Custom TextInput component

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **React Native CLI**
- **Android Studio** (for Android development)
- **Xcode** (for iOS development - macOS only)
- **Java Development Kit (JDK)** (for Android)

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd UserAuthenticationApp/UserAuthenticationApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies (macOS only):**
   ```bash
   cd ios
   pod install
   cd ..
   ```

### Running the App

#### Android

1. **Start Metro Bundler:**
   ```bash
   npm start
   # or
   yarn start
   ```

2. **Run on Android (in a new terminal):**
   ```bash
   npm run android
   # or
   yarn android
   ```

   Or build and run:
   ```bash
   npx react-native run-android
   ```

#### iOS (macOS only)

1. **Start Metro Bundler:**
   ```bash
   npm start
   # or
   yarn start
   ```

2. **Run on iOS (in a new terminal):**
   ```bash
   npm run ios
   # or
   yarn ios
   ```

   Or build and run:
   ```bash
   npx react-native run-ios
   ```

### Building Release APK (Android)

1. **Navigate to Android directory:**
   ```bash
   cd android
   ```

2. **Clean previous builds:**
   ```bash
   ./gradlew clean
   ```

3. **Build release APK:**
   ```bash
   ./gradlew assembleRelease
   ```

4. **Find the APK:**
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

## 📁 Project Structure

```
UserAuthenticationApp/
├── src/
│   ├── components/          # Reusable components
│   │   ├── CustomTextInput/ # Custom input component
│   │   └── CustomAlert/     # Custom alert component
│   ├── constants/           # Constants and configurations
│   │   ├── appStrings.ts   # All static texts
│   │   └── colors.ts       # Color constants
│   ├── contexts/            # Context API
│   │   └── AuthContext.tsx # Authentication context
│   ├── navigation/          # Navigation setup
│   │   └── AppNavigator.tsx # Stack navigator
│   ├── screens/             # Screen components
│   │   ├── LoginScreen/     # Login screen
│   │   ├── SignupScreen/    # Signup screen
│   │   └── HomeScreen/      # Home screen
│   └── utils/               # Utility functions
│       └── validation.ts    # Validation functions
├── android/                 # Android native code
├── ios/                     # iOS native code
├── App.tsx                  # App entry point
└── package.json             # Dependencies
```

## 🔧 Key Technologies

- **React Native** - Mobile app framework
- **React Navigation** - Navigation library
- **React Context API** - State management
- **AsyncStorage** - Data persistence
- **TypeScript** - Type safety

## 📖 Usage Guide

### First Time User

1. Open the app
2. You'll be directed to the **Signup** screen
3. Fill in:
   - Name
   - Email (valid format required)
   - Password (must meet all requirements)
4. Click **Sign Up**
5. You'll be automatically logged in and redirected to **Home** screen

### Returning User

1. Open the app
2. You'll see the **Login** screen
3. Enter your:
   - Email
   - Password
4. Click **Login**
5. If credentials are correct, you'll be redirected to **Home** screen

### Already Logged In

- If you're already logged in, the app will automatically open the **Home** screen
- Your session persists even after closing the app

### Logout

1. From the **Home** screen
2. Click the **Logout** button
3. You'll be redirected to the **Login** screen
4. Your session will be cleared

## 🎨 Features Explained

### Email Validation

The app validates emails with strict rules:
- ✅ Must be a valid email format
- ✅ Domain must be lowercase (e.g., @gmail.com)
- ✅ Spaces are automatically removed
- ❌ Special characters like #, (, ), [, ], {, } are rejected
- ✅ Only allows: letters, numbers, dots, hyphens, underscores, plus signs

**Example:**
- ✅ `user@gmail.com` - Valid
- ✅ `user.name+tag@gmail.com` - Valid
- ❌ `user#name@gmail.com` - Invalid (contains #)
- ❌ `user@Gmail.com` - Invalid (domain must be lowercase)

### Password Validation

Password must meet all requirements:
- ✅ Minimum 8 characters
- ✅ At least one capital letter (A-Z)
- ✅ At least one lowercase letter (a-z)
- ✅ At least one symbol (!@#$%^&*()_+-=[]{};':"\\|,.<>/?)

**Real-time Feedback:**
- As you type, password hints show with ✓ (green) or ✗ (red) icons
- All requirements must be met before signup

**Example:**
- ✅ `Password1!` - Valid (meets all requirements)
- ❌ `password1!` - Invalid (missing capital letter)
- ❌ `Password1` - Invalid (missing symbol)

### Session Persistence

- User login state is saved using AsyncStorage
- When you close and reopen the app, you remain logged in
- Logout clears the stored session
- No need to login again after app restart

### Navigation Flow

1. **App Start:**
   - Checks if user is logged in
   - If logged in → Home screen
   - If not logged in → Login or Signup (based on first-time status)

2. **After Login:**
   - Saves user data to AsyncStorage
   - Navigates to Home screen

3. **After Logout:**
   - Clears user data from AsyncStorage
   - Navigates to Login screen

## 🛠️ Development

### Adding New Features

1. **Add new screens:**
   - Create screen in `src/screens/`
   - Add route in `src/navigation/AppNavigator.tsx`

2. **Add new constants:**
   - Add to `src/constants/appStrings.ts` for texts
   - Add to `src/constants/colors.ts` for colors

3. **Add validation:**
   - Add function to `src/utils/validation.ts`

### Code Style

- **TypeScript** for type safety
- **Functional Components** with Hooks
- **Centralized Styling** using StyleSheet
- **Reusable Components** for common UI elements

## 📝 Dependencies

### Core Dependencies
- `react` - React library
- `react-native` - React Native framework
- `@react-navigation/native` - Navigation library
- `@react-navigation/native-stack` - Stack navigator
- `@react-native-async-storage/async-storage` - Data persistence
- `react-native-safe-area-context` - Safe area handling
- `react-native-screens` - Native screen components

## 🐛 Troubleshooting

### Metro Bundler Issues

If you encounter Metro bundler issues:

```bash
# Clear cache and restart
npm start -- --reset-cache
# or
yarn start --reset-cache
```

### Android Build Issues

```bash
# Clean Android build
cd android
./gradlew clean
cd ..
```

### iOS Build Issues

```bash
# Clean iOS build
cd ios
pod deintegrate
pod install
cd ..
```

### Navigation Issues

- Ensure all dependencies are installed
- Rebuild the app after installing navigation packages

## 📱 Testing

### Manual Testing Checklist

- [ ] Signup with valid credentials
- [ ] Signup with invalid email format
- [ ] Signup with weak password
- [ ] Login with correct credentials
- [ ] Login with wrong credentials
- [ ] Logout functionality
- [ ] App restart (session persistence)
- [ ] Password visibility toggle
- [ ] Email space removal
- [ ] Navigation between screens

### Testing Status

✅ **Tested on Android Real Device** - The app has been tested and verified on physical Android devices.

✅ **Tested on iOS Simulator** - The app has been tested and verified on iOS simulator.

## 📄 License

This project is for educational purposes.

## 👨‍💻 Author

Developed as a React Native User Authentication App with complete authentication flow.

---

**Note:** This app uses local storage (AsyncStorage) for user data. For production use, integrate with a backend API for secure authentication.
