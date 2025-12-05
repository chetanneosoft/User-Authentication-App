import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: colors.textPrimary,
  },
  inputError: {
    borderColor: colors.error,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
    padding: 5,
  },
  eyeIconText: {
    fontSize: 20,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginTop: 5,
  },
  signupButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  signupButtonDisabled: {
    backgroundColor: colors.buttonDisabled,
    opacity: 0.6,
  },
  signupButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginLinkText: {
    color: colors.primary,
    fontSize: 16,
  },
  passwordHintsContainer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  passwordHintsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  passwordHintItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  passwordHintIcon: {
    fontSize: 16,
    marginRight: 8,
    color: colors.error,
    fontWeight: 'bold',
  },
  passwordHintIconValid: {
    color: colors.success,
  },
  passwordHintText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  passwordHintTextValid: {
    color: colors.success,
  },
});

