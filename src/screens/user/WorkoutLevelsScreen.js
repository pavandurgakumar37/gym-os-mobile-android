import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { workoutLevels } from '../../data/data';

const WorkoutLevelsScreen = ({ navigation }) => {
  const { user } = useAuth();

  const handleLevelPress = (level) => {
    navigation.navigate('WorkoutDetail', { level });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Workout Programs</Text>
        <Text style={styles.subtitle}>Choose your fitness level</Text>
      </View>

      {workoutLevels.map((level) => {
        const isCurrentLevel = level.name.toLowerCase() === user?.currentLevel?.toLowerCase();
        
        return (
          <TouchableOpacity
            key={level.id}
            onPress={() => handleLevelPress(level)}
            activeOpacity={0.7}
          >
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
  levelCard: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  currentLevelCard: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  levelTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginRight: 10,
  },
  difficultyStars: {
    flexDirection: 'row',
  },
  levelDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
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
});

export default WorkoutLevelsScreen;
