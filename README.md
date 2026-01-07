# Gym OS Mobile Android

A comprehensive mobile fitness management application built with React Native and Expo, designed to help users track workouts, manage nutrition, monitor progress, and shop for fitness products. The app features role-based access control for administrators, regular users, and IT support staff.

## 📱 Features

### For Users
- **Dashboard**: Personalized overview with fitness stats, streak tracking, and quick access to all features
- **Workout Management**: Access to 5 workout levels (Beginner to God-Level) with detailed exercise routines
- **Meal Planning**: Customized meal plans based on fitness goals (Fat Loss, Muscle Building, Body Recomposition)
- **Progress Tracking**: Monitor weight history, body measurements, and workout completion history
- **E-Commerce**: Browse and purchase fitness apparel, supplements, equipment, and tools
- **Product Details**: View detailed product information including sizes, colors, and nutritional data

### For Administrators
- **Admin Dashboard**: Overview of system statistics and quick actions
- **User Management**: View, search, and manage all user accounts
- **Order Management**: Track and manage all orders with status updates

### For IT Support
- **IT Dashboard**: Overview of bug tracking statistics
- **Bug Tracker**: View, filter, and manage reported bugs
- **Bug Details**: Detailed view of individual bugs with severity and status tracking

## 🛠️ Tech Stack

- **Framework**: React Native 0.73.6
- **Platform**: Expo SDK 50.0.0
- **Navigation**: React Navigation 6.x
  - Stack Navigator
  - Bottom Tabs Navigator
- **State Management**: React Context API (AuthContext)
- **Data Persistence**: AsyncStorage
- **UI Components**:
  - React Native Gesture Handler
  - React Native Reanimated
  - React Native Safe Area Context
  - React Native Screens
- **Styling**: React Native StyleSheet with custom theme

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android development)
- Android device or emulator with API 21+

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gym-os-mobile-android
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on Android device/emulator**
   - Option 1: Using Expo Go app
     ```bash
     npm run android
     ```
   - Option 2: Scan QR code from Expo DevTools
     - Open Expo Go app on your Android device
     - Scan the QR code displayed in the terminal

## 🚀 How to Run on Android Using Expo Go

### Method 1: Automatic Launch
```bash
npm run android
```
This command will automatically launch the Expo development server and attempt to open the app on your connected Android device or emulator.

### Method 2: Manual QR Code Scan
1. Start the development server:
   ```bash
   npm start
   ```
2. Open Expo Go app on your Android device
3. Tap "Scan QR Code"
4. Scan the QR code displayed in your terminal or browser at http://localhost:19002

### Method 3: Using Expo DevTools
1. Start the development server:
   ```bash
   npm start
   ```
2. Press `w` in the terminal to open Expo DevTools in your browser
3. Click "Run on Android device/emulator"
4. Or scan the QR code with Expo Go

## 🔑 Demo Account Credentials

### Administrator
- **Username**: `admin`
- **Password**: `admin123`
- **Email**: `admin@gymos.com`
- **Access**: Full admin privileges including user and order management

### Regular Users
#### User 1 (Fat Loss Goal)
- **Username**: `john`
- **Password**: `user123`
- **Email**: `john@gymos.com`
- **Goal**: Fat Loss
- **Current Level**: Beginner
- **Streak**: 7 days

#### User 2 (Muscle Building Goal)
- **Username**: `jane`
- **Password**: `user123`
- **Email**: `jane@gymos.com`
- **Goal**: Muscle Building (Bulk)
- **Current Level**: Moderate
- **Streak**: 14 days

#### User 3 (Body Recomposition Goal)
- **Username**: `mike`
- **Password**: `user123`
- **Email**: `mike@gymos.com`
- **Goal**: Body Recomposition
- **Current Level**: Pro-Level
- **Streak**: 21 days

### IT Support
- **Username**: `ituser`
- **Password**: `it123`
- **Email**: `it@gymos.com`
- **Access**: Bug tracking and management features

## 📁 Project Structure

```
gym-os-mobile-android/
├── App.js                          # Main app entry point
├── package.json                    # Dependencies and scripts
├── app.json                        # Expo configuration
├── babel.config.js                 # Babel configuration
├── .gitignore                      # Git ignore rules
├── assets/                         # Static assets (images, fonts)
├── src/
│   ├── components/                 # Reusable UI components
│   │   ├── ActionButton.js        # Primary action button
│   │   ├── Avatar.js              # User avatar component
│   │   ├── Badge.js               # Status/label badge
│   │   ├── Card.js                # Content card
│   │   ├── ListItem.js            # List item component
│   │   ├── Modal.js               # Modal dialog
│   │   ├── ProgressBar.js         # Progress indicator
│   │   ├── SearchBar.js           # Search input
│   │   ├── SecondaryButton.js     # Secondary action button
│   │   └── StatCard.js            # Statistics card
│   ├── context/                    # React Context providers
│   │   └── AuthContext.js         # Authentication context
│   ├── data/                       # Static data (mock API)
│   │   └── data.js                # Users, workouts, meals, products, bugs, orders
│   ├── navigation/                 # Navigation configuration
│   │   ├── AdminStackNavigator.js # Admin screen navigation
│   │   ├── AppNavigator.js        # Root navigation
│   │   ├── ITStackNavigator.js    # IT screen navigation
│   │   ├── navigationHelpers.js   # Navigation utility functions
│   │   ├── UserStackNavigator.js # User screen navigation
│   │   └── UserTabNavigator.js   # User bottom tab navigation
│   ├── screens/                    # Screen components
│   │   ├── LoginScreen.js         # Login/authentication screen
│   │   ├── admin/                 # Admin screens
│   │   │   ├── AdminDashboard.js
│   │   │   ├── OrderManagementScreen.js
│   │   │   └── UserManagementScreen.js
│   │   ├── it/                    # IT screens
│   │   │   ├── BugDetailScreen.js
│   │   │   ├── BugTrackerScreen.js
│   │   │   └── ITDashboard.js
│   │   └── user/                  # User screens
│   │       ├── UserDashboard.js
│   │       ├── WorkoutLevelsScreen.js
│   │       ├── WorkoutDetailScreen.js
│   │       ├── MealPrepScreen.js
│   │       ├── ProgressScreen.js
│   │       ├── ShopScreen.js
│   │       └── ProductDetailScreen.js
│   └── utils/                      # Utility functions
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the Expo development server |
| `npm run android` | Run the app on Android device/emulator |
| `npm run ios` | Run the app on iOS simulator (macOS only) |
| `npm run web` | Run the app in web browser |

## 🧪 Testing Guide

For detailed testing instructions, see [TESTING.md](TESTING.md)

## 🚀 Quick Start Guide

For a quick start guide for developers, see [QUICKSTART.md](QUICKSTART.md)

## 🔍 Troubleshooting

### Common Issues

#### App won't load on Expo Go
- **Solution**: Ensure your device and computer are on the same network
- **Solution**: Clear cache in Expo Go app and try again
- **Solution**: Restart the development server with `npm start -- --clear`

#### Metro bundler issues
- **Solution**: Reset cache: `npm start -- --reset-cache`
- **Solution**: Clear node_modules and reinstall:
  ```bash
  rm -rf node_modules
  npm install
  ```

#### Navigation not working
- **Solution**: Ensure all screen components are properly exported
- **Solution**: Check that navigation names match between navigator and screen components

#### AsyncStorage not persisting data
- **Solution**: AsyncStorage data is cleared when you clear app data
- **Solution**: Check that async/await is used correctly with AsyncStorage operations

#### Styling issues
- **Solution**: Ensure SafeAreaProvider wraps your app
- **Solution**: Check that GestureHandlerRootView is at the root level

#### Build errors on Android
- **Solution**: Ensure Android SDK is properly installed
- **Solution**: Check that your device/emulator has API 21+ installed
- **Solution**: Try running `expo doctor` to diagnose issues

### Getting Help

If you encounter issues not covered here:
1. Check the Expo documentation: https://docs.expo.dev/
2. Check React Native documentation: https://reactnative.dev/
3. Review the error messages in the terminal and Expo DevTools
4. Ensure all dependencies are installed correctly

## 📝 Notes

- This app uses static/mock data stored in [`src/data/data.js`](src/data/data.js)
- In production, this should be replaced with actual API calls to a backend server
- User authentication is currently client-side only using AsyncStorage
- All data persists locally on the device until the app data is cleared

## 📄 License

This project is proprietary and confidential.

## 👥 Team

Gym OS Development Team

---

**Version**: 1.0.0  
**Last Updated**: 2024
