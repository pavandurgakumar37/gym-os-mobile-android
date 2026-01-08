# Gym OS Mobile Android - Comprehensive Project Analysis

## Table of Contents
1. [Project Overview & Background](#project-over--background)
2. [Configuration Files](#configuration-files)
3. [Main Entry Point](#main-entry-point)
4. [Components](#components)
5. [Navigation](#navigation)
6. [Screens - User](#screens---user)
7. [Screens - Admin](#screens---admin)
8. [Screens - IT](#screens---it)
9. [Login Screen](#login-screen)
10. [Context](#context)
11. [Data](#data)
12. [Assets](#assets)
13. [Existing Documentation](#existing-documentation)

---

## Project Overview & Background

### What is Gym OS?

**Gym OS Mobile Android** is a comprehensive mobile fitness management application built with **React Native** and **Expo**. It's designed to help users track workouts, manage nutrition, monitor progress, and shop for fitness products. The application features **role-based access control** that provides different interfaces for administrators, regular users, and IT support staff.

### Core Concept

A gym management system needs to serve multiple user types with different needs:
- **Regular Users**: Want to track fitness progress, follow workout plans, manage nutrition, and purchase fitness products
- **Administrators**: Need to manage users, track orders, and oversee system operations
- **IT Support**: Need to track and resolve bugs, manage system issues

This app addresses all these needs through a single mobile application with role-based navigation and features.

### Technology Stack Background

#### React Native
**React Native** is a framework developed by Meta (Facebook) that allows developers to build mobile applications using JavaScript and React. Unlike traditional web apps wrapped in a WebView, React Native renders actual native components, providing near-native performance.

**Key Concepts:**
- **Cross-platform development**: Write once, deploy to iOS and Android
- **Component-based architecture**: Build UI from reusable components
- **Virtual DOM**: React's efficient rendering system that minimizes actual DOM updates
- **JavaScript**: Uses familiar web technologies for mobile development

#### Expo
**Expo** is a framework built on top of React Native that provides tools and services to make React Native development easier. It handles native code compilation, provides pre-built components, and offers development tools.

**Key Benefits:**
- **No native setup required**: Start developing immediately
- **Expo Go app**: Test on real devices without building
- **Over-the-air updates**: Update apps without app store approval
- **Unified APIs**: Consistent APIs across iOS and Android

#### React Navigation
**React Navigation** is the standard navigation solution for React Native apps. It provides:
- **Stack Navigation**: Like a stack of cards, push/pop screens
- **Tab Navigation**: Bottom tab bars for main app sections
- **Drawer Navigation**: Side drawer navigation
- **Deep Linking**: Handle URLs to navigate to specific screens

#### Context API
The **React Context API** is a way to pass data through the component tree without manually passing props at every level. It's perfect for:
- **Global state**: User authentication, theme, language
- **Avoiding prop drilling**: Don't pass data through many components
- **Centralized logic**: Keep authentication logic in one place

#### AsyncStorage
**AsyncStorage** is a simple, unencrypted, asynchronous, persistent, key-value storage system for React Native. It's like localStorage in web browsers but for mobile apps.

**Use Cases:**
- **Session persistence**: Keep user logged in across app restarts
- **User preferences**: Store settings and preferences
- **Offline data**: Cache data for offline use

---

## Configuration Files

### package.json
**Path**: `/package.json`

**Purpose**: This is the standard Node.js package configuration file that defines project metadata, dependencies, and scripts.

**Detailed Explanation**:
```json
{
  "name": "gym-os-mobile-android",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~50.0.0",
    "expo-status-bar": "~1.11.1",
    "react": "18.2.0",
    "react-native": "0.73.6",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/stack": "^6.3.20",
    "@react-navigation/bottom-tabs": "^6.6.1",
    "@react-native-async-storage/async-storage": "1.21.0",
    "react-native-safe-area-context": "4.8.2",
    "react-native-screens": "~3.29.0",
    "react-native-gesture-handler": "~2.14.0",
    "react-native-reanimated": "~3.6.2"
  }
}
```

**Key Dependencies Explained**:

1. **expo (~50.0.0)**: The Expo SDK that provides all Expo functionality
   - Expo manages native code compilation
   - Provides access to device features (camera, location, etc.)
   - Handles app configuration and updates

2. **react (18.2.0)**: The core React library
   - React's component model
   - Hooks for state management (useState, useEffect, etc.)
   - Virtual DOM for efficient rendering

3. **react-native (0.73.6)**: The React Native framework
   - Native components (View, Text, Image, etc.)
   - Native APIs (Alert, Platform, etc.)
   - Bridge between JavaScript and native code

4. **@react-navigation/native (6.1.9)**: Core navigation library
   - NavigationContainer component
   - useNavigation hook for accessing navigation
   - useRoute hook for accessing route params

5. **@react-navigation/stack (6.3.20)**: Stack navigator
   - createStackNavigator function
   - Stack.Screen component
   - Stack navigation transitions

6. **@react-navigation/bottom-tabs (6.6.1)**: Tab navigator
   - createBottomTabNavigator function
   - Tab.Screen component
   - Bottom tab bar with icons

7. **@react-native-async-storage/async-storage (1.21.0)**: Persistent storage
   - AsyncStorage.setItem() to save data
   - AsyncStorage.getItem() to retrieve data
   - AsyncStorage.removeItem() to delete data

8. **react-native-safe-area-context (4.8.2)**: Safe area handling
   - SafeAreaView component
   - useSafeAreaInsets hook
   - Handles notches and status bars on modern devices

9. **react-native-screens (3.29.0)**: Native screen optimization
   - Enables native screen optimizations
   - Improves navigation performance
   - Reduces memory usage

10. **react-native-gesture-handler (2.14.0)**: Gesture handling
    - GestureHandlerRootView component
    - Pan, Tap, Swipe gestures
    - Required for React Navigation

11. **react-native-reanimated (3.6.2)**: Animations
    - Animated API for smooth animations
    - Reanimated 2 provides better performance
    - Works with gesture handler

**Scripts Explained**:
- **npm start**: Starts Expo development server with QR code for testing
- **npm run android**: Opens app on connected Android device/emulator
- **npm run ios**: Opens app on iOS simulator (macOS only)
- **npm run web**: Opens app in web browser for testing

**Architecture Fit**: This file defines the entire technology stack. All dependencies are carefully chosen versions that work together. The scripts provide convenient commands for development workflow.

---

### app.json
**Path**: `/app.json`

**Purpose**: Expo app configuration file that defines app metadata, icons, splash screens, and platform-specific settings.

**Detailed Explanation**:
```json
{
  "expo": {
    "name": "Gym OS",
    "slug": "gym-os-mobile-android",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.svg",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.svg",
      "resizeMode": "contain",
      "backgroundColor": "#4F46E5"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.gymos.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.svg",
        "backgroundColor": "#ffffff"
      },
      "package": "com.gymos.app",
      "versionCode": 1,
      "permissions": [
        "INTERNET",
        "ACCESS_NETWORK_STATE",
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "DETECT_SCREEN_CAPTURE"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.svg"
    }
  }
}
```

**Key Configuration Explained**:

1. **App Identity**:
   - **name**: "Gym OS" - Display name of the app
   - **slug**: "gym-os-mobile-android" - URL-friendly identifier
   - **version**: "1.0.0" - App version number

2. **Display Settings**:
   - **orientation**: "portrait" - App only displays in portrait mode
   - **userInterfaceStyle**: "light" - Uses light theme by default

3. **Splash Screen**:
   - **image**: "./assets/splash.svg" - Image shown while app loads
   - **resizeMode**: "contain" - How image fits in the container
   - **backgroundColor**: "#4F46E5" - Background color behind splash image

4. **Android Configuration**:
   - **package**: "com.gymos.app" - Unique Android package identifier
   - **versionCode**: 1 - Internal version number for Play Store
   - **adaptiveIcon**: Modern Android adaptive icon with foreground/background
   - **permissions**: Required Android permissions:
     - **INTERNET**: For network requests (API calls)
     - **ACCESS_NETWORK_STATE**: To check network connectivity
     - **CAMERA**: For taking photos (user profile, product photos)
     - **READ_EXTERNAL_STORAGE**: To read files from device storage
     - **WRITE_EXTERNAL_STORAGE**: To save files to device storage
     - **DETECT_SCREEN_CAPTURE**: Security feature to detect screen recording

5. **iOS Configuration**:
   - **bundleIdentifier**: "com.gymos.app" - Unique iOS bundle identifier
   - **supportsTablet**: true - App works on iPad tablets

6. **Web Configuration**:
   - **favicon**: "./assets/favicon.svg" - Browser tab icon

**Architecture Fit**: This configuration file controls how the app appears and behaves on different platforms. It's the first thing Expo reads when building the app.

---

### babel.config.js
**Path**: `/babel.config.js`

**Purpose**: Babel configuration for transpiling JavaScript code. Babel converts modern JavaScript and JSX to JavaScript that browsers and React Native can understand.

**Detailed Explanation**:
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
```

**Key Concepts Explained**:

1. **Babel Transpilation**:
   - Modern JavaScript features (ES6+, async/await) aren't supported everywhere
   - JSX (HTML-like syntax in JavaScript) isn't valid JavaScript
   - Babel converts these to compatible JavaScript

2. **Presets**:
   - **babel-preset-expo**: Pre-configured Babel setup for Expo
   - Includes support for React, JSX, and modern JavaScript
   - Handles Expo-specific transformations

3. **API Cache**:
   - **api.cache(true)**: Enables Babel's caching mechanism
   - Speeds up subsequent builds by reusing cached results
   - Only recompiles when files change

**Architecture Fit**: This simple configuration ensures all modern JavaScript features and JSX work correctly in the React Native environment. It's essential for the app to run at all.

---

### metro.config.js
**Path**: `/metro.config.js`

**Purpose**: Metro bundler configuration. Metro is React Native's JavaScript bundler that packages all code into a single file for the app to load.

**Detailed Explanation**:
```javascript
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = config;
```

**Key Concepts Explained**:

1. **Metro Bundler**:
   - Bundles all JavaScript files into one or more bundles
   - Handles module resolution (import/export)
   - Supports hot reloading for development
   - Optimizes code for production

2. **Expo's Default Config**:
   - **getDefaultConfig()**: Returns Expo's recommended Metro configuration
   - Includes support for all Expo features
   - Handles asset loading correctly
   - Configured for optimal performance

3. **__dirname**:
   - Current directory path
   - Helps Metro resolve file paths correctly
   - Essential for proper module resolution

**Architecture Fit**: Metro is responsible for packaging all the app's JavaScript code. This configuration ensures Metro works correctly with Expo's project structure.

---

### .gitignore
**Path**: `/.gitignore`

**Purpose**: Tells Git which files and directories to ignore. Prevents committing unnecessary files to version control.

**Detailed Explanation**:

The file contains patterns for ignoring:

1. **macOS System Files**:
   - `.DS_Store`: macOS stores folder metadata in these files
   - Should never be committed to version control

2. **Xcode Files** (iOS development):
   - `build/`: Build artifacts
   - `*.pbxuser`: Xcode user-specific settings
   - `*.xcuserstate`: Xcode user state
   - `xcuserdata/`: Xcode user data
   - `*.ipa`: iOS app archive files

3. **Android/IntelliJ Files** (Android development):
   - `build/`: Android build outputs
   - `.idea/`: IDE settings
   - `.gradle/`: Gradle cache
   - `*.iml`: IntelliJ module files
   - `*.keystore`: Android signing keys (security risk!)

4. **Node.js Files**:
   - `node_modules/`: Installed dependencies (too large for Git)
   - `npm-debug.log`, `yarn-error.log`: Package manager logs

5. **Build Artifacts**:
   - `*.jsbundle`: Bundled JavaScript files
   - `dist/`, `web-build/`: Build output directories

6. **Expo Files**:
   - `.expo/`: Expo cache and temporary files
   - `.expo-shared/`: Shared Expo configuration
   - Environment files: `.env`, `.env.local` (contain sensitive data!)

**Architecture Fit**: Keeps the repository clean by only tracking source code and configuration. Prevents committing large binary files, sensitive data, and temporary files.

---

## Main Entry Point

### App.js
**Path**: `/App.js`

**Purpose**: The root component of the React Native application. All other components are rendered within this component.

**Detailed Explanation**:
```javascript
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';

import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6366f1',
    background: '#ffffff',
    card: '#ffffff',
    text: '#1f2937',
    border: '#e5e7eb',
    notification: '#ef4444',
  },
};

const AppContent = () => {
  const { colors } = useTheme();

  return (
    <>
      <StatusBar style="auto" />
      <AppNavigator />
    </>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <NavigationContainer theme={theme}>
            <AppContent />
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
```

**Key Concepts Explained**:

1. **Component Hierarchy**:
   The App component wraps several provider components in a specific order:
   - **GestureHandlerRootView**: Must be outermost for gesture handling
   - **SafeAreaProvider**: Handles device notches and safe areas
   - **AuthProvider**: Provides authentication state to all components
   - **NavigationContainer**: Manages navigation state and screens

2. **Why This Order Matters**:
   - Gestures need to be available throughout the app
   - Safe areas need to be calculated before rendering
   - Auth needs to be available before navigation decisions
   - Navigation needs theme and auth context

3. **Theme Configuration**:
   - **DefaultTheme**: React Navigation's default light theme
   - **Custom colors**: App-specific color palette
   - **primary**: '#6366f1' - Indigo for primary actions
   - **background**: '#ffffff' - White background
   - **text**: '#1f2937' - Dark gray text
   - **border**: '#e5e7eb' - Light gray borders
   - **notification**: '#ef4444' - Red for notifications

4. **StatusBar**:
   - Controls the status bar at the top of the screen
   - **style="auto"**: Automatically adapts to theme (light/dark)

5. **useTheme Hook**:
   - Accesses the current theme from NavigationContainer
   - Used in AppContent to access theme colors
   - Allows components to be theme-aware

**Architecture Fit**: This is the foundation of the entire app. It sets up all the providers that make the app work. Every component in the app is a descendant of these providers, which means they can all access authentication state, navigation, theme, and safe area insets.

**Best Practices Used**:
- **Provider pattern**: Wraps app with necessary providers
- **Theme consistency**: Centralized theme definition
- **Component composition**: Builds complex UI from simple components
- **Separation of concerns**: AppContent handles content, App handles providers

---

## Components

### ActionButton.js
**Path**: `/src/components/ActionButton.js`

**Purpose**: A reusable button component with an icon, used for quick actions in dashboards.

**Detailed Explanation**:
```javascript
const ActionButton = ({ title, icon, color = '#007AFF', onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
        <Ionicons name={icon} size={28} color={color} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};
```

**Key Concepts Explained**:

1. **Props**:
   - **title**: Text to display on the button
   - **icon**: Ionicons icon name to display
   - **color**: Custom color (defaults to blue '#007AFF')
   - **onPress**: Function to call when button is tapped

2. **TouchableOpacity**:
   - React Native's touchable component
   - **activeOpacity={0.7}**: Button becomes 70% opaque when pressed
   - Provides visual feedback on tap

3. **Color Manipulation**:
   - `${color}15`: Appends '15' to color for opacity
   - Example: '#007AFF' + '15' = '#007AFF15' (hex with alpha)
   - Creates semi-transparent background for icon container

4. **Ionicons**:
   - Icon library from Expo
   - Provides 1000+ icons
   - Consistent icon style across app

5. **Styling**:
   - **container**: White card with shadow, rounded corners
   - **width: '48%'**: Takes up almost half the screen width
   - **shadow**: Creates elevation effect (iOS shadow, Android elevation)
   - **iconContainer**: Circular container for icon with colored background

**Architecture Fit**: This component is used throughout the app for quick action buttons. It provides a consistent look and feel for all action buttons in dashboards.

**Best Practices Used**:
- **Reusable component**: Can be used anywhere in the app
- **Default props**: Provides sensible defaults
- **Prop validation**: Uses specific props with clear purposes
- **Visual feedback**: activeOpacity provides tap feedback

---

### Avatar.js
**Path**: `/src/components/Avatar.js`

**Purpose**: Displays a user's initials in a colored circle, used for user identification.

**Detailed Explanation**:
```javascript
const Avatar = ({ name, size = 40, color = '#007AFF', style }) => {
  const getInitials = (name) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2, backgroundColor: `${color}20` }, style]}>
      <Text style={[styles.text, { fontSize: size * 0.4, color }]}>{getInitials(name)}</Text>
    </View>
  );
};
```

**Key Concepts Explained**:

1. **Props**:
   - **name**: User's full name
   - **size**: Diameter of the avatar (default 40px)
   - **color**: Background color (default blue)
   - **style**: Additional custom styles

2. **getInitials Function**:
   - Extracts first character from name
   - Converts to uppercase
   - Returns '?' if no name provided

3. **Dynamic Sizing**:
   - **width: size, height: size**: Creates square avatar
   - **borderRadius: size / 2**: Makes it perfectly circular
   - **fontSize: size * 0.4**: Scales text proportionally to avatar size

4. **Color Opacity**:
   - `${color}20`: Appends '20' for 12.5% opacity
   - Creates subtle background color
   - Text remains fully opaque

**Architecture Fit**: Used throughout the app to display user avatars without requiring profile images. Provides a clean, consistent way to identify users.

**Best Practices Used**:
- **Computed values**: Dynamically calculates size and font size
- **Fallback handling**: Returns '?' if no name
- **Style composition**: Combines default styles with custom props
- **Reusable**: Works for any user name and size

---

### Badge.js
**Path**: `/src/components/Badge.js`

**Purpose**: Displays status labels with color-coded backgrounds for different types of statuses.

**Detailed Explanation**:
```javascript
const Badge = ({ text, type = 'default' }) => {
  const getBadgeStyle = () => {
    switch (type) {
      case 'success': return { backgroundColor: '#34C759' };
      case 'warning': return { backgroundColor: '#FF9500' };
      case 'error': return { backgroundColor: '#FF3B30' };
      case 'admin': return { backgroundColor: '#FF3B30' };
      case 'user': return { backgroundColor: '#007AFF' };
      case 'ituser': return { backgroundColor: '#FF9500' };
      case 'delivered': return { backgroundColor: '#34C759' };
      case 'shipped': return { backgroundColor: '#007AFF' };
      case 'processing': return { backgroundColor: '#FF9500' };
      case 'pending': return { backgroundColor: '#FF3B30' };
      case 'high': return { backgroundColor: '#FF3B30' };
      case 'medium': return { backgroundColor: '#FF9500' };
      case 'low': return { backgroundColor: '#34C759' };
      case 'open': return { backgroundColor: '#FF3B30' };
      case 'in-progress': return { backgroundColor: '#FF9500' };
      case 'resolved': return { backgroundColor: '#34C759' };
      case 'current': return { backgroundColor: '#007AFF' };
      default: return { backgroundColor: '#666666' };
    }
  };

  return (
    <View style={[styles.container, getBadgeStyle()]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
```

**Key Concepts Explained**:

1. **Badge Types and Colors**:
   - **Success states**: Green (#34C759) - delivered, resolved, low
   - **Warning states**: Orange (#FF9500) - shipped, processing, medium, in-progress
   - **Error states**: Red (#FF3B30) - pending, high, open
   - **Info states**: Blue (#007AFF) - user, current
   - **Special states**: Orange for IT users, red for admins

2. **Styling**:
   - **borderRadius: 999**: Creates pill/capsule shape
   - **alignSelf: 'flex-start'**: Badge only takes needed width
   - **textTransform: 'uppercase'**: Always displays text in uppercase
   - **fontWeight: '700'**: Bold text for readability

3. **Semantic Color Coding**:
   - **Green**: Positive/completed states
   - **Orange**: In-progress/caution states
   - **Red**: Negative/pending states
   - **Blue**: Neutral/info states

**Architecture Fit**: Used throughout the app to display status information in a visually consistent way. Helps users quickly understand the state of items (orders, bugs, user roles, etc.).

**Best Practices Used**:
- **Comprehensive type handling**: Covers all status types in the app
- **Semantic colors**: Uses color psychology to convey meaning
- **Consistent styling**: All badges look the same
- **Flexible text**: Accepts any text content

---

### Card.js
**Path**: `/src/components/Card.js`

**Purpose**: A reusable container component with white background, rounded corners, and shadow for grouping content.

**Detailed Explanation**:
```javascript
const Card = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};
```

**Key Concepts Explained**:

1. **Props**:
   - **children**: Content to display inside the card
   - **style**: Additional custom styles to apply

2. **Styling**:
   - **backgroundColor: '#FFFFFF'**: White background
   - **borderRadius: 12**: Rounded corners
   - **padding: 15**: Internal spacing
   - **shadow**: Creates elevation effect
     - **shadowColor**: '#000' (black shadow)
     - **shadowOffset**: { width: 0, height: 2 } (shadow position)
     - **shadowOpacity**: 0.1 (subtle shadow)
     - **shadowRadius**: 4 (shadow blur)
     - **elevation: 3**: Android elevation equivalent

3. **Shadow Cross-Platform**:
   - **iOS**: Uses shadowColor, shadowOffset, shadowOpacity, shadowRadius
   - **Android**: Uses elevation property
   - Both create similar visual effect

4. **children Prop**:
   - React special prop that contains nested components
   - Allows Card to wrap any content
   - Makes Card highly flexible and reusable

**Architecture Fit**: This is one of the most-used components in the app. It provides a consistent container for grouping related content (stats, lists, forms, etc.).

**Best Practices Used**:
- **Simple and focused**: Does one thing well
- **Style composition**: Combines default styles with custom props
- **Platform-aware**: Handles iOS and Android shadows
- **Flexible content**: Can contain any components via children

---

### ListItem.js
**Path**: `/src/components/ListItem.js`

**Purpose**: A reusable list item component with optional left and right components, used for displaying lists of items.

**Detailed Explanation**:
```javascript
const ListItem = ({ title, subtitle, leftComponent, rightComponent, onPress, style }) => {
  const Content = () => (
    <View style={[styles.container, style]}>
      {leftComponent && <View style={styles.leftContainer}>{leftComponent}</View>}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {rightComponent && <View style={styles.rightContainer}>{rightComponent}</View>}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Content />
      </TouchableOpacity>
    );
  }

  return <Content />;
};
```

**Key Concepts Explained**:

1. **Props**:
   - **title**: Main text to display
   - **subtitle**: Optional secondary text
   - **leftComponent**: Optional component to display on the left (avatar, icon)
   - **rightComponent**: Optional component to display on the right (badge, icon)
   - **onPress**: Optional function to call when tapped
   - **style**: Additional custom styles

2. **Conditional Rendering**:
   - **leftComponent &&**: Only renders if leftComponent is provided
   - **subtitle &&**: Only renders if subtitle is provided
   - **rightComponent &&**: Only renders if rightComponent is provided
   - This prevents empty elements in the layout

3. **Conditional Touchable**:
   - If **onPress** is provided, wraps in TouchableOpacity
   - If no **onPress**, renders as plain View
   - Makes the component work for both interactive and static lists

4. **Layout**:
   - **Flexbox row**: Horizontal layout with flexbox
   - **leftContainer**: Fixed width for left component
   - **textContainer**: flex: 1 (takes remaining space)
   - **rightContainer**: Fixed width for right component

**Architecture Fit**: Used throughout the app for displaying lists of users, orders, bugs, etc. Provides a consistent list item appearance with flexible content.

**Best Practices Used**:
- **Flexible composition**: Accepts any components as left/right
- **Conditional interactivity**: Only tappable when needed
- **Consistent spacing**: Uses flexbox for predictable layout
- **Reusable**: Works for any list item type

---

### Modal.js
**Path**: `/src/components/Modal.js`

**Purpose**: A reusable modal dialog component that slides up from the bottom with a close button.

**Detailed Explanation**:
```javascript
const Modal = ({ visible, onRequestClose, title, children }) => {
  return (
    <RNModal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onRequestClose}
    >
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={onRequestClose} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color="#333333" />
                </TouchableOpacity>
              </View>
              <View style={styles.content}>
                {children}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};
```

**Key Concepts Explained**:

1. **Props**:
   - **visible**: Whether modal is shown
   - **onRequestClose**: Function to call when modal should close
   - **title**: Title to display in modal header
   - **children**: Content to display in modal body

2. **RNModal Configuration**:
   - **animationType="slide"**: Modal slides up from bottom
   - **transparent={true}**: Background behind modal is visible
   - **onRequestClose**: Called when back button pressed (Android)

3. **Nested TouchableWithoutFeedback**:
   - **Outer**: Closes modal when tapping overlay (background)
   - **Inner**: Prevents closing when tapping modal content
   - **onPress={() => {}}**: Empty function prevents propagation

4. **Overlay Pattern**:
   - **backgroundColor: 'rgba(0, 0, 0, 0.5)'**: Semi-transparent black
   - **justifyContent: 'flex-end'**: Modal at bottom of screen
   - **borderTopLeftRadius: 20, borderTopRightRadius: 20**: Rounded top corners

5. **Modal Structure**:
   - **Header**: Title and close button
   - **Content**: Scrollable area for modal content
   - **Border**: Bottom border separates header from content

**Architecture Fit**: Used throughout the app for displaying detailed information (order details, user details, bug details, etc.). Provides a consistent modal experience.

**Best Practices Used**:
- **Overlay pattern**: Tapping outside closes modal
- **Prevent propagation**: Tapping inside doesn't close modal
- **Slide animation**: Natural mobile modal behavior
- **Close button**: Always accessible way to close

---

### ProgressBar.js
**Path**: `/src/components/ProgressBar.js`

**Purpose**: Displays a horizontal progress bar with customizable color and height.

**Detailed Explanation**:
```javascript
const ProgressBar = ({ progress, color = '#007AFF', height = 8, style }) => {
  return (
    <View style={[styles.container, { height }, style]}>
      <View style={[styles.progress, { width: `${progress}%`, backgroundColor: color }]} />
    </View>
  );
};
```

**Key Concepts Explained**:

1. **Props**:
   - **progress**: Percentage complete (0-100)
   - **color**: Progress bar color (default blue)
   - **height**: Bar height in pixels (default 8px)
   - **style**: Additional custom styles

2. **Layout**:
   - **Container**: Full-width background bar (gray)
   - **Progress**: Colored bar with width based on percentage
   - **Nested Views**: Progress bar sits on top of container

3. **Dynamic Width**:
   - **width: `${progress}%`**: Converts number to percentage string
   - Example: progress=50 → width="50%"
   - Creates visual representation of progress

4. **Styling**:
   - **borderRadius: 4**: Rounded ends on both bars
   - **overflow: 'hidden'**: Ensures progress bar respects container's border radius
   - **backgroundColor**: Container is gray, progress is colored

**Architecture Fit**: Used to display progress indicators throughout the app (workout progress, loading states, etc.). Provides a consistent progress bar appearance.

**Best Practices Used**:
- **Flexible sizing**: Customizable height and color
- **Percentage-based**: Easy to use with 0-100 values
- **Rounded corners**: Modern, friendly appearance
- **Overflow handling**: Ensures proper clipping

---

### SearchBar.js
**Path**: `/src/components/SearchBar.js`

**Purpose**: A reusable search input component with an icon, used for filtering lists.

**Detailed Explanation**:
```javascript
const SearchBar = ({ placeholder, value, onChangeText, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name="search" size={20} color="#999999" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999999"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};
```

**Key Concepts Explained**:

1. **Props**:
   - **placeholder**: Text to show when input is empty
   - **value**: Current text value (controlled component)
   - **onChangeText**: Function called when text changes
   - **style**: Additional custom styles

2. **TextInput**:
   - React Native's text input component
   - **controlled component**: Value controlled by parent via props
   - **onChangeText**: Called on every keystroke
   - **placeholderTextColor**: Custom placeholder color

3. **Layout**:
   - **Flexbox row**: Icon and input side by side
   - **Icon**: Fixed width, right margin for spacing
   - **Input**: flex: 1 (takes remaining space)

4. **Styling**:
   - **White background**: Contrasts with gray page background
   - **Rounded corners**: borderRadius: 10
   - **Shadow**: Subtle elevation for depth
   - **Icon**: Gray color to indicate it's not interactive

**Architecture Fit**: Used throughout the app for search functionality (user search, bug search, etc.). Provides a consistent search input appearance.

**Best Practices Used**:
- **Controlled component**: Parent controls the value
- **Visual feedback**: Icon indicates search purpose
- **Consistent styling**: Matches app design system
- **Accessible**: Standard TextInput with all accessibility features

---

### SecondaryButton.js
**Path**: `/src/components/SecondaryButton.js`

**Purpose**: A button with a border and transparent background, used for secondary actions.

**Detailed Explanation**:
```javascript
const SecondaryButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};
```

**Key Concepts Explained**:

1. **Props**:
   - **title**: Text to display on button
   - **onPress**: Function to call when tapped
   - **style**: Additional custom styles

2. **Styling**:
   - **backgroundColor: 'transparent'**: No background color
   - **borderWidth: 2**: 2px border
   - **borderColor: '#007AFF'**: Blue border
   - **borderRadius: 10**: Rounded corners
   - **paddingVertical: 12, paddingHorizontal: 24**: Internal spacing

3. **Text Styling**:
   - **color: '#007AFF'**: Blue text matches border
   - **fontWeight: '600'**: Semi-bold for readability
   - **fontSize: 16**: Standard button text size

4. **Visual Design**:
   - **Outlined button**: Border with transparent fill
   - **Less prominent**: Secondary to primary buttons
   - **Clear affordance**: Still looks interactive

**Architecture Fit**: Used for secondary actions throughout the app (cancel, back, etc.). Provides a consistent secondary button style that's less prominent than primary buttons.

**Best Practices Used**:
- **Visual hierarchy**: Clearly secondary to primary buttons
- **Consistent styling**: Matches app design system
- **Standard spacing**: Comfortable touch target
- **Accessible**: Standard TouchableOpacity behavior

---

### StatCard.js
**Path**: `/src/components/StatCard.js`

**Purpose**: Displays a statistic with an icon, value, and label, used in dashboards.

**Detailed Explanation**:
```javascript
const StatCard = ({ title, value, icon, color = '#007AFF' }) => {
  return (
    <View style={[styles.container, { borderLeftColor: color }]}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={28} color={color} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};
```

**Key Concepts Explained**:

1. **Props**:
   - **title**: Label for the statistic
   - **value**: The statistic value to display
   - **icon**: Ionicons icon name
   - **color**: Custom color for icon and left border

2. **Layout**:
   - **Flexbox row**: Icon on left, text on right
   - **iconContainer**: Fixed width for icon
   - **textContainer**: flex: 1 (takes remaining space)

3. **Styling**:
   - **borderLeftWidth: 4**: Thick left border
   - **borderLeftColor**: Uses the color prop
   - **Shadow**: Elevation effect for depth
   - **width: '48%'**: Takes almost half screen width

4. **Typography**:
   - **value**: Large (24px), bold (700) for emphasis
   - **title**: Smaller (13px), lighter color for label
   - **Vertical spacing**: marginTop: 2 between value and title

**Architecture Fit**: Used extensively in dashboards to display statistics (user count, order count, bug count, etc.). Provides a consistent, visually appealing way to show metrics.

**Best Practices Used**:
- **Color coding**: Left border indicates category/type
- **Visual hierarchy**: Value is larger and bolder than title
- **Consistent layout**: All stat cards look the same
- **Flexible**: Works with any icon, value, and title

---

## Navigation

### AppNavigator.js
**Path**: `/src/navigation/AppNavigator.js`

**Purpose**: Root navigation component that routes users to appropriate screens based on authentication status and role.

**Detailed Explanation**:
```javascript
const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
```

**Key Concepts Explained**:

1. **Authentication State**:
   - **useAuth()**: Accesses authentication context
   - **user**: Current logged-in user (null if not logged in)
   - **loading**: Whether auth check is in progress

2. **Loading State**:
   - **ActivityIndicator**: Spinning loader
   - **Shown while**: Checking AsyncStorage for saved session
   - **Prevents**: Showing wrong screen during auth check

3. **Conditional Routing**:
   - **No user**: Show Login screen
   - **User exists**: Show role-specific stack
   - **Role-based**: Different navigation for different user types

4. **Stack Navigator**:
   - **headerShown: false**: No header on stack level
   - **Nested navigators**: Each role has its own navigator
   - **Single screen at a time**: Only one stack visible

**Architecture Fit**: This is the main routing logic of the app. It decides what users see based on their authentication status and role. It's the gatekeeper of the entire application.

**Best Practices Used**:
- **Loading state**: Shows loader during async operations
- **Protected routes**: Only authenticated users access protected screens
- **Role-based access**: Different interfaces for different roles
- **Clean separation**: Each role has its own navigator

---

### AdminStackNavigator.js
**Path**: `/src/navigation/AdminStackNavigator.js`

**Purpose**: Navigation stack for admin users, combining tab navigation with stack navigation.

**Detailed Explanation**:
```javascript
const AdminTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Dashboard') iconName = focused ? 'home' : 'home-outline';
        else if (route.name === 'Users') iconName = focused ? 'people' : 'people-outline';
        else if (route.name === 'Orders') iconName = focused ? 'cart' : 'cart-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
      tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      headerShown: false,
    })}>
      <Tab.Screen name="Dashboard" component={AdminDashboard} />
      <Tab.Screen name="Users" component={UserManagementScreen} />
      <Tab.Screen name="Orders" component={OrderManagementScreen} />
    </Tab.Navigator>
  );
};

const AdminStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: colors.surface },
      headerTintColor: colors.textPrimary,
      headerTitleStyle: { fontSize: 18, fontWeight: '600' },
      headerBackTitleVisible: false,
    }}>
      <Stack.Screen name="AdminTabs" component={AdminTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
```

**Key Concepts Explained**:

1. **Tab Navigator**:
   - **Three tabs**: Dashboard, Users, Orders
   - **Tab icons**: Home, people, cart icons
   - **Focused state**: Filled icon when active, outline when inactive
   - **Tab bar styling**: Custom colors and fonts

2. **Stack Navigator Wrapper**:
   - **Wraps tab navigator**: Allows pushing screens on top of tabs
   - **Header configuration**: Custom header style for pushed screens
   - **Back button**: Standard back navigation

3. **Tab Bar Configuration**:
   - **height: 60**: Comfortable touch target size
   - **padding**: 5px top and bottom
   - **borderTop**: Separator between content and tabs
   - **Active/inactive colors**: Visual indication of current tab

4. **Header Configuration**:
   - **backgroundColor**: Surface color for header
   - **tintColor**: Back button and title color
   - **titleStyle**: Font size and weight for title
   - **backTitleVisible: false**: No "Back" text next to back button

**Architecture Fit**: Provides admin users with a tab-based interface for main sections and stack navigation for detailed views. This is a common pattern in mobile apps.

**Best Practices Used**:
- **Tab + Stack pattern**: Combines both navigation types
- **Icon states**: Visual feedback for active/inactive tabs
- **Custom styling**: Consistent with app theme
- **Header configuration**: Professional header appearance

---

### ITStackNavigator.js
**Path**: `/src/navigation/ITStackNavigator.js`

**Purpose**: Navigation stack for IT users, similar to admin stack but with bug tracking focus.

**Detailed Explanation**:
```javascript
const ITTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Dashboard') iconName = focused ? 'home' : 'home-outline';
        else if (route.name === 'Bugs') iconName = focused ? 'bug' : 'bug-outline';
        else if (route.name === 'Users') iconName = focused ? 'people' : 'people-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
      tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      headerShown: false,
    })}>
      <Tab.Screen name="Dashboard" component={ITDashboard} />
      <Tab.Screen name="Bugs" component={BugTrackerScreen} />
      <Tab.Screen name="Users" component={UserManagementScreen} />
    </Tab.Navigator>
  );
};

const ITStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: colors.surface },
      headerTintColor: colors.textPrimary,
      headerTitleStyle: { fontSize: 18, fontWeight: '600' },
      headerBackTitleVisible: false,
    }}>
      <Stack.Screen name="ITTabs" component={ITTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="BugDetail" component={BugDetailScreen} options={{ title: 'Bug Details' }} />
    </Stack.Navigator>
  );
};
```

**Key Concepts Explained**:

1. **IT-Specific Tabs**:
   - **Dashboard**: Overview of bug statistics
   - **Bugs**: Bug tracker list
   - **Users**: User management (shared with admin)

2. **Bug Detail Screen**:
   - **Stack screen**: Pushed on top of tabs
   - **Title**: "Bug Details"
   - **Back navigation**: Returns to bug list

3. **Shared User Management**:
   - IT users can access UserManagementScreen
   - Same screen used by admin and IT
   - Demonstrates code reuse

**Architecture Fit**: Provides IT users with a focused interface for bug tracking while also allowing user management. Follows the same pattern as admin stack for consistency.

**Best Practices Used**:
- **Code reuse**: Shares UserManagementScreen with admin
- **Consistent pattern**: Same structure as AdminStackNavigator
- **Focused features**: Bug tracking is primary focus
- **Stack for details**: Bug detail pushed over tabs

---

### UserStackNavigator.js
**Path**: `/src/navigation/UserStackNavigator.js`

**Purpose**: Navigation stack for regular users, combining tab navigation with detail screens.

**Detailed Explanation**:
```javascript
const UserStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: colors.surface },
      headerTintColor: colors.textPrimary,
      headerTitleStyle: { fontSize: 18, fontWeight: '600' },
      headerBackTitleVisible: false,
    }}>
      <Stack.Screen name="UserTabs" component={UserTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} options={{ title: 'Workout Details' }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product Details' }} />
    </Stack.Navigator>
  );
};
```

**Key Concepts Explained**:

1. **Tab Navigator**:
   - **UserTabNavigator**: Contains main user screens
   - **No header**: Tabs have their own navigation
   - **Bottom tabs**: Dashboard, Workouts, Meals, Shop, Progress

2. **Detail Screens**:
   - **WorkoutDetail**: Pushed when user taps a workout level
   - **ProductDetail**: Pushed when user taps a product
   - **Both have headers**: With back buttons

3. **Header Configuration**:
   - **Consistent styling**: Same as admin and IT stacks
   - **Custom titles**: Specific to each detail screen
   - **Back navigation**: Standard behavior

**Architecture Fit**: Provides regular users with a tab-based interface for main features and stack navigation for detailed views. This is the most complex navigation stack as it has two detail screens.

**Best Practices Used**:
- **Tab + Stack pattern**: Combines both navigation types
- **Detail screens**: Separate screens for focused views
- **Consistent headers**: Same style across all stacks
- **Clear navigation**: Users always know where they are

---

### UserTabNavigator.js
**Path**: `/src/navigation/UserTabNavigator.js`

**Purpose**: Bottom tab navigator for regular users, providing access to main app features.

**Detailed Explanation**:
```javascript
const UserTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Dashboard') iconName = focused ? 'home' : 'home-outline';
        else if (route.name === 'Workouts') iconName = focused ? 'fitness' : 'fitness-outline';
        else if (route.name === 'Meals') iconName = focused ? 'restaurant' : 'restaurant-outline';
        else if (route.name === 'Shop') iconName = focused ? 'cart' : 'cart-outline';
        else if (route.name === 'Progress') iconName = focused ? 'stats-chart' : 'stats-chart-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
      tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      headerShown: false,
    })}>
      <Tab.Screen name="Dashboard" component={UserDashboard} />
      <Tab.Screen name="Workouts" component={WorkoutLevelsScreen} />
      <Tab.Screen name="Meals" component={MealPrepScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
    </Tab.Navigator>
  );
};
```

**Key Concepts Explained**:

1. **Five Main Tabs**:
   - **Dashboard**: User's personalized overview
   - **Workouts**: Workout levels and routines
   - **Meals**: Meal plans and nutrition
   - **Shop**: E-commerce for fitness products
   - **Progress**: Weight, measurements, workout history

2. **Tab Icons**:
   - **Home icon**: Dashboard
   - **Fitness icon**: Workouts
   - **Restaurant icon**: Meals
   - **Cart icon**: Shop
   - **Stats chart icon**: Progress

3. **Icon States**:
   - **Focused**: Filled icon (solid)
   - **Inactive**: Outline icon (hollow)
   - **Color**: Uses theme colors (primary for active, textSecondary for inactive)

4. **Tab Bar Styling**:
   - **Height**: 60px for comfortable touch targets
   - **Padding**: 5px top and bottom
   - **Border**: Top border separates from content
   - **Labels**: 12px font, 600 weight

**Architecture Fit**: This is the primary navigation for regular users. It provides quick access to all main features of the app. The tab bar is always visible, making navigation intuitive.

**Best Practices Used**:
- **Clear iconography**: Icons clearly represent each section
- **Visual feedback**: Active/inactive states are obvious
- **Consistent styling**: Matches app theme
- **Logical ordering**: Most used features first

---

### navigationHelpers.js
**Path**: `/src/navigation/navigationHelpers.js`

**Purpose**: Utility functions for common navigation operations, providing a cleaner API for navigation.

**Detailed Explanation**:

This file exports multiple helper functions:

1. **navigateToScreen(navigation, routeName, params)**:
   ```javascript
   export const navigateToScreen = (navigation, routeName, params = {}) => {
     navigation.navigate(routeName, params);
   };
   ```
   - Simple wrapper for navigation.navigate()
   - Provides default empty params object

2. **resetNavigationStack(navigation, routeName, params)**:
   ```javascript
   export const resetNavigationStack = (navigation, routeName, params = {}) => {
     navigation.dispatch(
       CommonActions.reset({
         index: 0,
         routes: [{ name: routeName, params }],
       })
     );
   };
   ```
   - Clears entire navigation stack
   - Navigates to specified screen as only screen
   - Used for logout or deep linking

3. **goBack(navigation)**:
   ```javascript
   export const goBack = (navigation) => {
     navigation.goBack();
   };
   ```
   - Wrapper for navigation.goBack()
   - Returns to previous screen

4. **replaceScreen(navigation, routeName, params)**:
   ```javascript
   export const replaceScreen = (navigation, routeName, params = {}) => {
     navigation.replace(routeName, params);
   };
   ```
   - Replaces current screen with new screen
   - Doesn't add to stack

5. **popScreen(navigation, count)**:
   ```javascript
   export const popScreen = (navigation, count = 1) => {
     navigation.pop(count);
   };
   ```
   - Removes specified number of screens from stack
   - Default: pop 1 screen

6. **popToTop(navigation)**:
   ```javascript
   export const popToTop = (navigation) => {
     navigation.popToTop();
   };
   ```
   - Pops all screens to first screen
   - Returns to root of stack

7. **navigateToNestedScreen(navigation, parentRoute, childRoute, params)**:
   ```javascript
   export const navigateToNestedScreen = (navigation, parentRoute, childRoute, params = {}) => {
     navigation.navigate(parentRoute, {
       screen: childRoute,
       params,
     });
   };
   ```
   - Navigates to nested navigator
   - Example: Navigate to specific tab within tab navigator

8. **navigateToTab(navigation, tabName, params)**:
   ```javascript
   export const navigateToTab = (navigation, tabName, params = {}) => {
     navigation.navigate(tabName, params);
   };
   ```
   - Specific helper for tab navigation
   - Semantically clearer than navigateToScreen

9. **navigateToDeepLink(navigation, deepLink)**:
   ```javascript
   export const navigateToDeepLink = (navigation, deepLink) => {
     navigation.dispatch(
       CommonActions.reset({
         index: 0,
         routes: [{ name: deepLink }],
       })
     );
   };
   ```
   - Handles deep linking URLs
   - Resets stack to deep link target

10. **isCurrentRoute(route, routeName)**:
    ```javascript
    export const isCurrentRoute = (route, routeName) => {
      return route.name === routeName;
    };
    ```
    - Checks if current route matches specified name
    - Useful for conditional rendering

11. **getCurrentRouteName(navigationState)**:
    ```javascript
    export const getCurrentRouteName = (navigationState) => {
      if (!navigationState) return null;
      const route = navigationState.routes[navigationState.index];
      if (route.state) return getCurrentRouteName(route.state);
      return route.name;
    };
    ```
    - Recursively finds current route name
    - Handles nested navigators

12. **navigateToWorkoutDetail(navigation, workoutLevel)**:
    ```javascript
    export const navigateToWorkoutDetail = (navigation, workoutLevel) => {
      navigation.navigate('WorkoutDetail', { workoutLevel });
    };
    ```
    - Specific helper for workout navigation
    - Passes workout level data

13. **navigateToProductDetail(navigation, product)**:
    ```javascript
    export const navigateToProductDetail = (navigation, product) => {
      navigation.navigate('ProductDetail', { product });
    };
    ```
    - Specific helper for product navigation
    - Passes product data

14. **navigateToBugDetail(navigation, bug)**:
    ```javascript
    export const navigateToBugDetail = (navigation, bug) => {
      navigation.navigate('BugDetail', { bug });
    };
    ```
    - Specific helper for bug navigation
    - Passes bug data

15. **handleBackPress(navigation, onBack)**:
    ```javascript
    export const handleBackPress = (navigation, onBack = null) => {
      if (onBack && typeof onBack === 'function') {
        const shouldGoBack = onBack();
        if (shouldGoBack === false) return true;
      }
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }
      return false;
    };
    ```
    - Handles Android back button
    - Allows custom back behavior via callback
    - Checks if can go back

16. **navigateToLogin(navigation)**:
    ```javascript
    export const navigateToLogin = (navigation) => {
      resetNavigationStack(navigation, 'Login');
    };
    ```
    - Wrapper for logout navigation
    - Resets stack to login screen

17. **navigateToDashboard(navigation, role)**:
    ```javascript
    export const navigateToDashboard = (navigation, role) => {
      switch (role) {
        case 'user': navigation.navigate('UserTabs', { screen: 'Dashboard' }); break;
        case 'admin': navigation.navigate('AdminTabs', { screen: 'Dashboard' }); break;
        case 'ituser': navigation.navigate('ITTabs', { screen: 'Dashboard' }); break;
      }
    };
    ```
    - Role-based dashboard navigation
    - Navigates to appropriate tab navigator

**Architecture Fit**: These helpers provide a cleaner, more semantic API for navigation. They abstract away the complexity of React Navigation's API and provide named functions that clearly indicate their purpose.

**Best Practices Used**:
- **Abstraction**: Hides navigation complexity
- **Semantic naming**: Function names clearly indicate purpose
- **Default parameters**: Sensible defaults reduce boilerplate
- **Type safety**: Clear parameter expectations
- **Reusability**: Common patterns extracted to helpers

---

## Screens - User

### UserDashboard.js
**Path**: `/src/screens/user/UserDashboard.js`

**Purpose**: Main dashboard for regular users, displaying personalized fitness information and quick access to features.

**Detailed Explanation**:
```javascript
const UserDashboard = ({ navigation }) => {
  const { user, logout } = useAuth();
  
  const userProgress = progressData[user?.id] || { weightHistory: [], workoutHistory: [] };
  const currentStreak = user?.streak || 0;
  const goalInfo = mealPlans[user?.goal] || mealPlans.fatloss;
  const currentLevel = workoutLevels.find(l => l.name.toLowerCase() === user?.currentLevel?.toLowerCase()) || workoutLevels[0];

  const handleLogout = async () => {
    await logout();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const getGoalDisplay = (goal) => {
    switch (goal) {
      case 'fatloss': return 'Fat Loss';
      case 'bulk': return 'Muscle Building';
      case 'recomposition': return 'Body Recomposition';
      default: return 'Not Set';
    }
  };
```

**Key Concepts Explained**:

1. **User Data Access**:
   - **useAuth()**: Gets current user and logout function
   - **progressData[user?.id]**: Gets user's progress data
   - **mealPlans[user?.goal]**: Gets meal plan for user's goal
   - **workoutLevels.find()**: Finds user's current workout level

2. **Dashboard Sections**:
   - **Header**: Welcome message and logout button
   - **Streak Card**: Displays current streak with flame icon
   - **Stats Grid**: Four stat cards (streak, level, calories, goal)
   - **Quick Actions**: Four action buttons (workout, meals, progress, shop)
   - **Current Workout**: Shows current workout level with details
   - **Today's Nutrition**: Shows daily calorie target and macros

3. **Data Transformations**:
   - **getGoalDisplay()**: Converts goal codes to readable text
   - **Fallback values**: Uses default if user data missing
   - **Case-insensitive matching**: Finds workout level regardless of case

4. **Navigation**:
   - **Action buttons**: Navigate to respective screens
   - **Logout**: Resets navigation to login screen
   - **No stack navigation**: All actions navigate to tabs

5. **Visual Design**:
   - **Streak card**: Gradient background with white text
   - **Stat cards**: Grid layout with colored left borders
   - **Action buttons**: Two-column grid with icons
   - **Workout card**: Shows difficulty stars
   - **Nutrition card**: Shows macro breakdown

**Architecture Fit**: This is the home screen for regular users. It provides a personalized overview of their fitness journey and quick access to all features. It's the first screen users see after logging in.

**Best Practices Used**:
- **Personalization**: Shows user-specific data
- **Quick access**: Buttons to all main features
- **Visual hierarchy**: Important info highlighted
- **Fallback handling**: Graceful degradation if data missing
- **Clear navigation**: Obvious paths to features

---

### WorkoutLevelsScreen.js
**Path**: `/src/screens/user/WorkoutLevelsScreen.js`

**Purpose**: Displays all available workout levels with difficulty ratings, allowing users to select their program.

**Detailed Explanation**:
```javascript
const WorkoutLevelsScreen = ({ navigation }) => {
  const { user } = useAuth();

  const handleLevelPress = (level) => {
    navigation.navigate('WorkoutDetail', { level });
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.title}>Workout Programs</Text>
        <Text style={styles.subtitle}>Choose your fitness level</Text>
      </View>

      {workoutLevels.map((level) => {
        const isCurrentLevel = level.name.toLowerCase() === user?.currentLevel?.toLowerCase();
        
        return (
          <TouchableOpacity onPress={() => handleLevelPress(level)}>
            <Card style={[styles.levelCard, isCurrentLevel && styles.currentLevelCard]}>
              <View style={styles.levelHeader}>
                <View style={styles.levelTitleContainer}>
                  <Text style={styles.levelName}>{level.name}</Text>
                  {isCurrentLevel && <Badge text="CURRENT" type="current" />}
                </View>
                <View style={styles.difficultyStars}>
                  {[...Array(5)].map((_, i) => (
                    <Ionicons
                      key={i}
                      name="star"
                      size={18}
                      color={i < level.difficulty ? '#FF9500' : '#E0E0E0'}
                    />
                  ))}
                </View>
              </View>
              <Text style={styles.levelDescription}>{level.description}</Text>
              <View style={styles.levelMeta}>
                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={18} color="#666666" />
                  <Text style={styles.metaText}>{level.duration}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="fitness-outline" size={18} color="#666666" />
                  <Text style={styles.metaText}>{level.workouts.length} Workouts</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};
```

**Key Concepts Explained**:

1. **Workout Levels Data**:
   - **5 levels**: Beginner, Moderate, Pro-Level, Elite, God-Level
   - **Difficulty**: 1-5 stars rating
   - **Duration**: Program length (e.g., "4-6 weeks")
   - **Workouts**: Array of workout routines

2. **Current Level Highlighting**:
   - **isCurrentLevel**: Compares user's level with each level
   - **Badge**: Shows "CURRENT" badge on user's level
   - **Border**: Blue border on current level card

3. **Star Rating Display**:
   - **Array(5)**: Creates array with 5 elements
   - **map()**: Renders 5 star icons
   - **Conditional color**: Filled stars are orange, empty are gray
   - **Comparison**: i < level.difficulty determines fill

4. **Card Information**:
   - **Name**: Level name (e.g., "Beginner")
   - **Description**: Brief description of the level
   - **Duration**: Time commitment
   - **Workout count**: Number of workouts in program

5. **Navigation**:
   - **handleLevelPress**: Navigates to detail screen
   - **Passes level data**: Detail screen receives full level object
   - **Stack navigation**: Pushes detail screen on top of tabs

**Architecture Fit**: This screen allows users to browse and select workout programs. It's a listing screen that leads to detail views. The current level is highlighted to help users track progress.

**Best Practices Used**:
- **Visual hierarchy**: Current level prominently displayed
- **Clear information**: Duration, difficulty, workout count
- **Touchable cards**: Each level is tappable
- **Star ratings**: Visual difficulty indicator
- **Context awareness**: Knows user's current level

---

### WorkoutDetailScreen.js
**Path**: `/src/screens/user/WorkoutDetailScreen.js`

**Purpose**: Displays detailed information about a specific workout level, including all exercises.

**Detailed Explanation**:
```javascript
const WorkoutDetailScreen = ({ route, navigation }) => {
  const { level } = route.params;

  const handleStartWorkout = () => {
    console.log('Starting workout:', level.name);
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{level.name}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <Card style={styles.levelInfoCard}>
        <Text style={styles.levelName}>{level.name}</Text>
        <Text style={styles.levelDescription}>{level.description}</Text>
        
        <View style={styles.levelMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={20} color="#666666" />
            <Text style={styles.metaText}>{level.duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="fitness-outline" size={20} color="#666666" />
            <Text style={styles.metaText}>{level.workouts.length} Workouts</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="barbell-outline" size={20} color="#666666" />
            <Text style={styles.metaText}>Difficulty {level.difficulty}/5</Text>
          </View>
        </View>
      </Card>

      <Text style={styles.sectionTitle}>Workouts</Text>

      {level.workouts.map((workout, index) => (
        <Card key={workout.id} style={styles.workoutCard}>
          <View style={styles.workoutHeader}>
            <View style={styles.workoutTitleContainer}>
              <Text style={styles.workoutNumber}>Workout {index + 1}</Text>
              <Text style={styles.workoutName}>{workout.name}</Text>
            </View>
            <TouchableOpacity style={styles.playButton} onPress={handleStartWorkout}>
              <Ionicons name="play-circle" size={40} color="#007AFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.workoutMeta}>
            <View style={styles.workoutMetaItem}>
              <Ionicons name="time-outline" size={16} color="#666666" />
              <Text style={styles.workoutMetaText}>{workout.duration}</Text>
            </View>
            <View style={styles.workoutMetaItem}>
              <Ionicons name="flame-outline" size={16} color="#666666" />
              <Text style={styles.workoutMetaText}>{workout.calories} cal</Text>
            </View>
          </View>

          <View style={styles.exercisesContainer}>
            <Text style={styles.exercisesTitle}>Exercises</Text>
            {workout.exercises.map((exercise, exIndex) => (
              <View key={exIndex} style={styles.exerciseItem}>
                <View style={styles.exerciseNumber}>
                  <Text style={styles.exerciseNumberText}>{exIndex + 1}</Text>
                </View>
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={styles.exerciseDetails}>
                    {exercise.sets} sets × {exercise.reps} reps · {exercise.rest} rest
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Card>
      ))}

      <TouchableOpacity style={styles.startButton} onPress={handleStartWorkout}>
        <Text style={styles.startButtonText}>Start Program</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
```

**Key Concepts Explained**:

1. **Route Parameters**:
   - **route.params.level**: Level data passed from previous screen
   - **Contains**: All level information (name, description, workouts, etc.)

2. **Workout Structure**:
   - **Level**: Contains multiple workouts
   - **Workout**: Contains multiple exercises
   - **Exercise**: Has name, sets, reps, rest time

3. **Exercise Information**:
   - **Name**: Exercise name (e.g., "Push-ups")
   - **Sets**: Number of sets (e.g., 3)
   - **Reps**: Repetitions per set (e.g., 10)
   - **Rest**: Rest time between sets (e.g., "60s")

4. **Visual Design**:
   - **Numbered exercises**: Circle with number for each exercise
   - **Play button**: Large icon to start workout
   - **Meta information**: Duration and calories for each workout
   - **Start button**: Full-width button at bottom

5. **Navigation**:
   - **Back button**: Returns to workout levels list
   - **Header spacer**: Centers title by balancing layout

**Architecture Fit**: This is a detail screen that shows comprehensive workout information. Users can see exactly what exercises they'll do before starting. It's a deep dive into a specific workout program.

**Best Practices Used**:
- **Comprehensive information**: All workout details visible
- **Visual hierarchy**: Workout → Exercise → Details
- **Numbered lists**: Easy to follow exercise order
- **Clear actions**: Play button and start program button
- **Back navigation**: Standard back button behavior

---

### MealPrepScreen.js
**Path**: `/src/screens/user/MealPrepScreen.js`

**Purpose**: Displays meal plans based on user's fitness goal, with options for different meal types.

**Detailed Explanation**:
```javascript
const MealPrepScreen = () => {
  const { user } = useAuth();
  const [selectedGoal, setSelectedGoal] = useState(user?.goal || 'fatloss');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const goals = [
    { id: 'fatloss', name: 'Fat Loss', calories: 1800 },
    { id: 'bulk', name: 'Muscle Building', calories: 3000 },
    { id: 'recomposition', name: 'Body Recomposition', calories: 2400 },
  ];

  const mealTypes = [
    { id: 'breakfast', name: 'Breakfast', icon: 'sunny-outline' },
    { id: 'lunch', name: 'Lunch', icon: 'restaurant-outline' },
    { id: 'snacks', name: 'Snacks', icon: 'nutrition-outline' },
    { id: 'dinner', name: 'Dinner', icon: 'moon-outline' },
  ];

  const currentPlan = mealPlans[selectedGoal];

  const handleMealPress = (meal) => {
    setSelectedMeal(meal);
    setModalVisible(true);
  };
```

**Key Concepts Explained**:

1. **State Management**:
   - **selectedGoal**: Currently selected fitness goal
   - **selectedMeal**: Meal currently being viewed in modal
   - **modalVisible**: Whether meal detail modal is open

2. **Fitness Goals**:
   - **Fat Loss**: 1800 calories/day
   - **Muscle Building**: 3000 calories/day
   - **Body Recomposition**: 2400 calories/day

3. **Meal Types**:
   - **Breakfast**: Morning meals
   - **Lunch**: Midday meals
   - **Snacks**: Between-meal options
   - **Dinner**: Evening meals

4. **Meal Information**:
   - **Name**: Meal name
   - **Calories**: Total calories
   - **Macros**: Protein, carbs, fats in grams
   - **Ingredients**: List of ingredients

5. **Goal Selection**:
   - **Three buttons**: One for each goal
   - **Active state**: Selected button has blue background
   - **Updates plan**: Changing goal updates displayed meals

6. **Modal Details**:
   - **Meal name**: Large title
   - **Calories**: Prominently displayed with icon
   - **Macros**: Grid showing protein, carbs, fats
   - **Ingredients**: Checkmark list of ingredients

**Architecture Fit**: This screen provides personalized meal planning based on user's fitness goals. Users can switch between goals and see different meal plans. The modal shows detailed nutritional information.

**Best Practices Used**:
- **State management**: Local state for selections
- **Goal-based filtering**: Shows relevant meals for each goal
- **Modal for details**: Keeps main screen clean
- **Visual feedback**: Active goal clearly indicated
- **Nutritional info**: Complete macro breakdown

---

### ShopScreen.js
**Path**: `/src/screens/user/ShopScreen.js`

**Purpose**: E-commerce interface for browsing and purchasing fitness products across multiple categories.

**Detailed Explanation**:
```javascript
const ShopScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('apparels');

  const categories = [
    { id: 'apparels', name: 'Apparels', icon: 'shirt-outline' },
    { id: 'food', name: 'Food & Supplements', icon: 'nutrition-outline' },
    { id: 'equipment', name: 'Equipment', icon: 'barbell-outline' },
    { id: 'tools', name: 'Tools', icon: 'build-outline' },
  ];

  const currentProducts = products[selectedCategory] || [];

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { product, category: selectedCategory });
  };

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product.name);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryItem, selectedCategory === item.id && styles.categoryItemActive]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Ionicons
        name={item.icon}
        size={20}
        color={selectedCategory === item.id ? '#FFFFFF' : '#666666'}
      />
      <Text
        style={[styles.categoryItemText, selectedCategory === item.id && styles.categoryItemTextActive]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductPress(item)}>
      <Card style={styles.productCard}>
        <View style={styles.productImage}>
          <Text style={styles.productEmoji}>{item.image}</Text>
        </View>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>{item.description}</Text>
        <View style={styles.productFooter}>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(item)}>
            <Ionicons name="cart" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );
```

**Key Concepts Explained**:

1. **Category Selection**:
   - **Four categories**: Apparels, Food & Supplements, Equipment, Tools
   - **Horizontal scroll**: Categories scroll horizontally
   - **Active state**: Selected category has blue background

2. **Product Display**:
   - **Two-column grid**: Products displayed in 2 columns
   - **Card component**: Each product in a card
   - **Emoji as image**: Uses emoji instead of actual images

3. **Product Information**:
   - **Name**: Product name (truncated to 2 lines)
   - **Description**: Brief description (truncated to 2 lines)
   - **Price**: Formatted to 2 decimal places
   - **Add to cart**: Button to add product to cart

4. **FlatList Components**:
   - **Category list**: Horizontal FlatList for categories
   - **Product list**: Grid FlatList (numColumns={2}) for products
   - **Key extractors**: Unique keys for efficient rendering

5. **Navigation**:
   - **Product detail**: Navigates to detail screen with product data
   - **Category**: Passed to detail screen for context

**Architecture Fit**: This is the main e-commerce screen. It provides category filtering and product browsing. The grid layout shows multiple products efficiently.

**Best Practices Used**:
- **Category filtering**: Easy to switch between product types
- **Grid layout**: Efficient use of screen space
- **FlatList optimization**: Efficient rendering of long lists
- **Text truncation**: numberOfLines prevents overflow
- **Consistent pricing**: All prices formatted the same

---

### ProductDetailScreen.js
**Path**: `/src/screens/user/ProductDetailScreen.js`

**Purpose**: Displays detailed information about a product with options for size, color, flavor, and quantity.

**Detailed Explanation**:
```javascript
const ProductDetailScreen = ({ route, navigation }) => {
  const { product, category } = route.params;
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  const hasSizes = product.sizes && product.sizes.length > 0;
  const hasColors = product.colors && product.colors.length > 0;
  const hasFlavors = product.flavors && product.flavors.length > 0;

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      size: selectedSize,
      color: selectedColor,
      flavor: selectedFlavor,
      quantity,
    };
    Alert.alert('Added to Cart', `${product.name} has been added to your cart!`);
    console.log('Added to cart:', cartItem);
  };

  const getStockStatus = () => {
    if (product.stock > 20) return { text: 'In Stock', color: '#34C759' };
    if (product.stock > 0) return { text: `Only ${product.stock} left`, color: '#FF9500' };
    return { text: 'Out of Stock', color: '#FF3B30' };
  };
```

**Key Concepts Explained**:

1. **Selection State**:
   - **selectedSize**: Currently selected size option
   - **selectedColor**: Currently selected color option
   - **selectedFlavor**: Currently selected flavor option
   - **quantity**: Quantity to purchase (default 1)

2. **Conditional Options**:
   - **hasSizes**: Only shows size selector if product has sizes
   - **hasColors**: Only shows color selector if product has colors
   - **hasFlavors**: Only shows flavor selector if product has flavors

3. **Stock Status**:
   - **In Stock**: Green badge (more than 20 items)
   - **Low Stock**: Orange badge (1-20 items)
   - **Out of Stock**: Red badge (0 items)

4. **Quantity Selector**:
   - **Minus button**: Decrements quantity (minimum 1)
   - **Plus button**: Increments quantity
   - **Display**: Shows current quantity

5. **Product Information**:
   - **Name**: Product name
   - **Price**: Formatted price
   - **Description**: Full description
   - **Stock**: Available quantity
   - **Metadata**: Weight, quantity per package

6. **Total Calculation**:
   - **price × quantity**: Calculates total cost
   - **Formatted**: 2 decimal places

**Architecture Fit**: This is a comprehensive product detail screen. It shows all product information and allows users to customize their purchase. The modal-like structure provides a complete shopping experience.

**Best Practices Used**:
- **Conditional rendering**: Only shows relevant options
- **Stock awareness**: Visual indication of availability
- **Quantity controls**: Easy to adjust quantity
- **Total calculation**: Real-time price updates
- **Clear actions**: Add to cart and buy now buttons

---

### ProgressScreen.js
**Path**: `/src/screens/user/ProgressScreen.js`

**Purpose**: Displays user's fitness progress including weight history, body measurements, and workout history.

**Detailed Explanation**:
```javascript
const ProgressScreen = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'stats-chart-outline' },
    { id: 'weight', name: 'Weight', icon: 'scale-outline' },
    { id: 'measurements', name: 'Measurements', icon: 'body-outline' },
    { id: 'workouts', name: 'Workouts', icon: 'fitness-outline' },
  ];

  const userProgress = progressData[user?.id] || {
    weightHistory: [],
    bodyMeasurements: [],
    workoutHistory: [],
  };

  const latestWeight = userProgress.weightHistory[userProgress.weightHistory.length - 1];
  const previousWeight = userProgress.weightHistory[userProgress.weightHistory.length - 2];
  const weightChange = latestWeight && previousWeight ? (latestWeight.weight - previousWeight.weight).toFixed(1) : 0;
  const weightChangePositive = weightChange > 0;

  const latestMeasurements = userProgress.bodyMeasurements[userProgress.bodyMeasurements.length - 1];
  const recentWorkouts = userProgress.workoutHistory.slice(-5).reverse();
```

**Key Concepts Explained**:

1. **Tab Navigation**:
   - **Four tabs**: Overview, Weight, Measurements, Workouts
   - **Horizontal scroll**: Tabs scroll horizontally
   - **Active state**: Selected tab has blue background

2. **Overview Tab**:
   - **Streak card**: Shows current streak with trend
   - **Weight summary**: Latest weight with change indicator
   - **Body measurements**: Grid showing chest, waist, arms, thighs
   - **Recent activity**: Last 5 workout completions

3. **Weight Tab**:
   - **Weight history**: List of all weight entries
   - **Change calculation**: Shows change from previous entry
   - **Visual indicator**: Arrow up/down with color

4. **Measurements Tab**:
   - **Measurement history**: List of all measurement entries
   - **Body parts**: Chest, waist, arms, thighs
   - **Date tracking**: When measurements were taken

5. **Workouts Tab**:
   - **Workout history**: List of all workout completions
   - **Status badges**: Completed (green) or skipped (red)
   - **Date tracking**: When workouts were done

6. **Data Calculations**:
   - **Weight change**: Current minus previous weight
   - **Positive/negative**: Determines arrow direction and color
   - **Recent workouts**: Last 5 entries, reversed (newest first)

**Architecture Fit**: This screen provides comprehensive progress tracking. Users can view their fitness journey in multiple dimensions. The tab interface allows focused viewing of different progress types.

**Best Practices Used**:
- **Tab organization**: Logical grouping of progress types
- **Visual indicators**: Arrows and colors show trends
- **Recent activity**: Shows most relevant data first
- **Empty states**: Graceful handling of no data
- **Consistent styling**: All tabs follow same pattern

---

## Screens - Admin

### AdminDashboard.js
**Path**: `/src/screens/admin/AdminDashboard.js`

**Purpose**: Main dashboard for administrators, showing system statistics and quick access to management features.

**Detailed Explanation**:
```javascript
const AdminDashboard = ({ navigation }) => {
  const { user, logout } = useAuth();

  const totalUsers = users.length;
  const activeOrders = orders.filter(o => o.status !== 'delivered').length;
  const openBugs = bugs.filter(b => b.status === 'open').length;
  const inProgressBugs = bugs.filter(b => b.status === 'in-progress').length;

  const recentActivities = [
    { type: 'order', message: 'New order #6 received', time: '2 hours ago' },
    { type: 'bug', message: 'Bug #8 reported by Mike', time: '5 hours ago' },
    { type: 'user', message: 'New user registered', time: '1 day ago' },
    { type: 'order', message: 'Order #5 delivered', time: '2 days ago' },
    { type: 'bug', message: 'Bug #7 resolved', time: '3 days ago' },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'order': return 'cart-outline';
      case 'bug': return 'bug-outline';
      case 'user': return 'person-outline';
      default: return 'ellipse';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'order': return '#007AFF';
      case 'bug': return '#FF9500';
      case 'user': return '#34C759';
      default: return '#666666';
    }
  };
```

**Key Concepts Explained**:

1. **Statistics Calculation**:
   - **Total users**: Count of all users in system
   - **Active orders**: Orders not yet delivered
   - **Open bugs**: Bugs with status 'open'
   - **In-progress bugs**: Bugs with status 'in-progress'

2. **Dashboard Sections**:
   - **Header**: Welcome message and logout button
   - **Stats grid**: Four stat cards (users, orders, open bugs, in-progress bugs)
   - **Quick actions**: Three action buttons (users, orders, bug tracker)
   - **Recent activity**: Timeline of recent system events

3. **Activity Types**:
   - **Order**: New orders, deliveries
   - **Bug**: Bug reports, resolutions
   - **User**: New user registrations

4. **Activity Display**:
   - **Icon**: Type-specific icon in colored circle
   - **Message**: Description of the activity
   - **Time**: When the activity occurred

**Architecture Fit**: This is the admin's home screen. It provides a high-level view of system status and quick access to management features. The activity feed keeps admins informed of recent events.

**Best Practices Used**:
- **Real-time statistics**: Calculated from actual data
- **Quick actions**: Direct access to management screens
- **Activity feed**: Keeps admins informed
- **Visual indicators**: Icons and colors for activity types
- **Consistent layout**: Matches user dashboard pattern

---

### UserManagementScreen.js
**Path**: `/src/screens/admin/UserManagementScreen.js`

**Purpose**: Allows administrators to view, search, and manage all system users.

**Detailed Explanation**:
```javascript
const UserManagementScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return '#FF3B30';
      case 'user': return '#007AFF';
      case 'ituser': return '#FF9500';
      default: return '#666666';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin': return 'ADMIN';
      case 'user': return 'USER';
      case 'ituser': return 'IT USER';
      default: return role.toUpperCase();
    }
  };

  const handleUserPress = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };
```

**Key Concepts Explained**:

1. **Search Functionality**:
   - **Real-time filtering**: Updates as user types
   - **Multiple fields**: Searches name, email, username
   - **Case-insensitive**: Works regardless of letter case

2. **User List Display**:
   - **Avatar**: Shows user's initials
   - **Name**: User's full name
   - **Email**: User's email address
   - **Role badge**: Color-coded role indicator

3. **User Detail Modal**:
   - **Avatar**: Large avatar (64px)
   - **User info**: Name, email, role badge
   - **Account info**: Username, role, join date
   - **Fitness info** (for users): Goal, current level, streak
   - **Edit button**: Placeholder for edit functionality

4. **Role Styling**:
   - **Admin**: Red (#FF3B30)
   - **User**: Blue (#007AFF)
   - **IT User**: Orange (#FF9500)

5. **Conditional Information**:
   - **Fitness info**: Only shown for regular users
   - **Admin/IT**: Don't have fitness-related fields

**Architecture Fit**: This screen provides comprehensive user management. Admins can search users and view detailed information. The modal pattern keeps the main list clean while showing details.

**Best Practices Used**:
- **Real-time search**: Instant filtering as user types
- **Modal details**: Doesn't leave main screen
- **Role differentiation**: Visual distinction between user types
- **Conditional rendering**: Only shows relevant fields
- **Empty state**: Handles no search results

---

### OrderManagementScreen.js
**Path**: `/src/screens/admin/OrderManagementScreen.js`

**Purpose**: Allows administrators to view and manage all orders in the system.

**Detailed Explanation**:
```javascript
const OrderManagementScreen = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return '#34C759';
      case 'shipped': return '#007AFF';
      case 'processing': return '#FF9500';
      case 'pending': return '#FF3B30';
      default: return '#666666';
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getUserById = (userId) => {
    return users.find(u => u.id === userId);
  };

  const handleOrderPress = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleUpdateStatus = () => {
    console.log('Update status for order:', selectedOrder?.id);
  };
```

**Key Concepts Explained**:

1. **Order Status Types**:
   - **Pending**: Order received, not yet processed (red)
   - **Processing**: Order being prepared (orange)
   - **Shipped**: Order in transit (blue)
   - **Delivered**: Order completed (green)

2. **Order List Display**:
   - **Order ID**: Unique identifier (e.g., "Order #1")
   - **Customer name**: Name of user who placed order
   - **Items count**: Number of products in order
   - **Total price**: Sum of all item prices
   - **Status badge**: Color-coded status indicator
   - **Order date**: When order was placed

3. **Order Detail Modal**:
   - **Order summary**: ID, status, dates
   - **Customer information**: Name, email
   - **Order items**: List of all products with quantities
   - **Pricing**: Subtotal, shipping, total
   - **Update status button**: Placeholder for status update

4. **Customer Lookup**:
   - **getUserById()**: Finds user by ID
   - **Used for**: Displaying customer name in order list

5. **Order Items**:
   - **Product name**: Name of each product
   - **Quantity**: How many of each product
   - **Price**: Price per item (price × quantity)

**Architecture Fit**: This screen provides order management functionality. Admins can view all orders and their details. The status system allows tracking order progress.

**Best Practices Used**:
- **Status color coding**: Visual indication of order state
- **Customer lookup**: Shows who placed each order
- **Detailed modal**: Complete order information
- **Status workflow**: Clear progression from pending to delivered
- **Pricing breakdown**: Shows subtotal, shipping, total

---

## Screens - IT

### ITDashboard.js
**Path**: `/src/screens/it/ITDashboard.js`

**Purpose**: Main dashboard for IT users, showing bug tracking statistics and quick access to IT features.

**Detailed Explanation**:
```javascript
const ITDashboard = ({ navigation }) => {
  const { user, logout } = useAuth();

  const openBugs = bugs.filter(b => b.status === 'open').length;
  const inProgressBugs = bugs.filter(b => b.status === 'in-progress').length;
  const resolvedBugs = bugs.filter(b => b.status === 'resolved').length;
  const totalUsers = users.length;

  const recentBugs = bugs.slice(0, 5);

  const getUserById = (userId) => {
    return users.find(u => u.id === userId);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#FF3B30';
      case 'medium': return '#FF9500';
      case 'low': return '#34C759';
      default: return '#666666';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return '#FF3B30';
      case 'in-progress': return '#FF9500';
      case 'resolved': return '#34C759';
      default: return '#666666';
    }
  };
```

**Key Concepts Explained**:

1. **Bug Statistics**:
   - **Open bugs**: New bugs not yet addressed
   - **In-progress bugs**: Bugs currently being worked on
   - **Resolved bugs**: Bugs that have been fixed
   - **Total users**: System user count

2. **Dashboard Sections**:
   - **Header**: Welcome message and logout button
   - **Stats grid**: Four stat cards (open, in-progress, resolved, total users)
   - **Quick actions**: Three action buttons (bugs, users, report bug)
   - **Recent bugs**: List of 5 most recent bugs

3. **Bug Severity**:
   - **High**: Critical bugs (red)
   - **Medium**: Important bugs (orange)
   - **Low**: Minor bugs (green)

4. **Bug Status**:
   - **Open**: Not yet addressed (red)
   - **In-progress**: Currently being worked on (orange)
   - **Resolved**: Fixed and closed (green)

5. **Bug Display**:
   - **Title**: Bug title
   - **Severity badge**: Color-coded severity
   - **Status badge**: Color-coded status
   - **Reporter**: User who reported the bug
   - **Date**: When bug was reported

**Architecture Fit**: This is the IT user's home screen. It provides a focused view of bug tracking with quick access to management features. The recent bugs list keeps IT users informed of latest issues.

**Best Practices Used**:
- **Bug-focused statistics**: Relevant metrics for IT work
- **Severity prioritization**: Visual indication of bug importance
- **Status tracking**: Clear view of bug lifecycle
- **Recent activity**: Shows most relevant bugs first
- **Consistent layout**: Matches admin dashboard pattern

---

### BugTrackerScreen.js
**Path**: `/src/screens/it/BugTrackerScreen.js`

**Purpose**: Lists all bugs with filtering by status and search functionality.

**Detailed Explanation**:
```javascript
const BugTrackerScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const statusFilters = [
    { id: 'all', name: 'All' },
    { id: 'open', name: 'Open' },
    { id: 'in-progress', name: 'In Progress' },
    { id: 'resolved', name: 'Resolved' },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#FF3B30';
      case 'medium': return '#FF9500';
      case 'low': return '#34C759';
      default: return '#666666';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return '#FF3B30';
      case 'in-progress': return '#FF9500';
      case 'resolved': return '#34C759';
      default: return '#666666';
    }
  };

  const getUserById = (userId) => {
    return users.find(u => u.id === userId);
  };

  const filteredBugs = bugs.filter(bug => {
    const matchesSearch = bug.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bug.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || bug.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleBugPress = (bug) => {
    navigation.navigate('BugDetail', { bug });
  };
```

**Key Concepts Explained**:

1. **Status Filtering**:
   - **All**: Shows all bugs regardless of status
   - **Open**: Only shows open bugs
   - **In Progress**: Only shows bugs being worked on
   - **Resolved**: Only shows fixed bugs

2. **Search Functionality**:
   - **Title search**: Matches bug titles
   - **Description search**: Matches bug descriptions
   - **Case-insensitive**: Works regardless of letter case
   - **Combined filter**: Search + status filter

3. **Bug List Display**:
   - **Title**: Bug title
   - **Reporter**: User who reported the bug
   - **Severity badge**: Color-coded severity indicator
   - **Description**: Brief bug description
   - **Status badge**: Color-coded status
   - **Date**: When bug was reported

4. **Filter Buttons**:
   - **Horizontal scroll**: Filters scroll horizontally
   - **Active state**: Selected filter has blue background
   - **Four options**: All, Open, In Progress, Resolved

**Architecture Fit**: This screen provides comprehensive bug tracking. IT users can filter bugs by status and search for specific bugs. The list view makes it easy to scan through bugs.

**Best Practices Used**:
- **Combined filtering**: Search + status filter
- **Visual feedback**: Active filter clearly indicated
- **Severity coding**: Visual indication of bug priority
- **Status coding**: Visual indication of bug state
- **Empty state**: Handles no search results

---

### BugDetailScreen.js
**Path**: `/src/screens/it/BugDetailScreen.js`

**Purpose**: Displays detailed information about a specific bug with status update functionality.

**Detailed Explanation**:
```javascript
const BugDetailScreen = ({ route }) => {
  const { bug } = route.params;
  const [status, setStatus] = useState(bug.status);
  const [comment, setComment] = useState('');

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#FF3B30';
      case 'medium': return '#FF9500';
      case 'low': return '#34C759';
      default: return '#666666';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return '#FF3B30';
      case 'in-progress': return '#FF9500';
      case 'resolved': return '#34C759';
      default: return '#666666';
    }
  };

  const handleStatusUpdate = (newStatus) => {
    Alert.alert(
      'Update Status',
      `Change bug status to ${newStatus === 'in-progress' ? 'In Progress' : newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Update', onPress: () => { setStatus(newStatus); console.log('Updated bug status to:', newStatus); } },
      ]
    );
  };

  const handleSubmitComment = () => {
    if (comment.trim()) {
      Alert.alert('Comment Submitted', 'Your comment has been added to bug.');
      setComment('');
      console.log('Comment submitted:', comment);
    } else {
      Alert.alert('Error', 'Please enter a comment.');
    }
  };

  const reporter = getUserById(bug.reportedBy);
  const assignee = bug.assignedTo ? getUserById(bug.assignedTo) : null;
```

**Key Concepts Explained**:

1. **Bug Information**:
   - **Title**: Bug title
   - **Description**: Full bug description
   - **Severity**: High, medium, or low
   - **Status**: Open, in-progress, or resolved
   - **Bug ID**: Unique identifier
   - **Reported date**: When bug was reported
   - **Resolved date**: When bug was fixed (if resolved)

2. **People Information**:
   - **Reporter**: User who reported the bug
   - **Assignee**: IT user assigned to fix the bug
   - **Role badges**: Shows user roles

3. **Status Update**:
   - **Three buttons**: Open, In Progress, Resolved
   - **Active state**: Current status has blue background
   - **Confirmation**: Alert before updating status
   - **Local state**: Updates UI immediately

4. **Comment Section**:
   - **Text input**: Multi-line input for comments
   - **Submit button**: Adds comment to bug
   - **Validation**: Checks for empty comment

5. **Visual Design**:
   - **Badges**: Severity and status prominently displayed
   - **Person cards**: Reporter and assignee information
   - **Status buttons**: Large, clear buttons with icons
   - **Comment area**: Spacious text input

**Architecture Fit**: This is a comprehensive bug detail screen. IT users can view all bug information, update status, and add comments. The screen provides complete bug management functionality.

**Best Practices Used**:
- **Confirmation dialogs**: Prevents accidental status changes
- **Local state**: Immediate UI feedback
- **Validation**: Checks for empty comments
- **Visual hierarchy**: Important information prominent
- **Complete information**: All bug details visible

---

## Login Screen

### LoginScreen.js
**Path**: `/src/screens/LoginScreen.js`

**Purpose**: Authentication screen where users enter credentials to log in to the app.

**Detailed Explanation**:
```javascript
const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setLoading(true);
    const result = await login(username, password);
    setLoading(false);

    if (!result.success) {
      Alert.alert('Login Failed', result.error);
    }
  };
```

**Key Concepts Explained**:

1. **Form State**:
   - **username**: User's username input
   - **password**: User's password input
   - **showPassword**: Whether password is visible
   - **loading**: Whether login is in progress

2. **Form Validation**:
   - **Empty fields**: Checks if username or password is empty
   - **Trim whitespace**: Removes leading/trailing spaces
   - **Alert**: Shows error message if validation fails

3. **Password Visibility Toggle**:
   - **Eye icon**: Shows/hides password
   - **secureTextEntry**: Hides password by default
   - **Toggle**: Switches between secure and plain text

4. **Login Process**:
   - **Call login()**: Authenticates with AuthContext
   - **Loading state**: Shows spinner during login
   - **Error handling**: Shows alert if login fails
   - **Success**: AuthContext handles navigation

5. **Demo Accounts**:
   - **Admin**: admin / admin123
   - **Users**: john / user123, jane / user123, mike / user123
   - **IT User**: ituser / it123
   - **Display**: Shows credentials for easy testing

6. **Keyboard Handling**:
   - **KeyboardAvoidingView**: Adjusts layout when keyboard appears
   - **Platform-specific**: Different behavior on iOS vs Android
   - **ScrollView**: Allows scrolling when keyboard is visible

**Architecture Fit**: This is the entry point for the app. It's the first screen users see. It handles authentication and provides demo accounts for testing.

**Best Practices Used**:
- **Form validation**: Checks for empty fields
- **Loading state**: Visual feedback during async operation
- **Password visibility**: User can see what they're typing
- **Error handling**: Clear error messages
- **Demo accounts**: Easy testing for developers
- **Keyboard awareness**: Adjusts layout for keyboard

---

## Context

### AuthContext.js
**Path**: `/src/context/AuthContext.js`

**Purpose**: Provides authentication state and functions throughout the app using React Context API.

**Detailed Explanation**:
```javascript
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserSession();
  }, []);

  const loadUserSession = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('currentUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error loading user session:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const foundUser = users.find(
        (u) => u.username === username && u.password === password
      );

      if (foundUser) {
        const userWithoutPassword = { ...foundUser };
        delete userWithoutPassword.password;
        
        setUser(userWithoutPassword);
        await AsyncStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        return { success: true, user: userWithoutPassword };
      } else {
        return { success: false, error: 'Invalid username or password' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login' };
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('currentUser');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: 'An error occurred during logout' };
    }
  };

  const updateUser = async (updatedUserData) => {
    try {
      const updatedUser = { ...user, ...updatedUserData };
      setUser(updatedUser);
      await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, error: 'An error occurred while updating user' };
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

**Key Concepts Explained**:

1. **React Context API**:
   - **createContext()**: Creates a context object
   - **Provider**: Component that makes context available to descendants
   - **useContext()**: Hook to access context value
   - **Global state**: Shared across entire app

2. **Authentication State**:
   - **user**: Currently logged-in user (null if not logged in)
   - **loading**: Whether auth check is in progress
   - **isAuthenticated**: Boolean derived from user state

3. **Session Persistence**:
   - **AsyncStorage**: Stores user data on device
   - **Key**: 'currentUser'
   - **JSON.stringify/parse**: Converts object to string and back
   - **Persists across app restarts**: User stays logged in

4. **Login Function**:
   - **Finds user**: Searches users array for matching credentials
   - **Removes password**: Doesn't store password in state
   - **Saves to AsyncStorage**: Persists session
   - **Returns result**: Success/failure with error message

5. **Logout Function**:
   - **Clears user state**: Sets user to null
   - **Removes from AsyncStorage**: Clears session
   - **Returns result**: Success/failure

6. **Update User Function**:
   - **Merges data**: Combines existing user data with updates
   - **Updates state**: Immediately reflects changes
   - **Persists changes**: Saves to AsyncStorage

7. **useAuth Hook**:
   - **Custom hook**: Provides easy access to auth context
   - **Error checking**: Throws error if used outside provider
   - **Returns context value**: user, loading, login, logout, updateUser, isAuthenticated

**Architecture Fit**: This is the authentication layer of the app. It manages user sessions and provides authentication functions to all components. It's wrapped around the entire app in App.js.

**Best Practices Used**:
- **Context API**: Proper state management for auth
- **AsyncStorage persistence**: Sessions survive app restarts
- **Security**: Doesn't store password in state
- **Error handling**: Try/catch for async operations
- **Custom hook**: Clean API for accessing context
- **Loading state**: Prevents showing wrong screen during auth check

---

## Data

### data.js
**Path**: `/src/data/data.js`

**Purpose**: Contains all static/mock data for the app. In production, this would be replaced with API calls.

**Detailed Explanation**:

This file exports several data collections:

1. **users Array**:
   - **5 demo users**: Admin, 3 regular users, 1 IT user
   - **User properties**: id, username, password, email, role, name, createdAt
   - **User-specific**: goal, currentLevel, streak (for regular users)
   - **Passwords**: Plain text (demo only, not production!)

2. **workoutLevels Array**:
   - **5 levels**: Beginner, Moderate, Pro-Level, Elite, God-Level
   - **Level properties**: id, name, description, duration, difficulty
   - **Workouts array**: Each level has multiple workouts
   - **Exercises array**: Each workout has multiple exercises
   - **Exercise properties**: name, sets, reps, rest
   - **Workout properties**: id, name, calories, duration

3. **mealPlans Object**:
   - **3 goals**: fatloss, bulk, recomposition
   - **Goal properties**: name, dailyCalories
   - **Meals object**: breakfast, lunch, snacks, dinner arrays
   - **Meal properties**: id, name, ingredients, calories, protein, carbs, fats
   - **Ingredients array**: List of ingredient strings

4. **products Object**:
   - **4 categories**: apparels, food, equipment, tools
   - **Product properties**: id, name, price, description, image, stock
   - **Optional properties**: sizes (apparel), colors (apparel, tools), flavors (food), weight (food), quantity (food)

5. **progressData Object**:
   - **User IDs as keys**: 2, 3, 4 (John, Jane, Mike)
   - **Weight history**: Array of { date, weight } objects
   - **Body measurements**: Array of { date, chest, waist, arms, thighs } objects
   - **Workout history**: Array of { date, workout, completed } objects

6. **bugs Array**:
   - **8 bugs**: Sample bug reports
   - **Bug properties**: id, title, description, severity, status
   - **Assignment**: reportedBy, assignedTo (user IDs)
   - **Dates**: reportedDate, resolvedDate

7. **orders Array**:
   - **6 orders**: Sample orders
   - **Order properties**: id, userId, items, total, status
   - **Items array**: Array of { productId, name, quantity, price }
   - **Dates**: orderDate, deliveryDate

**Key Concepts Explained**:

1. **Mock Data Pattern**:
   - **Static data**: Hardcoded in JavaScript
   - **No API**: All data is local
   - **Demo purposes**: For testing and development
   - **Production note**: Comment indicates should be replaced with API

2. **Data Relationships**:
   - **Users → Orders**: Orders reference user IDs
   - **Users → Bugs**: Bugs reference reporter and assignee IDs
   - **Users → Progress**: Progress data keyed by user ID
   - **Users → Meal Plans**: Users have goal that selects meal plan

3. **Data Structure**:
   - **Arrays**: Lists of items (users, workoutLevels, bugs, orders)
   - **Objects**: Keyed collections (mealPlans, products, progressData)
   - **Nested structures**: Levels → workouts → exercises

4. **Fitness Data**:
   - **Workouts**: Structured by level → workout → exercise
   - **Nutrition**: Structured by goal → meal type → meal
   - **Progress**: Time-series data for weight and measurements

5. **E-commerce Data**:
   - **Categories**: Logical grouping of products
   - **Variants**: Products can have sizes, colors, flavors
   - **Stock tracking**: Available quantity for each product

**Architecture Fit**: This is the data layer of the app. All screens pull data from this file. It's a centralized data store that would be replaced with API calls in production.

**Best Practices Used**:
- **Centralized data**: All data in one file
- **Clear structure**: Logical organization of data
- **Relationships**: Foreign keys between data types
- **Comprehensive**: Covers all app features
- **Production note**: Clear indication this is mock data

---

## Assets

### assets/
**Path**: `/assets/`

**Purpose**: Contains static assets like images, icons, and splash screens used by the app.

**Files**:
- **icon.svg**: App icon for device home screen
- **adaptive-icon.svg**: Android adaptive icon (foreground)
- **splash.svg**: Splash screen image shown while app loads
- **favicon.svg**: Browser tab icon for web version

**Key Concepts Explained**:

1. **SVG Format**:
   - **Scalable Vector Graphics**: Can scale to any size without quality loss
   - **Modern format**: Preferred over PNG for icons
   - **Small file size**: Efficient for distribution

2. **App Icon**:
   - **Displayed on**: Device home screen, app switcher
   - **Size variations**: OS generates multiple sizes automatically
   - **Reference in**: app.json configuration

3. **Adaptive Icon**:
   - **Android-specific**: Uses foreground/background layers
   - **Dynamic shapes**: Can change shape based on device
   - **Background color**: White (#ffffff) as configured

4. **Splash Screen**:
   - **Shown while**: App is loading and initializing
   - **First impression**: Sets visual tone for app
   - **Configured in**: app.json with background color

5. **Favicon**:
   - **Web version**: Icon shown in browser tab
   - **Small size**: Typically 16x16 or 32x32 pixels

**Architecture Fit**: These assets provide the visual identity of the app. They're referenced in app.json and automatically included in the build by Expo.

**Best Practices Used**:
- **SVG format**: Modern, scalable graphics
- **Proper naming**: Clear file names for purpose
- **Configuration**: Referenced in app.json
- **Consistent branding**: All assets follow same style

---

## Existing Documentation

### README.md
**Path**: `/README.md`

**Purpose**: Main project documentation providing overview, installation instructions, and usage guide.

**Content Summary**:
- **Features**: Lists all features for each user role
- **Tech Stack**: Detailed list of all technologies used
- **Installation**: Step-by-step setup instructions
- **Demo Accounts**: Credentials for testing different roles
- **Project Structure**: Tree view of all files and directories
- **Available Scripts**: npm scripts and their purposes
- **Testing Guide**: Reference to TESTING.md
- **Troubleshooting**: Common issues and solutions

**Architecture Fit**: This is the primary documentation for the project. It's the first thing developers read when exploring the project.

---

### QUICKSTART.md
**Path**: `/QUICKSTART.md`

**Purpose**: Quick start guide for developers to get up and running quickly.

**Content Summary**:
- **5-minute setup**: Fast path to running the app
- **Prerequisites checklist**: What you need before starting
- **Step-by-step instructions**: Install, start, run
- **Demo credentials**: Quick reference for testing
- **Test checklist**: Quick verification of basic functionality
- **Development workflow**: Commands for development
- **Project structure overview**: High-level file organization
- **Key components**: Important files and their purposes
- **Common issues and solutions**: Quick fixes for problems

**Architecture Fit**: This is the developer onboarding document. It helps new developers get started quickly without reading all documentation.

---

### TESTING.md
**Path**: `/TESTING.md`

**Purpose**: Comprehensive testing guide with test cases for all features and user roles.

**Content Summary**:
- **Testing prerequisites**: Environment setup requirements
- **Role-based testing**: Separate test cases for admin, user, IT
- **Screen-by-screen tests**: Detailed test cases for each screen
- **Navigation flow tests**: Testing navigation between screens
- **Integration tests**: Testing cross-feature functionality
- **Expected behaviors**: How the app should behave
- **Bug reporting template**: Standard format for reporting issues
- **Test execution checklist**: Pre-test, execution, post-test
- **Test results summary**: Table for tracking test results

**Architecture Fit**: This is the quality assurance document. It ensures all features work correctly across different user roles and scenarios.

---

## Overall Architecture Summary

### Component Architecture

The app follows a **component-based architecture** where:

1. **Reusable Components**: All UI elements (Card, Button, Modal, etc.) are in `/src/components/`
2. **Screen Components**: Each screen is a separate component in `/src/screens/`
3. **Composition**: Screens compose reusable components to build UI
4. **Props-based**: Components receive data via props for flexibility

### Navigation Architecture

The app uses **React Navigation** with a hierarchical structure:

1. **AppNavigator**: Root navigator that routes based on auth status
2. **Role-specific stacks**: Separate stacks for user, admin, IT
3. **Tab navigators**: Bottom tabs for main sections
4. **Stack navigation**: For detail screens pushed on top of tabs

### State Management Architecture

The app uses **React Context API** for global state:

1. **AuthContext**: Manages authentication state
2. **Local state**: Each component manages its own state with useState
3. **No Redux**: Simple state management without external libraries
4. **AsyncStorage**: Persists authentication state

### Data Layer Architecture

The app uses **mock data** that would be replaced with API calls:

1. **Centralized data**: All data in `/src/data/data.js`
2. **No backend**: Currently client-side only
3. **Relationships**: Foreign keys between data types
4. **Production note**: Clear indication this is temporary

### Design Patterns Used

1. **Provider Pattern**: AuthProvider wraps app for global state
2. **Component Composition**: Screens composed of reusable components
3. **Conditional Rendering**: Based on state, props, user role
4. **Helper Functions**: Navigation helpers abstract complexity
5. **Modal Pattern**: Overlays for detailed views
6. **List Rendering**: FlatList for efficient list display

### Performance Considerations

1. **FlatList**: Efficient rendering of long lists
2. **useMemo/useCallback**: Not extensively used but available
3. **Lazy loading**: Navigation lazy loads screens
4. **Optimized re-renders**: React's virtual DOM handles this
5. **Asset optimization**: SVG format for scalable graphics

### Security Considerations

1. **Password handling**: Removed from state before storage
2. **AsyncStorage**: Used for session persistence
3. **Demo credentials**: Clearly marked as demo only
4. **Role-based access**: Navigation enforces role restrictions
5. **No sensitive data in Git**: .gitignore prevents committing secrets

### Future Improvements

1. **API Integration**: Replace mock data with real backend
2. **Authentication**: Implement secure authentication (JWT, OAuth)
3. **Error handling**: Global error boundary and error logging
4. **Testing**: Unit tests, integration tests, E2E tests
5. **Performance**: Code splitting, lazy loading, memoization
6. **Offline support**: Cache data for offline use
7. **Push notifications**: For order updates, bug assignments
8. **Analytics**: Track user behavior and app performance

---

## Conclusion

This comprehensive analysis covers every file in the Gym OS Mobile Android project. The application is well-structured with clear separation of concerns:

- **Components** are reusable and focused
- **Screens** are organized by user role
- **Navigation** is hierarchical and role-based
- **State management** uses React Context API
- **Data** is centralized and mock-based

The app demonstrates good React Native and Expo practices with a clean architecture that would scale well as the project grows. The code is readable, maintainable, and follows modern React patterns.

**Document Version**: 1.0  
**Last Updated**: 2024  
**Analysis By**: Comprehensive Code Review
