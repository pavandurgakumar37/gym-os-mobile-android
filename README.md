# GymOS - Gym Management System Mobile App

A comprehensive React Native mobile application for gym management, supporting both iOS and Android platforms. This app provides a complete solution for managing gym members, equipment, workouts, payments, and reports.

## Features

### 🏋️ Core Features
- **User Authentication** - Secure login and registration system
- **Member Management** - Add, view, and manage gym members
- **Equipment Tracking** - Monitor gym equipment status and maintenance
- **Workout Plans** - Create and manage workout routines
- **Payment Processing** - Track membership payments and transactions
- **Analytics & Reports** - Comprehensive dashboard with statistics and insights

### 📱 Mobile Features
- Cross-platform support (iOS & Android)
- Modern, intuitive UI design
- Real-time data synchronization
- Offline capability support
- Push notifications (ready for implementation)

## Tech Stack

### Frontend (Mobile App)
- **React Native 0.72.6** - Cross-platform mobile framework
- **React Navigation** - Navigation and routing
- **Axios** - HTTP client for API requests
- **Async Storage** - Local data persistence
- **React Native Vector Icons** - Icon library
- **React Native Chart Kit** - Data visualization

### Backend (API Server)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## Project Structure

```
gym-os-mobile/
├── android/                 # Android native code
├── ios/                    # iOS native code
├── src/
│   ├── screens/
│   │   ├── auth/           # Authentication screens
│   │   ├── dashboard/      # Dashboard screen
│   │   ├── members/        # Member management screens
│   │   ├── equipment/      # Equipment management screens
│   │   ├── workouts/       # Workout screens
│   │   ├── payments/       # Payment screens
│   │   ├── reports/        # Reports screen
│   │   └── profile/        # Profile screen
│   └── services/
│       └── api.js          # API service configuration
├── backend/
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── server.js           # Server entry point
│   └── package.json       # Backend dependencies
├── App.js                 # Main app component
├── package.json           # Frontend dependencies
└── README.md             # This file
```

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd gym-os-mobile
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Environment Configuration

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gym-os
JWT_SECRET=your-super-secret-jwt-key
```

### 5. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Using MongoDB locally
mongod

# Or using MongoDB Atlas (cloud)
# Update MONGODB_URI in .env with your connection string
```

### 6. Start the Backend Server

```bash
cd backend
npm start
```

The backend will run on `http://localhost:5000`

### 7. Update API URL in Mobile App

Edit `src/services/api.js` and update the API base URL:

```javascript
const API_BASE_URL = 'http://YOUR_BACKEND_IP:5000/api';
```

For Android emulator, use: `http://10.0.2.2:5000/api`
For iOS simulator, use: `http://localhost:5000/api`

### 8. Run the Mobile App

#### For Android:

```bash
npm run android
```

#### For iOS (macOS only):

```bash
cd ios
pod install
cd ..
npm run ios
```

## Usage

### First Time Setup

1. **Register an Admin Account**
   - Open the app and click "Sign Up"
   - Create an account with admin privileges
   - Note: You'll need to manually update the user role in MongoDB to 'admin'

2. **Add Members**
   - Navigate to the Members tab
   - Click the + button to add new members
   - Fill in member details and membership information

3. **Add Equipment**
   - Navigate to the Equipment tab
   - Click the + button to add equipment
   - Specify equipment type, condition, and location

4. **Create Workouts**
   - Navigate to the Workouts tab
   - Create workout plans with exercises
   - Assign workouts to members

5. **Record Payments**
   - Go to member details
   - Click "Record Payment"
   - Enter payment amount and method

### Dashboard Overview

The dashboard provides:
- Total members count
- Active members
- Equipment status
- Total workouts
- Revenue overview
- Recent activity

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Members
- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get member by ID
- `POST /api/members` - Create new member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member
- `POST /api/members/:id/attendance` - Add attendance record

### Equipment
- `GET /api/equipment` - Get all equipment
- `GET /api/equipment/:id` - Get equipment by ID
- `POST /api/equipment` - Add new equipment
- `PUT /api/equipment/:id` - Update equipment
- `DELETE /api/equipment/:id` - Delete equipment

### Workouts
- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/:id` - Get workout by ID
- `POST /api/workouts` - Create new workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

### Payments
- `GET /api/payments` - Get all payments
- `GET /api/payments/:id` - Get payment by ID
- `POST /api/payments` - Record payment
- `PUT /api/payments/:id` - Update payment
- `DELETE /api/payments/:id` - Delete payment

### Reports
- `GET /api/reports/dashboard` - Get dashboard statistics
- `GET /api/reports/members` - Get member reports
- `GET /api/reports/revenue` - Get revenue reports
- `GET /api/reports/attendance` - Get attendance reports

## Database Schema

### User
- name, email, password, role (admin/trainer/member), phone, avatar

### Member
- userId, membershipType, membershipStartDate, membershipEndDate, membershipStatus
- personalDetails (dateOfBirth, gender, address, emergencyContact)
- fitnessGoals, healthConditions, assignedTrainer, attendance, payments, workouts

### Equipment
- name, category, brand, model, serialNumber, purchaseDate, purchasePrice
- currentCondition, status, location, maintenance information

### Workout
- name, type, description, duration, difficulty, exercises
- equipmentNeeded, createdBy, assignedTo, caloriesBurned, tags

### Payment
- memberId, amount, paymentMethod, paymentStatus, paymentType
- membershipType, period, transactionId, receiptNumber

## Troubleshooting

### Backend Issues
- Ensure MongoDB is running
- Check that the port 5000 is not in use
- Verify environment variables are set correctly

### Mobile App Issues
- Clear Metro bundler cache: `npm start -- --reset-cache`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- For Android: Clean build: `cd android && ./gradlew clean`
- For iOS: Clean build: `cd ios && pod install`

### Network Issues
- Ensure your device/emulator can reach the backend
- Check firewall settings
- Verify API_BASE_URL in `src/services/api.js`

## Development

### Adding New Features

1. Create new screen in `src/screens/`
2. Add route in `App.js`
3. Create API endpoints in `backend/routes/`
4. Update database models if needed

### Code Style

- Follow React Native best practices
- Use functional components with hooks
- Implement proper error handling
- Add loading states for async operations
- Use consistent styling

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on the repository or contact the development team.

## Acknowledgments

- Built with React Native
- Backend powered by Node.js and Express
- Database: MongoDB
- Inspired by modern gym management systems
