import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';

const WorkoutDetailScreen = ({ route, navigation }) => {
  const { level } = route.params;

  const handleStartWorkout = () => {
    // Placeholder for workout start functionality
    console.log('Starting workout:', level.name);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 34,
  },
  levelInfoCard: {
    margin: 20,
    marginBottom: 15,
  },
  levelName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 10,
  },
  levelDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
    lineHeight: 20,
  },
  levelMeta: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 13,
    color: '#666666',
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  workoutCard: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  workoutTitleContainer: {
    flex: 1,
  },
  workoutNumber: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 5,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
  },
  playButton: {
    padding: 5,
  },
  workoutMeta: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
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
  exercisesContainer: {
    marginTop: 10,
  },
  exercisesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 15,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  exerciseNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exerciseNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 3,
  },
  exerciseDetails: {
    fontSize: 13,
    color: '#666666',
  },
  startButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default WorkoutDetailScreen;
