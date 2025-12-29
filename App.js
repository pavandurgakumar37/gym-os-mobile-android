import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import DashboardScreen from './src/screens/dashboard/DashboardScreen';
import MembersScreen from './src/screens/members/MembersScreen';
import EquipmentScreen from './src/screens/equipment/EquipmentScreen';
import WorkoutsScreen from './src/screens/workouts/WorkoutsScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import MemberDetailsScreen from './src/screens/members/MemberDetailsScreen';
import AddMemberScreen from './src/screens/members/AddMemberScreen';
import AddEquipmentScreen from './src/screens/equipment/AddEquipmentScreen';
import WorkoutDetailsScreen from './src/screens/workouts/WorkoutDetailsScreen';
import PaymentScreen from './src/screens/payments/PaymentScreen';
import ReportsScreen from './src/screens/reports/ReportsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          } else if (route.name === 'Members') {
            iconName = 'people';
          } else if (route.name === 'Equipment') {
            iconName = 'fitness-center';
          } else if (route.name === 'Workouts') {
            iconName = 'timer';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#4CAF50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Members" component={MembersScreen} />
      <Tab.Screen name="Equipment" component={EquipmentScreen} />
      <Tab.Screen name="Workouts" component={WorkoutsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Main App Navigation
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen name="MemberDetails" component={MemberDetailsScreen} />
        <Stack.Screen name="AddMember" component={AddMemberScreen} />
        <Stack.Screen name="AddEquipment" component={AddEquipmentScreen} />
        <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Reports" component={ReportsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
