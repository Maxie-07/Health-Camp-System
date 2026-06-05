import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AuthStack } from './AuthStack';
import { MainTabNavigator } from './MainTabNavigator';
import { runMigrations } from '../database/migrations';
import { getToken } from '../services/storageService';
import { SyncStateProvider } from '../components/SyncStateContext';
import { colors } from '../theme/colors';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.bg
  }
};

export const AppNavigator = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    runMigrations().then(async () => {
      const token = await getToken();
      setAuthenticated(!!token);
    });
  }, []);

  if (authenticated === null) {
    return null;
  }

  return (
    <SyncStateProvider>
      <NavigationContainer theme={theme}>
        {authenticated ? (
          <MainTabNavigator onLogout={() => setAuthenticated(false)} />
        ) : (
          <AuthStack onAuthenticated={() => setAuthenticated(true)} />
        )}
      </NavigationContainer>
    </SyncStateProvider>
  );
};
