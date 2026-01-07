# Testing Guide for Gym OS Mobile Android

This document provides comprehensive testing procedures for the Gym OS mobile application, including test cases for each user role, screen functionality, navigation flows, and expected behaviors.

## 📋 Table of Contents

1. [Testing Prerequisites](#testing-prerequisites)
2. [Testing by Role](#testing-by-role)
3. [Screen-by-Screen Test Cases](#screen-by-screen-test-cases)
4. [Navigation Flow Tests](#navigation-flow-tests)
5. [Integration Tests](#integration-tests)
6. [Expected Behaviors](#expected-behaviors)
7. [Bug Reporting Template](#bug-reporting-template)

## 🔧 Testing Prerequisites

### Before Testing
- [ ] Ensure all dependencies are installed (`npm install`)
- [ ] Start the development server (`npm start`)
- [ ] Have Expo Go app installed on Android device
- [ ] Verify device and computer are on the same network
- [ ] Clear app data before starting fresh tests (optional)

### Test Environment
- **Platform**: Android (API 21+)
- **Network**: Stable internet connection
- **Device**: Physical device or emulator
- **App Version**: 1.0.0

## 👤 Testing by Role

### 1. Administrator Role Testing

#### Login as Admin
**Credentials**:
- Username: `admin`
- Password: `admin123`

**Test Steps**:
1. Launch the app
2. Enter admin credentials
3. Tap "Login" button
4. Verify navigation to Admin Dashboard

**Expected Results**:
- Successful login
- Redirected to Admin Dashboard
- Display admin-specific statistics
- Access to User Management and Order Management

#### Admin Dashboard Tests

**TC-ADM-001: Dashboard Statistics Display**
- [ ] Verify total users count is displayed
- [ ] Verify total orders count is displayed
- [ ] Verify total bugs count is displayed
- [ ] Verify all statistics are accurate based on data

**TC-ADM-002: Quick Access Actions**
- [ ] Tap "Manage Users" button → Navigate to User Management
- [ ] Tap "Manage Orders" button → Navigate to Order Management
- [ ] Verify navigation works correctly

#### User Management Tests

**TC-ADM-003: User List Display**
- [ ] Verify all users are displayed in list
- [ ] Verify user information (name, email, role) is correct
- [ ] Verify list is scrollable if many users

**TC-ADM-004: User Search Functionality**
- [ ] Enter username in search bar
- [ ] Verify list filters by username
- [ ] Enter email in search bar
- [ ] Verify list filters by email
- [ ] Clear search → Verify all users shown again

**TC-ADM-005: User Role Display**
- [ ] Verify admin users are marked differently
- [ ] Verify regular users are marked correctly
- [ ] Verify IT users are marked correctly

#### Order Management Tests

**TC-ADM-006: Order List Display**
- [ ] Verify all orders are displayed
- [ ] Verify order ID, customer name, status, total are shown
- [ ] Verify status badges are color-coded (pending, processing, shipped, delivered)

**TC-ADM-007: Order Status Update**
- [ ] Tap on an order to view details
- [ ] Verify order details modal opens
- [ ] Change order status
- [ ] Tap "Update Status" button
- [ ] Verify status is updated in list
- [ ] Verify status badge color changes

**TC-ADM-008: Order Details View**
- [ ] Tap on an order
- [ ] Verify all order items are listed
- [ ] Verify quantities and prices are correct
- [ ] Verify total amount is accurate
- [ ] Verify order date and delivery date are shown

### 2. Regular User Role Testing

#### Login as User (John - Fat Loss Goal)
**Credentials**:
- Username: `john`
- Password: `user123`

**Test Steps**:
1. Launch the app
2. Enter user credentials
3. Tap "Login" button
4. Verify navigation to User Dashboard

**Expected Results**:
- Successful login
- Redirected to User Dashboard
- Display user-specific data (streak, goal, current level)
- Access to all user features

#### User Dashboard Tests

**TC-USR-001: Dashboard Personalization**
- [ ] Verify user name is displayed
- [ ] Verify current fitness goal is shown (Fat Loss)
- [ ] Verify current workout level is shown (Beginner)
- [ ] Verify streak count is displayed (7 days)

**TC-USR-002: Quick Stats Cards**
- [ ] Verify workout completion stat is shown
- [ ] Verify calories burned stat is shown
- [ ] Verify current weight stat is shown
- [ ] Verify all stats are accurate for user

**TC-USR-003: Dashboard Actions**
- [ ] Tap "Start Workout" → Navigate to Workout Levels
- [ ] Tap "View Meal Plan" → Navigate to Meal Prep
- [ ] Tap "Track Progress" → Navigate to Progress
- [ ] Tap "Shop Now" → Navigate to Shop
- [ ] Verify all navigations work correctly

#### Workout Levels Tests

**TC-USR-004: Workout Levels Display**
- [ ] Verify all 5 workout levels are displayed
- [ ] Verify level names (Beginner, Moderate, Pro-Level, Elite, God-Level)
- [ ] Verify descriptions are shown
- [ ] Verify difficulty indicators are displayed
- [ ] Verify duration information is shown

**TC-USR-005: Current Level Highlight**
- [ ] Verify user's current level (Beginner) is highlighted
- [ ] Verify locked levels are visually distinct
- [ ] Verify accessible levels can be tapped

**TC-USR-006: Workout Selection**
- [ ] Tap on "Beginner" level
- [ ] Navigate to Workout Detail screen
- [ ] Verify workouts for that level are displayed
- [ ] Verify workout names, duration, calories are shown

#### Workout Detail Tests

**TC-USR-007: Workout Information Display**
- [ ] Verify workout name is displayed
- [ ] Verify total duration is shown
- [ ] Verify total calories are shown
- [ ] Verify number of exercises is shown

**TC-USR-008: Exercise List Display**
- [ ] Verify all exercises are listed
- [ ] Verify exercise names are correct
- [ ] Verify sets, reps, and rest times are shown
- [ ] Verify list is scrollable

**TC-USR-009: Start Workout**
- [ ] Tap "Start Workout" button
- [ ] Verify workout tracking begins
- [ ] Verify exercise completion can be marked
- [ ] Verify workout can be completed

#### Meal Prep Tests

**TC-USR-010: Meal Plan Display**
- [ ] Verify meal plan for user's goal (Fat Loss) is shown
- [ ] Verify daily calorie target is displayed (1800)
- [ ] Verify meal categories (Breakfast, Lunch, Snacks, Dinner)

**TC-USR-011: Meal Options**
- [ ] Verify multiple meal options per category
- [ ] Verify meal names are displayed
- [ ] Verify calories, protein, carbs, fats are shown
- [ ] Verify ingredients are listed

**TC-USR-012: Meal Selection**
- [ ] Tap on a meal to view details
- [ ] Verify detailed nutritional information
- [ ] Verify ingredients list
- [ ] Verify meal can be selected for the day

#### Progress Tracking Tests

**TC-USR-013: Weight History Display**
- [ ] Verify weight history chart is displayed
- [ ] Verify data points are accurate
- [ ] Verify dates are shown on x-axis
- [ ] Verify weights are shown on y-axis

**TC-USR-014: Body Measurements**
- [ ] Verify body measurements are displayed
- [ ] Verify chest, waist, arms, thighs measurements
- [ ] Verify measurements are accurate
- [ ] Verify historical data is accessible

**TC-USR-015: Workout History**
- [ ] Verify workout completion history is shown
- [ ] Verify completed workouts are marked
- [ ] Verify missed workouts are marked
- [ ] Verify dates are displayed

#### Shop Tests

**TC-USR-016: Product Categories**
- [ ] Verify all categories are displayed (Apparel, Food, Equipment, Tools)
- [ ] Verify category tabs are functional
- [ ] Verify category switching works

**TC-USR-017: Product List Display**
- [ ] Verify products in each category are listed
- [ ] Verify product names, prices, descriptions are shown
- [ ] Verify product images/icons are displayed
- [ ] Verify stock information is shown

**TC-USR-018: Product Search**
- [ ] Enter product name in search bar
- [ ] Verify list filters correctly
- [ ] Verify search is case-insensitive
- [ ] Clear search → Verify all products shown

**TC-USR-019: Product Details**
- [ ] Tap on a product
- [ ] Navigate to Product Detail screen
- [ ] Verify all product information is displayed
- [ ] Verify size/color options are shown (if applicable)
- [ ] Verify "Add to Cart" button is available

#### Product Detail Tests

**TC-USR-020: Product Information**
- [ ] Verify product name is displayed
- [ ] Verify price is shown
- [ ] Verify description is complete
- [ ] Verify product image/icon is displayed

**TC-USR-021: Product Options**
- [ ] Verify size options are available (if applicable)
- [ ] Verify color options are available (if applicable)
- [ ] Verify flavor options are available (if applicable)
- [ ] Verify stock quantity is shown

**TC-USR-022: Add to Cart**
- [ ] Select product options
- [ ] Tap "Add to Cart" button
- [ ] Verify success message is displayed
- [ ] Verify cart count updates

### 3. IT User Role Testing

#### Login as IT User
**Credentials**:
- Username: `ituser`
- Password: `it123`

**Test Steps**:
1. Launch the app
2. Enter IT credentials
3. Tap "Login" button
4. Verify navigation to IT Dashboard

**Expected Results**:
- Successful login
- Redirected to IT Dashboard
- Display bug tracking statistics
- Access to Bug Tracker

#### IT Dashboard Tests

**TC-IT-001: Dashboard Statistics Display**
- [ ] Verify total bugs count is displayed
- [ ] Verify open bugs count is displayed
- [ ] Verify in-progress bugs count is displayed
- [ ] Verify resolved bugs count is displayed

**TC-IT-002: Quick Access Actions**
- [ ] Tap "View All Bugs" → Navigate to Bug Tracker
- [ ] Verify navigation works correctly

#### Bug Tracker Tests

**TC-IT-003: Bug List Display**
- [ ] Verify all bugs are displayed
- [ ] Verify bug titles, severity, status are shown
- [ ] Verify severity badges are color-coded (high, medium, low)
- [ ] Verify status badges are color-coded (open, in-progress, resolved)

**TC-IT-004: Bug Filtering**
- [ ] Tap on "All" filter → Verify all bugs shown
- [ ] Tap on "Open" filter → Verify only open bugs shown
- [ ] Tap on "In Progress" filter → Verify only in-progress bugs shown
- [ ] Tap on "Resolved" filter → Verify only resolved bugs shown
- [ ] Verify filters work correctly

**TC-IT-005: Bug Severity Display**
- [ ] Verify high severity bugs are marked prominently
- [ ] Verify medium severity bugs are marked appropriately
- [ ] Verify low severity bugs are marked appropriately

#### Bug Detail Tests

**TC-IT-006: Bug Information Display**
- [ ] Tap on a bug
- [ ] Verify bug title is displayed
- [ ] Verify bug description is complete
- [ ] Verify severity is shown
- [ ] Verify status is shown
- [ ] Verify reported date is shown
- [ ] Verify assigned to information is shown

**TC-IT-007: Bug Status Update**
- [ ] Change bug status
- [ ] Tap "Update Status" button
- [ ] Verify status is updated in list
- [ ] Verify status badge color changes

**TC-IT-008: Bug Resolution**
- [ ] For an open bug, change status to "resolved"
- [ ] Verify resolved date is set
- [ ] Verify bug moves to resolved filter

## 🔄 Screen-by-Screen Test Cases

### Login Screen

**TC-LOGIN-001: Valid Credentials**
- [ ] Enter valid username and password
- [ ] Tap "Login"
- [ ] Verify successful login
- [ ] Verify navigation to appropriate dashboard

**TC-LOGIN-002: Invalid Credentials**
- [ ] Enter invalid username or password
- [ ] Tap "Login"
- [ ] Verify error message is displayed
- [ ] Verify user remains on login screen

**TC-LOGIN-003: Empty Fields**
- [ ] Leave username empty
- [ ] Tap "Login"
- [ ] Verify validation error is shown
- [ ] Leave password empty
- [ ] Tap "Login"
- [ ] Verify validation error is shown

**TC-LOGIN-004: Role-Based Navigation**
- [ ] Login as admin → Navigate to Admin Dashboard
- [ ] Login as user → Navigate to User Dashboard
- [ ] Login as ituser → Navigate to IT Dashboard
- [ ] Verify correct dashboard for each role

**TC-LOGIN-005: Logout**
- [ ] Login with any account
- [ ] Tap logout button
- [ ] Verify user is logged out
- [ ] Verify navigation to Login screen
- [ ] Verify session is cleared

### Navigation Tests

**TC-NAV-001: Bottom Tab Navigation (User)**
- [ ] Tap "Dashboard" tab → Navigate to User Dashboard
- [ ] Tap "Workouts" tab → Navigate to Workout Levels
- [ ] Tap "Meals" tab → Navigate to Meal Prep
- [ ] Tap "Progress" tab → Navigate to Progress
- [ ] Tap "Shop" tab → Navigate to Shop
- [ ] Verify all tabs work correctly

**TC-NAV-002: Stack Navigation**
- [ ] Navigate from Dashboard → Workout Levels → Workout Detail
- [ ] Verify back button works at each level
- [ ] Verify navigation history is maintained

**TC-NAV-003: Modal Navigation**
- [ ] Open order details modal
- [ ] Close modal
- [ ] Verify return to previous screen
- [ ] Open product details
- [ ] Verify navigation to detail screen

**TC-NAV-004: Deep Linking**
- [ ] Navigate to specific screen
- [ ] Verify correct screen is displayed
- [ ] Verify data is loaded correctly

## 🧪 Integration Tests

### Authentication Integration

**TC-INT-001: Login Persistence**
- [ ] Login with valid credentials
- [ ] Close the app
- [ ] Reopen the app
- [ ] Verify user remains logged in
- [ ] Verify correct dashboard is displayed

**TC-INT-002: Session Expiration**
- [ ] Login with valid credentials
- [ ] Wait for session timeout (if implemented)
- [ ] Verify user is logged out
- [ ] Verify navigation to Login screen

**TC-INT-003: Multiple Device Login**
- [ ] Login on device A
- [ ] Login on device B (if supported)
- [ ] Verify behavior (depends on implementation)

### Data Integration

**TC-INT-004: Workout Progress Sync**
- [ ] Complete a workout
- [ ] Navigate to Progress screen
- [ ] Verify workout is marked as completed
- [ ] Verify stats are updated

**TC-INT-005: Order Creation**
- [ ] Add products to cart
- [ ] Place order
- [ ] Login as admin
- [ ] Verify order appears in Order Management

**TC-INT-006: Bug Reporting**
- [ ] Login as user
- [ ] Report a bug (if feature exists)
- [ ] Login as ituser
- [ ] Verify bug appears in Bug Tracker

## ✅ Expected Behaviors

### General Behaviors
- App should load within 3 seconds on decent network
- All screens should be responsive and smooth
- Navigation should be intuitive and consistent
- Data should load without errors
- Error messages should be clear and helpful
- Loading states should be shown during data fetching

### Authentication Behaviors
- Login should validate credentials
- Session should persist across app restarts
- Logout should clear all session data
- Role-based access should be enforced

### UI/UX Behaviors
- Buttons should have visual feedback on tap
- Forms should validate input before submission
- Lists should be scrollable when content exceeds screen
- Modals should close properly
- Back navigation should work consistently

### Data Behaviors
- Data should display accurately
- Updates should reflect immediately
- Search/filter should work in real-time
- Charts should render correctly
- Images should load properly

## 🐛 Bug Reporting Template

When reporting bugs, use the following template:

```
**Bug ID**: TC-XXX-XXX
**Title**: [Brief description]
**Severity**: [High/Medium/Low]
**Priority**: [P1/P2/P3]
**Environment**: 
- Device: [Device model]
- OS Version: [Android version]
- App Version: [1.0.0]

**Steps to Reproduce**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Behavior**: [What should happen]
**Actual Behavior**: [What actually happens]

**Screenshots/Videos**: [Attach if applicable]

**Additional Notes**: [Any other relevant information]
```

## 📊 Test Execution Checklist

### Pre-Test Checklist
- [ ] Development server is running
- [ ] Device/emulator is connected
- [ ] Network connection is stable
- [ ] App is freshly installed (optional)

### Test Execution
- [ ] Execute all test cases for each role
- [ ] Document all results
- [ ] Report any bugs found
- [ ] Take screenshots of issues

### Post-Test Checklist
- [ ] All test cases completed
- [ ] All bugs documented
- [ ] Test results summarized
- [ ] Recommendations noted

## 📈 Test Results Summary

| Role | Total Tests | Passed | Failed | Blocked |
|------|-------------|--------|--------|---------|
| Admin | - | - | - | - |
| User | - | - | - | - |
| IT | - | - | - | - |
| **Total** | - | - | - | - |

---

**Document Version**: 1.0  
**Last Updated**: 2024  
**Maintained By**: QA Team
