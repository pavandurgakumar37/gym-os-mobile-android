import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../../components/SearchBar';
import ListItem from '../../components/ListItem';
import Badge from '../../components/Badge';
import { bugs, users } from '../../data/data';

const BugTrackerScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const statusFilters = [
    { id: 'all', name: 'All' },
    { id: 'open', name: 'Open' },
    { id: 'in-progress', name: 'In Progress' },
    { id: 'resolved', name: 'Resolved' },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return '#FF3B30';
      case 'medium':
        return '#FF9500';
      case 'low':
        return '#34C759';
      default:
        return '#666666';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return '#FF3B30';
      case 'in-progress':
        return '#FF9500';
      case 'resolved':
        return '#34C759';
      default:
        return '#666666';
    }
  };

  const getUserById = (userId) => {
    return users.find(u => u.id === userId);
  };

  const filteredBugs = bugs.filter(bug => {
    const matchesSearch = bug.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bug.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || bug.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleBugPress = (bug) => {
    navigation.navigate('BugDetail', { bug });
  };

  const renderBugItem = ({ item }) => {
    const reporter = getUserById(item.reportedBy);
    
    return (
      <TouchableOpacity onPress={() => handleBugPress(item)} activeOpacity={0.7}>
        <ListItem
          title={item.title}
          subtitle={reporter?.name || 'Unknown Reporter'}
          rightComponent={
            <View style={styles.bugItemRight}>
              <Badge text={item.severity.toUpperCase()} type={item.severity} />
            </View>
          }
        />
        <View style={styles.bugMeta}>
          <Text style={styles.bugDescription} numberOfLines={2}>{item.description}</Text>
          <View style={styles.bugMetaFooter}>
            <Badge 
              text={item.status === 'in-progress' ? 'IN PROGRESS' : item.status.toUpperCase()} 
              type={item.status} 
            />
            <Text style={styles.bugDate}>{item.reportedDate}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bug Tracker</Text>
        <Text style={styles.subtitle}>Track and manage bugs</Text>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search bugs..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterContainer}>
        {statusFilters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              filterStatus === filter.id && styles.filterButtonActive,
            ]}
            onPress={() => setFilterStatus(filter.id)}
          >
            <Text
              style={[
                styles.filterButtonText,
                filterStatus === filter.id && styles.filterButtonTextActive,
              ]}
            >
              {filter.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredBugs}
        renderItem={renderBugItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="bug-outline" size={64} color="#E0E0E0" />
            <Text style={styles.emptyText}>No bugs found</Text>
          </View>
        }
      />
    </View>
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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bugItemRight: {
    alignItems: 'flex-end',
  },
  bugMeta: {
    paddingHorizontal: 15,
    paddingBottom: 12,
    paddingTop: 8,
  },
  bugDescription: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 10,
    lineHeight: 18,
  },
  bugMetaFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bugDate: {
    fontSize: 12,
    color: '#999999',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
    marginTop: 15,
  },
});

export default BugTrackerScreen;
