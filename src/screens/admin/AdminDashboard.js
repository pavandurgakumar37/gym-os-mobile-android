import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/StatCard';
import ActionButton from '../../components/ActionButton';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { users, orders, bugs } from '../../data/data';

const AdminDashboard = ({ navigation }) => {
  const { user, logout } = useAuth();

  const totalUsers = users.length;
  const activeOrders = orders.filter(o => o.status !== 'delivered').length;
  const openBugs = bugs.filter(b => b.status === 'open').length;
  const inProgressBugs = bugs.filter(b => b.status === 'in-progress').length;

  const recentActivities = [
    { type: 'order', message: 'New order #6 received', time: '2 hours ago' },
    { type: 'bug', message: 'Bug #8 reported by Mike', time: '5 hours ago' },
    { type: 'user', message: 'New user registered', time: '1 day ago' },
    { type: 'order', message: 'Order #5 delivered', time: '2 days ago' },
    { type: 'bug', message: 'Bug #7 resolved', time: '3 days ago' },
  ];

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'order':
        return 'cart-outline';
      case 'bug':
        return 'bug-outline';
      case 'user':
        return 'person-outline';
      default:
        return 'ellipse';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'order':
        return '#007AFF';
      case 'bug':
        return '#FF9500';
      case 'user':
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
          <Text style={styles.userName}>{user?.name || 'Admin'}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>System Overview</Text>
      <View style={styles.statsGrid}>
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon="people"
          color="#007AFF"
        />
        <StatCard
          title="Active Orders"
          value={activeOrders}
          icon="cart"
          color="#FF9500"
        />
        <StatCard
          title="Open Bugs"
          value={openBugs}
          icon="bug"
          color="#FF3B30"
        />
        <StatCard
          title="In Progress Bugs"
          value={inProgressBugs}
          icon="construct"
          color="#5856D6"
        />
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        <ActionButton
          title="Manage Users"
          icon="people"
          color="#007AFF"
          onPress={() => navigation.navigate('Users')}
        />
        <ActionButton
          title="View Orders"
          icon="cart"
          color="#FF9500"
          onPress={() => navigation.navigate('Orders')}
        />
        <ActionButton
          title="Bug Tracker"
          icon="bug"
          color="#FF3B30"
          onPress={() => navigation.navigate('Bugs')}
        />
      </View>

      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <Card style={styles.activityCard}>
        {recentActivities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: `${getActivityColor(activity.type)}20` }]}>
              <Ionicons name={getActivityIcon(activity.type)} size={20} color={getActivityColor(activity.type)} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityMessage}>{activity.message}</Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          </View>
        ))}
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
  activityCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#999999',
  },
});

export default AdminDashboard;
