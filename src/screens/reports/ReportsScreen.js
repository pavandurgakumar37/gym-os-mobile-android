import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {api} from '../../services/api';

const ReportsScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [memberReports, setMemberReports] = useState(null);
  const [revenueReports, setRevenueReports] = useState(null);
  const [attendanceReports, setAttendanceReports] = useState(null);

  const fetchReports = async () => {
    try {
      const [members, revenue, attendance] = await Promise.all([
        api.get('/reports/members'),
        api.get('/reports/revenue'),
        api.get('/reports/attendance'),
      ]);

      setMemberReports(members.data);
      setRevenueReports(revenue.data);
      setAttendanceReports(attendance.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reports & Analytics</Text>
        <Text style={styles.headerSubtitle}>View detailed reports</Text>
      </View>

      {/* Member Reports */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Member Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Icon name="people" size={32} color="#4CAF50" />
            <Text style={styles.statValue}>{memberReports?.newMembers || 0}</Text>
            <Text style={styles.statLabel}>New Members</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="warning" size={32} color="#FF9800" />
            <Text style={styles.statValue}>
              {memberReports?.membersExpiringSoon || 0}
            </Text>
            <Text style={styles.statLabel}>Expiring Soon</Text>
          </View>
        </View>

        <Text style={styles.subsectionTitle}>By Membership Type</Text>
        {memberReports?.byType?.map((item, index) => (
          <View key={index} style={styles.reportItem}>
            <View style={styles.reportIndicator}>
              <View
                style={[
                  styles.indicatorDot,
                  {backgroundColor: getMembershipColor(item._id)},
                ]}
              />
              <Text style={styles.reportLabel}>
                {item._id.charAt(0).toUpperCase() + item._id.slice(1)}
              </Text>
            </View>
            <Text style={styles.reportValue}>{item.count}</Text>
          </View>
        ))}

        <Text style={styles.subsectionTitle}>By Status</Text>
        {memberReports?.byStatus?.map((item, index) => (
          <View key={index} style={styles.reportItem}>
            <View style={styles.reportIndicator}>
              <View
                style={[
                  styles.indicatorDot,
                  {backgroundColor: getStatusColor(item._id)},
                ]}
              />
              <Text style={styles.reportLabel}>
                {item._id.replace('_', ' ').toUpperCase()}
              </Text>
            </View>
            <Text style={styles.reportValue}>{item.count}</Text>
          </View>
        ))}
      </View>

      {/* Revenue Reports */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Revenue Overview</Text>
        <View style={styles.revenueSummary}>
          <View style={styles.revenueItem}>
            <Text style={styles.revenueLabel}>Total Revenue</Text>
            <Text style={styles.revenueAmount}>
              ${revenueReports?.total?.total?.toFixed(2) || '0.00'}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.revenueItem}>
            <Text style={styles.revenueLabel}>Total Transactions</Text>
            <Text style={styles.revenueAmount}>
              {revenueReports?.total?.count || 0}
            </Text>
          </View>
        </View>

        <Text style={styles.subsectionTitle}>By Payment Type</Text>
        {revenueReports?.byType?.map((item, index) => (
          <View key={index} style={styles.reportItem}>
            <View style={styles.reportIndicator}>
              <View
                style={[
                  styles.indicatorDot,
                  {backgroundColor: '#4CAF50'},
                ]}
              />
              <Text style={styles.reportLabel}>
                {item._id.replace('_', ' ').toUpperCase()}
              </Text>
            </View>
            <Text style={styles.reportValue}>
              ${item.total.toFixed(2)}
            </Text>
          </View>
        ))}

        <Text style={styles.subsectionTitle}>By Payment Method</Text>
        {revenueReports?.byMethod?.map((item, index) => (
          <View key={index} style={styles.reportItem}>
            <View style={styles.reportIndicator}>
              <View
                style={[
                  styles.indicatorDot,
                  {backgroundColor: '#2196F3'},
                ]}
              />
              <Text style={styles.reportLabel}>
                {item._id.replace('_', ' ').toUpperCase()}
              </Text>
            </View>
            <Text style={styles.reportValue}>
              ${item.total.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Attendance Reports */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Attendance</Text>
        <View style={styles.attendanceSummary}>
          <View style={styles.attendanceItem}>
            <Icon name="how-to-reg" size={32} color="#4CAF50" />
            <View>
              <Text style={styles.attendanceValue}>
                {attendanceReports?.totalCheckIns || 0}
              </Text>
              <Text style={styles.attendanceLabel}>Total Check-ins</Text>
            </View>
          </View>
        </View>

        <Text style={styles.subsectionTitle}>Last 30 Days</Text>
        {attendanceReports?.dailyAttendance?.slice(-7).map((item, index) => (
          <View key={index} style={styles.reportItem}>
            <Text style={styles.reportLabel}>{item.date}</Text>
            <Text style={styles.reportValue}>{item.count}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.refreshButton}
        onPress={fetchReports}>
        <Icon name="refresh" size={20} color="#fff" />
        <Text style={styles.refreshButtonText}>Refresh Reports</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const getMembershipColor = type => {
  switch (type) {
    case 'basic':
      return '#9E9E9E';
    case 'standard':
      return '#2196F3';
    case 'premium':
      return '#9C27B0';
    case 'vip':
      return '#FFD700';
    default:
      return '#999';
  }
};

const getStatusColor = status => {
  switch (status) {
    case 'active':
      return '#4CAF50';
    case 'expired':
      return '#f44336';
    case 'suspended':
      return '#FF9800';
    case 'pending':
      return '#2196F3';
    default:
      return '#999';
  }
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
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
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
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  reportItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  reportIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  indicatorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  reportLabel: {
    fontSize: 14,
    color: '#666',
  },
  reportValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  revenueSummary: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  revenueItem: {
    marginBottom: 10,
  },
  revenueLabel: {
    fontSize: 14,
    color: '#666',
  },
  revenueAmount: {
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
  attendanceSummary: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  attendanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendanceValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 15,
  },
  attendanceLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    marginLeft: 15,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ReportsScreen;
