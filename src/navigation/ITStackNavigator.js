import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

import ITDashboard from '../screens/it/ITDashboard';
import BugTrackerScreen from '../screens/it/BugTrackerScreen';
import BugDetailScreen from '../screens/it/BugDetailScreen';
import UserManagementScreen from '../screens/admin/UserManagementScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ITTabNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Bugs') {
            iconName = focused ? 'bug' : 'bug-outline';
          } else if (route.name === 'Users') {
            iconName = focused ? 'people' : 'people-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={ITDashboard} />
      <Tab.Screen name="Bugs" component={BugTrackerScreen} />
      <Tab.Screen name="Users" component={UserManagementScreen} />
    </Tab.Navigator>
  );
};

const ITStackNavigator = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="ITTabs"
        component={ITTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BugDetail"
        component={BugDetailScreen}
        options={{ title: 'Bug Details' }}
      />
    </Stack.Navigator>
  );
};

export default ITStackNavigator;
