import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { styles } from './styles';
import { useAuth } from '../../contexts/AuthContext';
import { appStrings } from '../../constants/appStrings';
import { colors } from '../../constants/colors';

const HomeScreen = ({ navigation }: any) => {
  const { user, logout, isLoading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    // Animate loading overlay
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    try {
      await logout();
      // Navigation will happen automatically based on user state
    } catch (error) {
      // Hide loading overlay on error
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setIsLoggingOut(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          {appStrings.homeScreen.welcomeText}
        </Text>
        <View style={styles.userInfoContainer}>
          <Text style={styles.label}>{appStrings.homeScreen.nameLabel}</Text>
          <Text style={styles.userName}>{user?.name || 'N/A'}</Text>
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.label}>{appStrings.homeScreen.emailLabel}</Text>
          <Text style={styles.userEmail}>{user?.email || 'N/A'}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        disabled={isLoggingOut || isLoading}>
        {isLoggingOut || isLoading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={styles.logoutButtonText}>
            {appStrings.homeScreen.logoutButton}
          </Text>
        )}
      </TouchableOpacity>

      {/* Loading Overlay */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isLoggingOut || isLoading}
        onRequestClose={() => {}}>
        <Animated.View
          style={[
            styles.loadingOverlay,
            {
              opacity: fadeAnim,
            },
          ]}>
          <View style={styles.loadingContent}>
            <ActivityIndicator size="large" color={colors.error} />
            <Text style={styles.loadingText}>Logging out...</Text>
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
};

export default HomeScreen;

