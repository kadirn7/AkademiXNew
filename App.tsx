import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import SplashScreen from './src/screens/SplashScreen';
import DataManager from './src/utils/DataManager';

type AppState = 'splash' | 'login' | 'register' | 'main';

export default function App() {
  const [appState, setAppState] = useState<AppState>('splash');

  const handleSplashComplete = () => {
    // Her zaman giriş sayfasından başla
    setAppState('login');
  };

  const handleLoginSuccess = () => {
    setAppState('main');
  };

  const handleRegisterSuccess = () => {
    setAppState('login');
  };

  const handleBackToLogin = () => {
    setAppState('login');
  };

  const handleShowRegister = () => {
    setAppState('register');
  };

  const handleLogout = () => {
    // DataManager'dan çıkış yap
    const dataManager = DataManager.getInstance();
    dataManager.logout();
    setAppState('login');
  };

  const renderContent = () => {
    switch (appState) {
      case 'splash':
        return <SplashScreen onAnimationComplete={handleSplashComplete} />;
      case 'login':
        return (
          <LoginScreen 
            onLoginSuccess={handleLoginSuccess}
            onShowRegister={handleShowRegister}
          />
        );
      case 'register':
        return (
          <RegisterScreen 
            onRegisterSuccess={handleRegisterSuccess}
            onBackToLogin={handleBackToLogin}
          />
        );
      case 'main':
        return <AppNavigator onLogout={handleLogout} />;
      default:
        return <SplashScreen onAnimationComplete={handleSplashComplete} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderContent()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
