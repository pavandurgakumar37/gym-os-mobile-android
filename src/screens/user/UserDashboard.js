import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/StatCard';
import ActionButton from '../../components/ActionButton';
import Card from '../../components/Card';
import { workoutLevels, mealPlans, progressData } from '../../data/data';

const UserDashboard = ({ navigation }) => {
  const { user, logout } = useAuth();

  const userProgress = progressData[user?.id] || { weightHistory: [], workoutHistory: [] };
  const currentStreak = user?.streak || 0;
  const goalInfo = mealPlans[user?.goal] || mealPlans.fatloss;
  const currentLevel = workoutLevels.find(l => l.name.toLowerCase() === user?.currentLevel?.toLowerCase()) || workoutLevels[0];

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const getGoalDisplay = (goal) => {
    switch (goal) {
      case 'fatloss': return 'Fat Loss';
      case 'bulk': return 'Muscle Building';
      case 'recomposition': return 'Body Recomposition';
      default: return 'Not Set';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>

      <Card style={styles.streakCard}>
        <View style={styles.streakContent}>
          <Ionicons name="flame" size={32} color="#FF9500" />
          <View style={styles.streakText}>
            <Text style={styles.streakNumber}>{currentStreak}</Text>
            <Text style={styles.streakLabel}>Day Streak</Text>
          </View>
          <Text style={styles.streakMessage}>Keep it up! 🔥</Text>
        </View>
      </Card>

      <Text style={styles.sectionTitle}>Your Stats</Text>
      <View style={styles.statsGrid}>
        <StatCard
          title="Current Streak"
          value={`${currentStreak} days`}
          icon="flame"
          color="#FF9500"
        />
        <StatCard
          title="Workout Level"
          value={currentLevel.name}
          icon="fitness"
          color="#007AFF"
        />
        <StatCard
          title="Daily Calories"
          value={`${goalInfo.dailyCalories} kcal`}
          icon="restaurant"
          color="#34C759"
        />
        <StatCard
          title="Fitness Goal"
          value={getGoalDisplay(user?.goal)}
          icon="trending-up"
          color="#5856D6"
        />
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        <ActionButton
          title="Start Workout"
          icon="fitness"
          color="#007AFF"
          onPress={() => navigation.navigate('WorkoutLevels')}
        />
        <ActionButton
          title="View Meals"
          icon="restaurant"
          color="#34C759"
          onPress={() => navigation.navigate('MealPrep')}
        />
        <ActionButton
          title="Track Progress"
          icon="stats-chart"
          color="#5856D6"
          onPress={() => navigation.navigate('Progress')}
        />
        <ActionButton
          title="Shop Now"
          icon="cart"
          color="#FF9500"
          onPress={() => navigation.navigate('Shop')}
        />
      </View>

      <Text style={styles.sectionTitle}>Current Workout</Text>
      <Card style={styles.workoutCard}>
        <View style={styles.workoutHeader}>
          <Text style={styles.workoutTitle}>{currentLevel.name}</Text>
          <View style={styles.difficultyStars}>
            {[...Array(5)].map((_, i) => (
              <Ionicons
                key={i}
                name="star"
                size={16}
                color={i < currentLevel.difficulty ? '#FF9500' : '#E0E0E0'}
              />
            ))}
          </View>
        </View>
        <Text style={styles.workoutDescription}>{currentLevel.description}</Text>
        <View style={styles.workoutMeta}>
          <View style={styles.workoutMetaItem}>
            <Ionicons name="time-outline" size={16} color="#666666" />
            <Text style={styles.workoutMetaText}>{currentLevel.duration}</Text>
          </View>
          <View style={styles.workoutMetaItem}>
            <Ionicons name="fitness-outline" size={16} color="#666666" />
            <Text style={styles.workoutMetaText}>{currentLevel.workouts.length} Workouts</Text>
          </View>
        </View>
      </Card>

      <Text style={styles.sectionTitle}>Today's Nutrition</Text>
      <Card style={styles.nutritionCard}>
        <View style={styles.nutritionHeader}>
          <Ionicons name="restaurant-outline" size={24} color="#34C759" />
          <View style={styles.nutritionText}>
            <Text style={styles.nutritionTitle}>Daily Target</Text>
            <Text style={styles.nutritionCalories}>{goalInfo.dailyCalories} kcal</Text>
          </View>
        </View>
        <View style={styles.macrosGrid}>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>150g</Text>
            <Text style={styles.macroLabel}>Protein</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>180g</Text>
            <Text style={styles.macroLabel}>Carbs</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>60g</Text>
            <Text style={styles.macroLabel}>Fats</Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666666',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
    marginTop: 2,
  },
  logoutButton: {
    padding: 8,
  },
  streakCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFF3E0',
    borderWidth: 2,
    borderColor: '#FF9500',
  },
  streakContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  streakText: {
    marginLeft: 15,
    flex: 1,
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  streakLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  streakMessage: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  workoutCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
  },
  difficultyStars: {
    flexDirection: 'row',
  },
  workoutDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
  },
  workoutMeta: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  workoutMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutMetaText: {
    fontSize: 13,
    color: '#666666',
    marginLeft: 5,
  },
  nutritionCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  nutritionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  nutritionText: {
    marginLeft: 15,
    flex: 1,
  },
  nutritionTitle: {
    fontSize: 14,
    color: '#666666',
  },
  nutritionCalories: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginTop: 2,
  },
  macrosGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
  },
  macroLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
});

export default UserDashboard;
