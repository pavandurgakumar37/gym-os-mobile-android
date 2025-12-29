import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {api} from '../../services/api';

const DashboardScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/reports/dashboard');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  const StatCard = ({title, value, icon, color, onPress}) => (
    <TouchableOpacity
      style={styles.statCard}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={[styles.iconContainer, {backgroundColor: color + '20'}]}>
        <Icon name={icon} size={32} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
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
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <Text style={styles.headerSubtitle}>Welcome back!</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <StatCard
          title="Total Members"
          value={stats?.members?.total || 0}
          icon="people"
          color="#4CAF50"
          onPress={() => navigation.navigate('Members')}
        />
        <StatCard
          title="Active Members"
          value={stats?.members?.active || 0}
          icon="person-check"
          color="#2196F3"
          onPress={() => navigation.navigate('Members')}
        />
        <StatCard
          title="Equipment"
          value={stats?.equipment?.total || 0}
          icon="fitness-center"
          color="#FF9800"
          onPress={() => navigation.navigate('Equipment')}
        />
        <StatCard
          title="Workouts"
          value={stats?.workouts?.total || 0}
          icon="timer"
          color="#9C27B0"
          onPress={() => navigation.navigate('Workouts')}
        />
      </View>

      {/* Revenue Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Revenue Overview</Text>
        <View style={styles.revenueCard}>
          <View style={styles.revenueItem}>
            <Text style={styles.revenueLabel}>Total Revenue</Text>
            <Text style={styles.revenueValue}>
              ${stats?.payments?.totalRevenue?.toFixed(2) || '0.00'}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.revenueItem}>
            <Text style={styles.revenueLabel}>Monthly Revenue</Text>
            <Text style={styles.revenueValue}>
              ${stats?.payments?.monthlyRevenue?.toFixed(2) || '0.00'}
            </Text>
          </View>
        </View>
      </View>

      {/* Equipment Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Equipment Status</Text>
        <View style={styles.statusCard}>
          <View style={styles.statusItem}>
            <View style={[styles.statusDot, {backgroundColor: '#4CAF50'}]} />
            <Text style={styles.statusText}>
              Available: {stats?.equipment?.available || 0}
            </Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusDot, {backgroundColor: '#FF9800'}]} />
            <Text style={styles.statusText}>
              In Maintenance: {stats?.equipment?.maintenance || 0}
            </Text>
          </View>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {stats?.recentActivity?.payments?.length > 0 ? (
          stats.recentActivity.payments.slice(0, 3).map((payment, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Icon name="payments" size={20} color="#4CAF50" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>
                  Payment from {payment.memberId?.name || 'Unknown'}
                </Text>
                <Text style={styles.activitySubtitle}>
                  ${payment.amount} - {payment.paymentType}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noActivityText}>No recent activity</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.reportsButton}
        onPress={() => navigation.navigate('Reports')}>
        <Icon name="assessment" size={20} color="#fff" />
        <Text style={styles.reportsButtonText}>View Full Reports</Text>
      </TouchableOpacity>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  section: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  revenueCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
  },
  revenueItem: {
    marginBottom: 10,
  },
  revenueLabel: {
    fontSize: 14,
    color: '#666',
  },
  revenueValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  statusCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  statusText: {
    fontSize: 16,
    color: '#333',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  noActivityText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingVertical: 20,
  },
  reportsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  reportsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default DashboardScreen;
