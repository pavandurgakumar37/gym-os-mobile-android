import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {api} from '../../services/api';

const WorkoutDetailsScreen = ({route, navigation}) => {
  const {workoutId} = route.params;
  const [loading, setLoading] = useState(true);
  const [workout, setWorkout] = useState(null);

  const fetchWorkoutDetails = async () => {
    try {
      const response = await api.get(`/workouts/${workoutId}`);
      setWorkout(response.data);
    } catch (error) {
      console.error('Error fetching workout details:', error);
      Alert.alert('Error', 'Failed to load workout details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkoutDetails();
  }, []);

  const getDifficultyColor = difficulty => {
    switch (difficulty) {
      case 'beginner':
        return '#4CAF50';
      case 'intermediate':
        return '#FF9800';
      case 'advanced':
        return '#f44336';
      default:
        return '#999';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!workout) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="error-outline" size={60} color="#999" />
        <Text style={styles.errorText}>Workout not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Icon name="fitness-center" size={48} color="#4CAF50" />
        </View>
        <Text style={styles.name}>{workout.name}</Text>
        <Text style={styles.type}>{workout.type}</Text>
        <View
          style={[
            styles.difficultyBadge,
            {backgroundColor: getDifficultyColor(workout.difficulty)},
          ]}>
          <Text style={styles.difficultyText}>
            {workout.difficulty.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Workout Overview</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Icon name="schedule" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{workout.duration} min</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="fitness-center" size={24} color="#2196F3" />
            <Text style={styles.statValue}>
              {workout.exercises?.length || 0}
            </Text>
            <Text style={styles.statLabel}>Exercises</Text>
          </View>
          {workout.caloriesBurned > 0 && (
            <View style={styles.statItem}>
              <Icon name="local-fire-department" size={24} color="#FF9800" />
              <Text style={styles.statValue}>{workout.caloriesBurned}</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
          )}
        </View>
      </View>

      {workout.description && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{workout.description}</Text>
        </View>
      )}

      {workout.exercises && workout.exercises.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercises</Text>
          {workout.exercises.map((exercise, index) => (
            <View key={index} style={styles.exerciseCard}>
              <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseNumber}>{index + 1}</Text>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
              </View>
              <View style={styles.exerciseDetails}>
                {exercise.sets && (
                  <Text style={styles.exerciseDetail}>Sets: {exercise.sets}</Text>
                )}
                {exercise.reps && (
                  <Text style={styles.exerciseDetail}>Reps: {exercise.reps}</Text>
                )}
                {exercise.duration && (
                  <Text style={styles.exerciseDetail}>
                    Duration: {exercise.duration}s
                  </Text>
                )}
                {exercise.weight && (
                  <Text style={styles.exerciseDetail}>
                    Weight: {exercise.weight}kg
                  </Text>
                )}
                {exercise.restTime && (
                  <Text style={styles.exerciseDetail}>
                    Rest: {exercise.restTime}s
                  </Text>
                )}
              </View>
              {exercise.notes && (
                <Text style={styles.exerciseNotes}>{exercise.notes}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {workout.tags && workout.tags.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tags</Text>
          <View style={styles.tagsContainer}>
            {workout.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {workout.equipmentNeeded && workout.equipmentNeeded.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Equipment Needed</Text>
          {workout.equipmentNeeded.map((equipment, index) => (
            <View key={index} style={styles.equipmentItem}>
              <Icon name="fitness-center" size={20} color="#666" />
              <Text style={styles.equipmentText}>{equipment.name}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Created By</Text>
        <View style={styles.creatorInfo}>
          <Icon name="person" size={20} color="#666" />
          <Text style={styles.creatorText}>{workout.createdBy?.name || 'Unknown'}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
  header: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  type: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textTransform: 'capitalize',
  },
  difficultyBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  exerciseCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  exerciseNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 30,
    marginRight: 15,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  exerciseDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  exerciseDetail: {
    fontSize: 14,
    color: '#666',
    marginRight: 15,
    marginBottom: 5,
  },
  exerciseNotes: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
  },
  equipmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  equipmentText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creatorText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});

export default WorkoutDetailsScreen;
