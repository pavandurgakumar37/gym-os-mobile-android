import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

import UserDashboard from '../screens/user/UserDashboard';
import WorkoutLevelsScreen from '../screens/user/WorkoutLevelsScreen';
import MealPrepScreen from '../screens/user/MealPrepScreen';
import ShopScreen from '../screens/user/ShopScreen';
import ProgressScreen from '../screens/user/ProgressScreen';

const Tab = createBottomTabNavigator();

const UserTabNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Workouts') {
            iconName = focused ? 'fitness' : 'fitness-outline';
          } else if (route.name === 'Meals') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Shop') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Progress') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
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
      <Tab.Screen name="Dashboard" component={UserDashboard} />
      <Tab.Screen name="Workouts" component={WorkoutLevelsScreen} />
      <Tab.Screen name="Meals" component={MealPrepScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
    </Tab.Navigator>
  );
};

export default UserTabNavigator;
