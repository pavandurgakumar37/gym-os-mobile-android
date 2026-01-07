import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { progressData } from '../../data/data';

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

  const renderOverviewTab = () => (
    <View>
      <Card style={styles.streakCard}>
        <View style={styles.streakContent}>
          <View style={styles.streakIcon}>
            <Ionicons name="flame" size={32} color="#FF9500" />
          </View>
          <View style={styles.streakText}>
            <Text style={styles.streakNumber}>{user?.streak || 0}</Text>
            <Text style={styles.streakLabel}>Day Streak</Text>
          </View>
          <View style={styles.streakTrend}>
            <Ionicons name="trending-up" size={20} color="#34C759" />
            <Text style={styles.streakTrendText}>+2 this week</Text>
          </View>
        </View>
      </Card>

      <Card style={styles.weightSummaryCard}>
        <View style={styles.weightSummaryHeader}>
          <Text style={styles.weightSummaryTitle}>Weight Progress</Text>
          <Badge text={weightChangePositive ? '+kg' : '-kg'} type={weightChangePositive ? 'warning' : 'success'} />
        </View>
        <Text style={styles.currentWeight}>{latestWeight ? `${latestWeight.weight} kg` : 'No data'}</Text>
        <Text style={styles.weightChange}>
          {weightChange !== 0 && (
            <>
              <Ionicons
                name={weightChangePositive ? 'arrow-up' : 'arrow-down'}
                size={16}
                color={weightChangePositive ? '#FF9500' : '#34C759'}
              />
              <Text style={{ color: weightChangePositive ? '#FF9500' : '#34C759' }}>
                {Math.abs(weightChange)} kg
              </Text>
            </>
          )}
          {weightChange === 0 && <Text style={{ color: '#666666' }}>No change</Text>}
        </Text>
      </Card>

      <Text style={styles.sectionTitle}>Body Measurements</Text>
      <Card style={styles.measurementsCard}>
        <View style={styles.measurementsGrid}>
          <View style={styles.measurementItem}>
            <Ionicons name="fitness-outline" size={24} color="#007AFF" />
            <Text style={styles.measurementLabel}>Chest</Text>
            <Text style={styles.measurementValue}>{latestMeasurements ? `${latestMeasurements.chest} cm` : '--'}</Text>
          </View>
          <View style={styles.measurementItem}>
            <Ionicons name="body-outline" size={24} color="#5856D6" />
            <Text style={styles.measurementLabel}>Waist</Text>
            <Text style={styles.measurementValue}>{latestMeasurements ? `${latestMeasurements.waist} cm` : '--'}</Text>
          </View>
          <View style={styles.measurementItem}>
            <Ionicons name="hand-left-outline" size={24} color="#FF9500" />
            <Text style={styles.measurementLabel}>Arms</Text>
            <Text style={styles.measurementValue}>{latestMeasurements ? `${latestMeasurements.arms} cm` : '--'}</Text>
          </View>
          <View style={styles.measurementItem}>
            <Ionicons name="walk-outline" size={24} color="#34C759" />
            <Text style={styles.measurementLabel}>Thighs</Text>
            <Text style={styles.measurementValue}>{latestMeasurements ? `${latestMeasurements.thighs} cm` : '--'}</Text>
          </View>
        </View>
      </Card>

      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <View style={styles.activityList}>
        {recentWorkouts.length > 0 ? (
          recentWorkouts.map((workout, index) => (
            <Card key={index} style={styles.activityCard}>
              <View style={styles.activityHeader}>
                <Ionicons
                  name={workout.completed ? 'checkmark-circle' : 'close-circle'}
                  size={20}
                  color={workout.completed ? '#34C759' : '#FF3B30'}
                />
                <Text style={styles.activityWorkout}>{workout.workout}</Text>
              </View>
              <Text style={styles.activityDate}>{workout.date}</Text>
            </Card>
          ))
        ) : (
          <Card style={styles.emptyCard}>
            <Ionicons name="fitness-outline" size={48} color="#E0E0E0" />
            <Text style={styles.emptyText}>No workout history yet</Text>
          </Card>
        )}
      </View>
    </View>
  );

  const renderWeightTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Weight History</Text>
      <View style={styles.historyList}>
        {userProgress.weightHistory.length > 0 ? (
          userProgress.weightHistory.map((entry, index) => {
            const prevEntry = userProgress.weightHistory[index - 1];
            const change = prevEntry ? (entry.weight - prevEntry.weight).toFixed(1) : 0;
            const changePositive = change > 0;

            return (
              <Card key={index} style={styles.historyCard}>
                <View style={styles.historyHeader}>
                  <Text style={styles.historyDate}>{entry.date}</Text>
                  <Text style={styles.historyWeight}>{entry.weight} kg</Text>
                </View>
                {change !== 0 && (
                  <View style={styles.historyChange}>
                    <Ionicons
                      name={changePositive ? 'arrow-up' : 'arrow-down'}
                      size={16}
                      color={changePositive ? '#FF9500' : '#34C759'}
                    />
                    <Text style={[styles.historyChangeText, { color: changePositive ? '#FF9500' : '#34C759' }]}>
                      {Math.abs(change)} kg
                    </Text>
                  </View>
                )}
              </Card>
            );
          })
        ) : (
          <Card style={styles.emptyCard}>
            <Ionicons name="scale-outline" size={48} color="#E0E0E0" />
            <Text style={styles.emptyText}>No weight history yet</Text>
          </Card>
        )}
      </View>
    </View>
  );

  const renderMeasurementsTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Measurement History</Text>
      <View style={styles.historyList}>
        {userProgress.bodyMeasurements.length > 0 ? (
          userProgress.bodyMeasurements.map((entry, index) => (
            <Card key={index} style={styles.measurementHistoryCard}>
              <Text style={styles.measurementHistoryDate}>{entry.date}</Text>
              <View style={styles.measurementHistoryGrid}>
                <View style={styles.measurementHistoryItem}>
                  <Text style={styles.measurementHistoryLabel}>Chest</Text>
                  <Text style={styles.measurementHistoryValue}>{entry.chest} cm</Text>
                </View>
                <View style={styles.measurementHistoryItem}>
                  <Text style={styles.measurementHistoryLabel}>Waist</Text>
                  <Text style={styles.measurementHistoryValue}>{entry.waist} cm</Text>
                </View>
                <View style={styles.measurementHistoryItem}>
                  <Text style={styles.measurementHistoryLabel}>Arms</Text>
                  <Text style={styles.measurementHistoryValue}>{entry.arms} cm</Text>
                </View>
                <View style={styles.measurementHistoryItem}>
                  <Text style={styles.measurementHistoryLabel}>Thighs</Text>
                  <Text style={styles.measurementHistoryValue}>{entry.thighs} cm</Text>
                </View>
              </View>
            </Card>
          ))
        ) : (
          <Card style={styles.emptyCard}>
            <Ionicons name="body-outline" size={48} color="#E0E0E0" />
            <Text style={styles.emptyText}>No measurement history yet</Text>
          </Card>
        )}
      </View>
    </View>
  );

  const renderWorkoutsTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Workout History</Text>
      <View style={styles.historyList}>
        {userProgress.workoutHistory.length > 0 ? (
          userProgress.workoutHistory.map((workout, index) => (
            <Card key={index} style={styles.workoutHistoryCard}>
              <View style={styles.workoutHistoryHeader}>
                <Ionicons
                  name={workout.completed ? 'checkmark-circle' : 'close-circle'}
                  size={24}
                  color={workout.completed ? '#34C759' : '#FF3B30'}
                />
                <View style={styles.workoutHistoryInfo}>
                  <Text style={styles.workoutHistoryName}>{workout.workout}</Text>
                  <Text style={styles.workoutHistoryDate}>{workout.date}</Text>
                </View>
                <Badge text={workout.completed ? 'COMPLETED' : 'SKIPPED'} type={workout.completed ? 'success' : 'error'} />
              </View>
            </Card>
          ))
        ) : (
          <Card style={styles.emptyCard}>
            <Ionicons name="fitness-outline" size={48} color="#E0E0E0" />
            <Text style={styles.emptyText}>No workout history yet</Text>
          </Card>
        )}
      </View>
    </View>
  );

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return renderOverviewTab();
      case 'weight':
        return renderWeightTab();
      case 'measurements':
        return renderMeasurementsTab();
      case 'workouts':
        return renderWorkoutsTab();
      default:
        return renderOverviewTab();
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Progress</Text>
        <Text style={styles.subtitle}>Track your fitness journey</Text>
      </View>

      <View style={styles.tabSelector}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, selectedTab === tab.id && styles.tabActive]}
            onPress={() => setSelectedTab(tab.id)}
          >
            <Ionicons
              name={tab.icon}
              size={20}
              color={selectedTab === tab.id ? '#FFFFFF' : '#666666'}
            />
            <Text
              style={[styles.tabText, selectedTab === tab.id && styles.tabTextActive]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tabContent}>{renderTabContent()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
  tabSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  tabActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginLeft: 5,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginTop: 20,
    marginBottom: 15,
  },
  streakCard: {
    marginBottom: 20,
    backgroundColor: 'linear-gradient(135deg, #FF9500 0%, #FF6B00 100%)',
  },
  streakContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
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
  streakTrend: {
    alignItems: 'center',
  },
  streakTrendText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 2,
  },
  weightSummaryCard: {
    marginBottom: 20,
  },
  weightSummaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  weightSummaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  currentWeight: {
    fontSize: 36,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 5,
  },
  weightChange: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 14,
  },
  measurementsCard: {
    marginBottom: 20,
  },
  measurementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  measurementItem: {
    width: '48%',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  measurementLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 8,
  },
  measurementValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginTop: 2,
  },
  activityList: {
    gap: 10,
  },
  activityCard: {
    marginBottom: 0,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  activityWorkout: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 10,
  },
  activityDate: {
    fontSize: 13,
    color: '#666666',
  },
  historyList: {
    gap: 10,
  },
  historyCard: {
    marginBottom: 0,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyDate: {
    fontSize: 14,
    color: '#666666',
  },
  historyWeight: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
  },
  historyChange: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  historyChangeText: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 5,
  },
  measurementHistoryCard: {
    marginBottom: 10,
  },
  measurementHistoryDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 12,
  },
  measurementHistoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  measurementHistoryItem: {
    width: '48%',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
  },
  measurementHistoryLabel: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 4,
  },
  measurementHistoryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
  },
  workoutHistoryCard: {
    marginBottom: 10,
  },
  workoutHistoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutHistoryInfo: {
    flex: 1,
    marginLeft: 12,
  },
  workoutHistoryName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
  },
  workoutHistoryDate: {
    fontSize: 13,
    color: '#666666',
    marginTop: 2,
  },
  emptyCard: {
    alignItems: 'center',
    padding: 40,
    marginBottom: 0,
  },
  emptyText: {
    fontSize: 14,
    color: '#999999',
    marginTop: 15,
  },
});

export default ProgressScreen;
