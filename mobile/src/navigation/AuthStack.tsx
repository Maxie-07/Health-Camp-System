import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export const AuthStack = ({ onAuthenticated }: { onAuthenticated: () => void }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login">
      {() => <LoginScreen onSuccess={onAuthenticated} />}
    </Stack.Screen>
  </Stack.Navigator>
);
