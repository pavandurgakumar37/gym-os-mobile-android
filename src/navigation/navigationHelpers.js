import { CommonActions } from '@react-navigation/native';

/**
 * Navigate to a specific screen in the navigation stack
 * @param {Object} navigation - Navigation object from useNavigation hook
 * @param {string} routeName - Name of the route to navigate to
 * @param {Object} params - Optional parameters to pass to the route
 */
export const navigateToScreen = (navigation, routeName, params = {}) => {
  navigation.navigate(routeName, params);
};

/**
 * Reset the navigation stack and navigate to a specific screen
 * @param {Object} navigation - Navigation object from useNavigation hook
 * @param {string} routeName - Name of the route to navigate to
 * @param {Object} params - Optional parameters to pass to the route
 */
export const resetNavigationStack = (navigation, routeName, params = {}) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName, params }],
    })
  );
};

/**
 * Go back to the previous screen
 * @param {Object} navigation - Navigation object from useNavigation hook
 */
export const goBack = (navigation) => {
  navigation.goBack();
};

/**
 * Navigate to a specific screen and reset the stack (replace current)
 * @param {Object} navigation - Navigation object from useNavigation hook
 * @param {string} routeName - Name of the route to navigate to
 * @param {Object} params - Optional parameters to pass to the route
 */
export const replaceScreen = (navigation, routeName, params = {}) => {
  navigation.replace(routeName, params);
};

/**
 * Pop the current screen from the stack
 * @param {Object} navigation - Navigation object from useNavigation hook
 * @param {number} count - Number of screens to pop (default: 1)
 */
export const popScreen = (navigation, count = 1) => {
  navigation.pop(count);
};

/**
 * Pop to the top of the stack
 * @param {Object} navigation - Navigation object from useNavigation hook
 */
export const popToTop = (navigation) => {
  navigation.popToTop();
};

/**
 * Navigate to a specific screen with nested navigation
 * @param {Object} navigation - Navigation object from useNavigation hook
 * @param {string} parentRoute - Name of the parent route (tab navigator)
 * @param {string} childRoute - Name of the child route (screen)
 * @param {Object} params - Optional parameters to pass to the route
 */
export const navigateToNestedScreen = (navigation, parentRoute, childRoute, params = {}) => {
  navigation.navigate(parentRoute, {
    screen: childRoute,
    params,
  });
};

/**
 * Navigate to a specific tab in a tab navigator
 * @param {Object} navigation - Navigation object from useNavigation hook
 * @param {string} tabName - Name of the tab to navigate to
 * @param {Object} params - Optional parameters to pass to the tab
 */
export const navigateToTab = (navigation, tabName, params = {}) => {
  navigation.navigate(tabName, params);
};

/**
 * Navigate to a specific screen with deep linking support
 * @param {Object} navigation - Navigation object from useNavigation hook
 * @param {string} deepLink - Deep link URL
 */
export const navigateToDeepLink = (navigation, deepLink) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: deepLink }],
    })
  );
};

/**
 * Check if the current route is the specified route
 * @param {Object} route - Current route object from useRoute hook
 * @param {string} routeName - Name of the route to check
 * @returns {boolean} True if current route matches the specified route
 */
export const isCurrentRoute = (route, routeName) => {
  return route.name === routeName;
};

/**
 * Get the current route name from the navigation state
 * @param {Object} navigationState - Navigation state object
 * @returns {string|null} Current route name or null if not found
 */
export const getCurrentRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }

  const route = navigationState.routes[navigationState.index];

  // Dive into nested navigators
  if (route.state) {
    return getCurrentRouteName(route.state);
  }

  return route.name;
};

/**
 * Navigate to workout detail screen
 * @param {Object} navigation - Navigation object from useNavigation hook
 * @param {Object} workoutLevel - Workout level object
 */
export const navigateToWorkoutDetail = (navigation, workoutLevel) => {
  navigation.navigate('WorkoutDetail', { workoutLevel });
};

/**
 * Navigate to product detail screen
 * @param {Object} navigation - Navigation object from useNavigation hook
 * @param {Object} product - Product object
 */
export const navigateToProductDetail = (navigation, product) => {
  navigation.navigate('ProductDetail', { product });
};

/**
 * Navigate to bug detail screen
 * @param {Object} navigation - Navigation object from useNavigation hook
 * @param {Object} bug - Bug object
 */
export const navigateToBugDetail = (navigation, bug) => {
  navigation.navigate('BugDetail', { bug });
};

/**
 * Handle back button press with custom logic
 * @param {Object} navigation - Navigation object from useNavigation hook
 * @param {Function} onBack - Optional callback function to execute before going back
 * @returns {boolean} True if back was handled, false otherwise
 */
export const handleBackPress = (navigation, onBack = null) => {
  if (onBack && typeof onBack === 'function') {
    const shouldGoBack = onBack();
    if (shouldGoBack === false) {
      return true;
    }
  }

  if (navigation.canGoBack()) {
    navigation.goBack();
    return true;
  }

  return false;
};

/**
 * Navigate to login screen (for logout)
 * @param {Object} navigation - Navigation object from useNavigation hook
 */
export const navigateToLogin = (navigation) => {
  resetNavigationStack(navigation, 'Login');
};

/**
 * Navigate to dashboard based on user role
 * @param {Object} navigation - Navigation object from useNavigation hook
 * @param {string} role - User role ('user', 'admin', 'ituser')
 */
export const navigateToDashboard = (navigation, role) => {
  switch (role) {
    case 'user':
      navigation.navigate('UserTabs', { screen: 'Dashboard' });
      break;
    case 'admin':
      navigation.navigate('AdminTabs', { screen: 'Dashboard' });
      break;
    case 'ituser':
      navigation.navigate('ITTabs', { screen: 'Dashboard' });
      break;
    default:
      break;
  }
};
