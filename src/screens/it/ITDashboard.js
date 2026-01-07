import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/StatCard';
import ActionButton from '../../components/ActionButton';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { bugs, users } from '../../data/data';

const ITDashboard = ({ navigation }) => {
  const { user, logout } = useAuth();

  const openBugs = bugs.filter(b => b.status === 'open').length;
  const inProgressBugs = bugs.filter(b => b.status === 'in-progress').length;
  const resolvedBugs = bugs.filter(b => b.status === 'resolved').length;
  const totalUsers = users.length;

  const recentBugs = bugs.slice(0, 5);

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const getUserById = (userId) => {
    return users.find(u => u.id === userId);
  };

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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name || 'IT Support'}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Bug Tracking Overview</Text>
      <View style={styles.statsGrid}>
        <StatCard
          title="Open Bugs"
          value={openBugs}
          icon="bug"
          color="#FF3B30"
        />
        <StatCard
          title="In Progress"
          value={inProgressBugs}
          icon="construct"
          color="#FF9500"
        />
        <StatCard
          title="Resolved"
          value={resolvedBugs}
          icon="checkmark-circle"
          color="#34C759"
        />
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon="people"
          color="#007AFF"
        />
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        <ActionButton
          title="View All Bugs"
          icon="bug"
          color="#FF3B30"
          onPress={() => navigation.navigate('Bugs')}
        />
        <ActionButton
          title="Manage Users"
          icon="people"
          color="#007AFF"
          onPress={() => navigation.navigate('Users')}
        />
        <ActionButton
          title="Report Bug"
          icon="add-circle"
          color="#FF9500"
          onPress={() => console.log('Report bug')}
        />
      </View>

      <Text style={styles.sectionTitle}>Recent Bugs</Text>
      <Card style={styles.bugsCard}>
        {recentBugs.map((bug) => {
          const reporter = getUserById(bug.reportedBy);
          return (
            <View key={bug.id} style={styles.bugItem}>
              <View style={styles.bugHeader}>
                <Text style={styles.bugTitle} numberOfLines={1}>{bug.title}</Text>
                <View style={styles.bugBadges}>
                  <Badge text={bug.severity.toUpperCase()} type={bug.severity} />
                </View>
              </View>
              <View style={styles.bugMeta}>
                <Text style={styles.bugReporter}>Reported by {reporter?.name || 'Unknown'}</Text>
                <Badge text={bug.status === 'in-progress' ? 'IN PROGRESS' : bug.status.toUpperCase()} type={bug.status} />
              </View>
              <Text style={styles.bugDate}>{bug.reportedDate}</Text>
            </View>
          );
        })}
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
  bugsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  bugItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  bugHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bugTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginRight: 10,
  },
  bugBadges: {
    flexDirection: 'row',
  },
  bugMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  bugReporter: {
    fontSize: 13,
    color: '#666666',
  },
  bugDate: {
    fontSize: 12,
    color: '#999999',
  },
});

export default ITDashboard;
