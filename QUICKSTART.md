# Quick Start Guide for Gym OS Mobile Android

This guide helps developers get up and running with the Gym OS mobile application quickly.

## 🚀 Quick Setup (5 Minutes)

### Prerequisites Check
Before starting, ensure you have:
- ✅ Node.js v16 or higher installed
- ✅ npm or yarn package manager
- ✅ Android device or emulator
- ✅ Expo Go app installed on your Android device

### Step 1: Install Dependencies
```bash
npm install
```
This will install all required packages. Expected time: 1-2 minutes.

### Step 2: Start Development Server
```bash
npm start
```
This starts the Expo development server. You'll see a QR code in the terminal.

### Step 3: Run on Android Device

**Option A: Using Expo Go (Recommended)**
1. Open Expo Go app on your Android device
2. Tap "Scan QR Code"
3. Scan the QR code from your terminal
4. Wait for the app to load (first time may take 1-2 minutes)

**Option B: Using Android Emulator**
```bash
npm run android
```
This will automatically launch the app on your connected emulator.

### Step 4: Login and Test
Use these demo credentials to test different roles:

**Admin**:
- Username: `admin`
- Password: `admin123`

**User**:
- Username: `john`
- Password: `user123`

**IT Support**:
- Username: `ituser`
- Password: `it123`

## 📱 Testing the App

### Quick Test Checklist (5 Minutes)

**Test 1: Login Flow**
- [ ] Login with admin credentials
- [ ] Verify you see Admin Dashboard
- [ ] Logout
- [ ] Login with user credentials
- [ ] Verify you see User Dashboard

**Test 2: Navigation**
- [ ] Tap through all bottom tabs (Dashboard, Workouts, Meals, Progress, Shop)
- [ ] Verify each screen loads correctly
- [ ] Use back button to navigate back

**Test 3: Core Features**
- [ ] View workout levels and tap on one
- [ ] Browse meal plans
- [ ] Check progress charts
- [ ] Browse shop products

## 🔧 Development Workflow

### Running the App

**Start Development Server:**
```bash
npm start
```

**Run on Android:**
```bash
npm run android
```

**Run on iOS (macOS only):**
```bash
npm run ios
```

**Run on Web:**
```bash
npm run web
```

### Common Development Commands

**Clear Cache:**
```bash
npm start -- --clear
```

**Reset Metro Bundler:**
```bash
npm start -- --reset-cache
```

**Open DevTools:**
```bash
# Press 'w' in the terminal after running npm start
```

### Making Changes

1. Make code changes in your editor
2. Save the file
3. The app will automatically reload (Fast Refresh)
4. Verify your changes on the device/emulator

### Debugging

**View Logs:**
- Terminal shows compilation errors
- Use `console.log()` in your code
- View device logs with: `adb logcat` (for Android)

**React Native Debugger:**
1. Shake device (Cmd+M on emulator)
2. Tap "Debug"
3. Opens Chrome DevTools

**Network Inspector:**
1. Shake device (Cmd+M on emulator)
2. Tap "Debug"
3. Chrome DevTools → Network tab

## 📂 Project Structure Overview

```
gym-os-mobile-android/
├── src/
│   ├── components/      # Reusable UI components
│   ├── context/        # Authentication context
│   ├── data/           # Mock data (replace with API in production)
│   ├── navigation/     # Navigation configuration
│   └── screens/        # All screen components
│       ├── admin/      # Admin-specific screens
│       ├── it/         # IT-specific screens
│       └── user/       # User-specific screens
├── App.js              # Main app entry point
└── package.json        # Dependencies
```

## 🎨 Key Components

### Authentication
- **File**: `src/context/AuthContext.js`
- Manages user login/logout state
- Stores session in AsyncStorage
- Provides user data to all screens

### Navigation
- **Files**: `src/navigation/*.js`
- Role-based navigation (Admin/User/IT)
- Stack and tab navigators
- Protected routes

### Data Layer
- **File**: `src/data/data.js`
- Contains all mock data
- Users, workouts, meals, products, bugs, orders
- Replace with API calls in production

### UI Components
- **Directory**: `src/components/`
- Reusable components (Card, Button, Modal, etc.)
- Consistent styling
- Props-based customization

## 🔑 Important Notes

### Data Persistence
- User sessions are stored in AsyncStorage
- Data persists across app restarts
- Clear app data to reset (Settings → Apps → Gym OS → Clear Data)

### Role-Based Access
- Admin: Full system access
- User: Fitness tracking and shopping
- IT: Bug tracking and management
- Navigation is role-specific

### Styling
- Uses React Native StyleSheet
- Custom theme colors
- Responsive design
- Safe area handling

### Performance
- Fast Refresh enabled
- Lazy loading for navigation
- Optimized re-renders
- Efficient data structures

## 🐛 Common Issues and Solutions

### Issue: App won't load on Expo Go
**Solution**: 
- Ensure device and computer are on same network
- Clear Expo Go cache
- Restart development server with `npm start -- --clear`

### Issue: Metro bundler errors
**Solution**:
```bash
npm start -- --reset-cache
```

### Issue: Dependencies not installing
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Navigation not working
**Solution**:
- Check screen component exports
- Verify navigation names match
- Ensure all screens are imported correctly

### Issue: Styling issues on different devices
**Solution**:
- Use percentage-based widths
- Test on multiple screen sizes
- Use SafeAreaView for notched devices

## 📚 Additional Resources

### Documentation
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)

### Project Documentation
- [README.md](README.md) - Complete project overview
- [TESTING.md](TESTING.md) - Comprehensive testing guide
- [android-app-spec.md](android-app-spec.md) - Detailed app specification

## 🎯 Next Steps

1. **Explore the Codebase**
   - Read through screen components
   - Understand the navigation structure
   - Review the data layer

2. **Make Your First Change**
   - Try modifying a screen
   - Test the change on your device
   - Verify it works as expected

3. **Add a New Feature**
   - Create a new component
   - Add navigation to it
   - Test thoroughly

4. **Contribute**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation

## 💡 Tips for Development

### Code Style
- Use functional components with hooks
- Follow existing naming conventions
- Add comments for complex logic
- Keep components small and focused

### Performance
- Use `useMemo` and `useCallback` for expensive operations
- Avoid inline functions in render
- Optimize lists with `key` prop
- Use `React.memo` for pure components

### Testing
- Test on real devices, not just emulators
- Test on different screen sizes
- Test with different user roles
- Check for memory leaks

### Debugging
- Use `console.log` for quick debugging
- Use React Native Debugger for complex issues
- Check the terminal for compilation errors
- Use Chrome DevTools for network inspection

## 📞 Getting Help

If you encounter issues:
1. Check the troubleshooting section in README.md
2. Review the error messages carefully
3. Search the Expo and React Native documentation
4. Ask the development team

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**For**: Gym OS Development Team
