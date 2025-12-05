import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { styles } from './styles';
import {
  validateName,
  validateEmail,
  validatePassword,
} from '../../utils/validation';
import { useAuth } from '../../contexts/AuthContext';
import { appStrings } from '../../constants/appStrings';
import { colors } from '../../constants/colors';
import CustomTextInput from '../../components/CustomTextInput';

const SignupScreen = ({ navigation }: any) => {
  const { signup, isLoading: authLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    const newErrors = {
      name: nameError,
      email: emailError,
      password: passwordError,
    };

    setErrors(newErrors);

    // Return true only if all fields are valid (no errors)
    return !nameError && !emailError && !passwordError;
  };

  const handleSignup = async () => {
    // Validate form first - this will set errors
    const isValid = validateForm();
    
    // If validation fails, stop here - don't navigate
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    // Clear previous errors
    setErrors({ name: '', email: '', password: '' });

    // Call signup function from AuthContext
    try {
      await signup(name, email, password);
      // Navigation will happen automatically based on user state
    } catch (error: any) {
      // Handle signup error
      const errorMessage = error?.message || appStrings.errors.signupFailed;
      setErrors({
        name: '',
        email: errorMessage,
        password: '',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNameChange = (text: string) => {
    setName(text);
    if (errors.name) {
      setErrors({ ...errors, name: '' });
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (errors.email) {
      setErrors({ ...errors, email: '' });
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (errors.password) {
      setErrors({ ...errors, password: '' });
    }
  };

  const handleGoToLogin = () => {
    // Navigate back to Login screen
    if (navigation) {
      navigation.navigate('Login' as never);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={styles.title}>{appStrings.signupScreen.title}</Text>

          <CustomTextInput
            label={appStrings.signupScreen.nameLabel}
            placeholder={appStrings.signupScreen.namePlaceholder}
            value={name}
            onChangeText={handleNameChange}
            error={errors.name}
            autoCapitalize="words"
            autoCorrect={false}
          />

          <CustomTextInput
            label={appStrings.signupScreen.emailLabel}
            placeholder={appStrings.signupScreen.emailPlaceholder}
            value={email}
            onChangeText={handleEmailChange}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <CustomTextInput
            label={appStrings.signupScreen.passwordLabel}
            placeholder={appStrings.signupScreen.passwordPlaceholder}
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
              styles.signupButton,
              (isSubmitting || authLoading) && styles.signupButtonDisabled,
            ]}
            onPress={handleSignup}
            disabled={isSubmitting || authLoading}>
            {isSubmitting || authLoading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.signupButtonText}>
                {appStrings.signupScreen.signupButton}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginLink}
            onPress={handleGoToLogin}>
            <Text style={styles.loginLinkText}>
              {appStrings.signupScreen.goToLogin}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

