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

const MemberDetailsScreen = ({route, navigation}) => {
  const {memberId} = route.params;
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState(null);

  const fetchMemberDetails = async () => {
    try {
      const response = await api.get(`/members/${memberId}`);
      setMember(response.data);
    } catch (error) {
      console.error('Error fetching member details:', error);
      Alert.alert('Error', 'Failed to load member details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberDetails();
    const unsubscribe = navigation.addListener('focus', fetchMemberDetails);
    return unsubscribe;
  }, [navigation]);

  const handleDelete = () => {
    Alert.alert(
      'Delete Member',
      'Are you sure you want to delete this member?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/members/${memberId}`);
              Alert.alert('Success', 'Member deleted successfully');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete member');
            }
          },
        },
      ],
    );
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!member) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="error-outline" size={60} color="#999" />
        <Text style={styles.errorText}>Member not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {member.userId?.name?.charAt(0).toUpperCase() || 'M'}
          </Text>
        </View>
        <Text style={styles.name}>{member.userId?.name || 'Unknown'}</Text>
        <Text style={styles.email}>{member.userId?.email || ''}</Text>
        <View
          style={[
            styles.statusBadge,
            {backgroundColor: getStatusColor(member.membershipStatus)},
          ]}>
          <Text style={styles.statusText}>
            {member.membershipStatus.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Membership Details</Text>
        <View style={styles.detailRow}>
          <Icon name="card-membership" size={20} color="#666" />
          <Text style={styles.detailLabel}>Type:</Text>
          <Text style={styles.detailValue}>{member.membershipType}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="event" size={20} color="#666" />
          <Text style={styles.detailLabel}>Start Date:</Text>
          <Text style={styles.detailValue}>
            {new Date(member.membershipStartDate).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="event-available" size={20} color="#666" />
          <Text style={styles.detailLabel}>End Date:</Text>
          <Text style={styles.detailValue}>
            {new Date(member.membershipEndDate).toLocaleDateString()}
          </Text>
        </View>
      </View>

      {member.personalDetails && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Details</Text>
          {member.personalDetails.dateOfBirth && (
            <View style={styles.detailRow}>
              <Icon name="cake" size={20} color="#666" />
              <Text style={styles.detailLabel}>Date of Birth:</Text>
              <Text style={styles.detailValue}>
                {new Date(member.personalDetails.dateOfBirth).toLocaleDateString()}
              </Text>
            </View>
          )}
          {member.personalDetails.gender && (
            <View style={styles.detailRow}>
              <Icon name="wc" size={20} color="#666" />
              <Text style={styles.detailLabel}>Gender:</Text>
              <Text style={styles.detailValue}>
                {member.personalDetails.gender}
              </Text>
            </View>
          )}
          {member.personalDetails.address && (
            <View style={styles.detailRow}>
              <Icon name="location-on" size={20} color="#666" />
              <Text style={styles.detailLabel}>Address:</Text>
              <Text style={styles.detailValue}>{member.personalDetails.address}</Text>
            </View>
          )}
        </View>
      )}

      {member.fitnessGoals && member.fitnessGoals.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fitness Goals</Text>
          <View style={styles.tagsContainer}>
            {member.fitnessGoals.map((goal, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{goal}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {member.healthConditions && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Conditions</Text>
          <Text style={styles.noteText}>{member.healthConditions}</Text>
        </View>
      )}

      {member.assignedTrainer && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Assigned Trainer</Text>
          <View style={styles.detailRow}>
            <Icon name="person" size={20} color="#666" />
            <Text style={styles.detailValue}>{member.assignedTrainer.name}</Text>
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Attendance</Text>
        <Text style={styles.attendanceText}>
          Total Check-ins: {member.attendance?.length || 0}
        </Text>
      </View>

      {member.notes && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <Text style={styles.noteText}>{member.notes}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.paymentButton]}
          onPress={() => navigation.navigate('Payment', {memberId: member._id})}>
          <Icon name="payment" size={20} color="#fff" />
          <Text style={styles.buttonText}>Record Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}>
          <Icon name="delete" size={20} color="#fff" />
          <Text style={styles.buttonText}>Delete Member</Text>
        </TouchableOpacity>
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
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  statusBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
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
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
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
  noteText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  attendanceText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  buttonContainer: {
    padding: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  paymentButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default MemberDetailsScreen;
