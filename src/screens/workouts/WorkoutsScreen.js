import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {api} from '../../services/api';

const WorkoutsScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);

  const fetchWorkouts = async () => {
    try {
      const response = await api.get('/workouts');
      setWorkouts(response.data);
      setFilteredWorkouts(response.data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  useEffect(() => {
    if (searchText) {
      const filtered = workouts.filter(
        workout =>
          workout.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          workout.type?.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredWorkouts(filtered);
    } else {
      setFilteredWorkouts(workouts);
    }
  }, [searchText, workouts]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchWorkouts();
  };

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

  const getTypeIcon = type => {
    switch (type) {
      case 'cardio':
        return 'directions-run';
      case 'strength':
        return 'fitness-center';
      case 'flexibility':
        return 'self-improvement';
      case 'hiit':
        return 'local-fire-department';
      case 'yoga':
        return 'self-improvement';
      case 'crossfit':
        return 'sports-martial-arts';
      default:
        return 'fitness-center';
    }
  };

  const renderWorkout = ({item}) => (
    <TouchableOpacity
      style={styles.workoutCard}
      onPress={() => navigation.navigate('WorkoutDetails', {workoutId: item._id})}
      activeOpacity={0.7}>
      <View style={styles.workoutHeader}>
        <View style={styles.iconContainer}>
          <Icon name={getTypeIcon(item.type)} size={32} color="#4CAF50" />
        </View>
        <View style={styles.workoutInfo}>
          <Text style={styles.workoutName}>{item.name}</Text>
          <Text style={styles.workoutType}>{item.type}</Text>
        </View>
        <View
          style={[
            styles.difficultyBadge,
            {backgroundColor: getDifficultyColor(item.difficulty) + '20'},
          ]}>
          <Text
            style={[
              styles.difficultyText,
              {color: getDifficultyColor(item.difficulty)},
            ]}>
            {item.difficulty}
          </Text>
        </View>
      </View>
      <View style={styles.workoutDetails}>
        <View style={styles.detailItem}>
          <Icon name="schedule" size={16} color="#666" />
          <Text style={styles.detailText}>{item.duration} min</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="fitness-center" size={16} color="#666" />
          <Text style={styles.detailText}>
            {item.exercises?.length || 0} exercises
          </Text>
        </View>
        {item.caloriesBurned > 0 && (
          <View style={styles.detailItem}>
            <Icon name="local-fire-department" size={16} color="#666" />
            <Text style={styles.detailText}>{item.caloriesBurned} cal</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Workouts</Text>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search workouts..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredWorkouts}
        renderItem={renderWorkout}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="timer" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No workouts found</Text>
          </View>
        }
      />
    </View>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  listContent: {
    padding: 20,
  },
  workoutCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  workoutType: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
    textTransform: 'capitalize',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  workoutDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
});

export default WorkoutsScreen;
