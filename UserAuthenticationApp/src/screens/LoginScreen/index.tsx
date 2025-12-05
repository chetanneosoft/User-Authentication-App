import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal,
  Animated,
  Alert,
} from 'react-native';
import { styles } from './styles';
import { validateEmail, validatePasswordForLogin } from '../../utils/validation';
import { useAuth } from '../../contexts/AuthContext';
import { appStrings } from '../../constants/appStrings';
import { colors } from '../../constants/colors';
import CustomTextInput from '../../components/CustomTextInput';

const LoginScreen = ({ navigation }: any) => {
  const { login, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  // Use refs to preserve field values even if component re-renders
  const emailRef = useRef(email);
  const passwordRef = useRef(password);
  
  // Update refs whenever email/password changes
  React.useEffect(() => {
    emailRef.current = email;
  }, [email]);
  
  React.useEffect(() => {
    passwordRef.current = password;
  }, [password]);

  const validateForm = (): boolean => {
    const emailError = validateEmail(email);
    const passwordError = validatePasswordForLogin(password);

    const newErrors = {
      email: emailError,
      password: passwordError,
    };

    setErrors(newErrors);

    // Return true only if both fields are valid (no errors)
    return !emailError && !passwordError;
  };

  const handleLogin = async () => {
    // Validate form first - this will set errors
    const isValid = validateForm();

    // If validation fails, stop here - don't navigate
    if (!isValid) {
      return;
    }

    // Get current values from refs (most up-to-date)
    const currentEmail = emailRef.current;
    const currentPassword = passwordRef.current;

    setIsSubmitting(true);
    // Clear previous errors
    setErrors({ email: '', password: '' });

    // Animate loading overlay
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Call login function from AuthContext
    try {
      await login(currentEmail, currentPassword);
      // Navigation will happen automatically based on user state
      // Don't reset fields here - let navigation handle it
    } catch (error: any) {
      // Handle login error - show native alert and error message
      const errorMessage = appStrings.loginScreen.wrongCredentials;
      
      // IMPORTANT: Ensure email and password values are preserved
      // Restore from refs if they were cleared during re-render
      if (email !== currentEmail) {
        setEmail(currentEmail);
      }
      if (password !== currentPassword) {
        setPassword(currentPassword);
      }
      
      // Hide loading overlay
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Show native alert after animation completes
        Alert.alert(
          'Login Failed',
          errorMessage,
          [{ text: 'OK' }]
        );
      });
      
      // Set error message immediately
      setErrors({
        email: errorMessage,
        password: '',
      });
      
      // IMPORTANT: Keep email and password fields filled - don't reset them
      // Fields will remain as user typed them
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors({ ...errors, email: '' });
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    // Clear error when user starts typing
    if (errors.password) {
      setErrors({ ...errors, password: '' });
    }
  };

  const handleGoToSignup = () => {
    // Navigate to Signup screen
    if (navigation) {
      navigation.navigate('Signup' as never);
    }
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.content}>
        <Text style={styles.title}>{appStrings.loginScreen.title}</Text>

        <CustomTextInput
          label={appStrings.loginScreen.emailLabel}
          placeholder={appStrings.loginScreen.emailPlaceholder}
          value={email}
          onChangeText={handleEmailChange}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <CustomTextInput
          label={appStrings.loginScreen.passwordLabel}
          placeholder={appStrings.loginScreen.passwordPlaceholder}
          value={password}
          onChangeText={handlePasswordChange}
          error={errors.password}
          secureTextEntry={true}
          isPasswordVisible={isPasswordVisible}
          onTogglePasswordVisibility={() =>
            setIsPasswordVisible(!isPasswordVisible)
          }
        />

        <TouchableOpacity
          style={[
            styles.loginButton,
            (isSubmitting || authLoading) && styles.loginButtonDisabled,
          ]}
          onPress={handleLogin}
          disabled={isSubmitting || authLoading}>
          {isSubmitting || authLoading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.loginButtonText}>
              {appStrings.loginScreen.loginButton}
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.signupLinkContainer}>
          <Text style={styles.newUserText}>
            {appStrings.loginScreen.newUserText}{' '}
          </Text>
          <TouchableOpacity onPress={handleGoToSignup}>
            <Text style={styles.signupLinkText}>
              {appStrings.loginScreen.goToSignup}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Loading Overlay */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isSubmitting || authLoading}
        onRequestClose={() => {}}>
        <Animated.View
          style={[
            styles.loadingOverlay,
            {
              opacity: fadeAnim,
            },
          ]}>
          <View style={styles.loadingContent}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Logging in...</Text>
          </View>
        </Animated.View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;