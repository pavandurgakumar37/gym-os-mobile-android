import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';

import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import UserStackNavigator from './UserStackNavigator';
import AdminStackNavigator from './AdminStackNavigator';
import ITStackNavigator from './ITStackNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, loading, checkAuth } = useAuth();
  const { colors } = useTheme();

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          {user.role === 'user' && (
            <Stack.Screen name="UserStack" component={UserStackNavigator} />
          )}
          {user.role === 'admin' && (
            <Stack.Screen name="AdminStack" component={AdminStackNavigator} />
          )}
          {user.role === 'ituser' && (
            <Stack.Screen name="ITStack" component={ITStackNavigator} />
          )}
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;
