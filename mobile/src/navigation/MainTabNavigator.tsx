import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../screens/DashboardScreen';
import { RegistryScreen } from '../screens/RegistryScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { ScreeningScreen } from '../screens/ScreeningScreen';
import { InventoryScreen } from '../screens/InventoryScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

export const MainTabNavigator = ({ onLogout }: { onLogout: () => void }) => (
  <Tab.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.navy },
      headerTintColor: '#fff',
      tabBarActiveTintColor: colors.teal,
      tabBarInactiveTintColor: colors.slate500,
      tabBarStyle: { paddingBottom: 4, height: 58 }
    }}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Analytics' }} />
    <Tab.Screen name="Registry" component={RegistryScreen} options={{ title: 'Registry' }} />
    <Tab.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
    <Tab.Screen name="Screening" component={ScreeningScreen} options={{ title: 'Screening' }} />
    <Tab.Screen name="Inventory" component={InventoryScreen} options={{ title: 'Inventory' }} />
    <Tab.Screen name="Profile">
      {() => <ProfileScreen onLogout={onLogout} />}
    </Tab.Screen>
  </Tab.Navigator>
);
