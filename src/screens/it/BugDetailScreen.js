import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../../components/Avatar';
import Badge from '../../components/Badge';
import { bugs, users } from '../../data/data';

const BugDetailScreen = ({ route }) => {
  const { bug } = route.params;
  const [status, setStatus] = useState(bug.status);
  const [comment, setComment] = useState('');

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

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return '#FF3B30';
      case 'user':
        return '#007AFF';
      case 'ituser':
        return '#FF9500';
      default:
        return '#666666';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin':
        return 'ADMIN';
      case 'user':
        return 'USER';
      case 'ituser':
        return 'IT USER';
      default:
        return role.toUpperCase();
    }
  };

  const getUserById = (userId) => {
    return users.find(u => u.id === userId);
  };

  const handleStatusUpdate = (newStatus) => {
    Alert.alert(
      'Update Status',
      `Change bug status to ${newStatus === 'in-progress' ? 'In Progress' : newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Update',
          onPress: () => {
            setStatus(newStatus);
            console.log('Updated bug status to:', newStatus);
          },
        },
      ]
    );
  };

  const handleSubmitComment = () => {
    if (comment.trim()) {
      Alert.alert('Comment Submitted', 'Your comment has been added to the bug.');
      setComment('');
      console.log('Comment submitted:', comment);
    } else {
      Alert.alert('Error', 'Please enter a comment.');
    }
  };

  const reporter = getUserById(bug.reportedBy);
  const assignee = bug.assignedTo ? getUserById(bug.assignedTo) : null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bug Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.bugHeader}>
        <View style={styles.bugBadges}>
          <Badge text={bug.severity.toUpperCase()} type={bug.severity} />
          <Badge 
            text={status === 'in-progress' ? 'IN PROGRESS' : status.toUpperCase()} 
            type={status} 
          />
        </View>
        <Text style={styles.bugTitle}>{bug.title}</Text>
        <Text style={styles.bugId}>Bug #{bug.id}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{bug.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bug Information</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Bug ID</Text>
            <Text style={styles.infoValue}>#{bug.id}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Severity</Text>
            <Badge text={bug.severity.toUpperCase()} type={bug.severity} />
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Status</Text>
            <Badge 
              text={status === 'in-progress' ? 'IN PROGRESS' : status.toUpperCase()} 
              type={status} 
            />
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Reported Date</Text>
            <Text style={styles.infoValue}>{bug.reportedDate}</Text>
          </View>
          {bug.resolvedDate && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Resolved Date</Text>
              <Text style={styles.infoValue}>{bug.resolvedDate}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>People</Text>
        
        <View style={styles.personCard}>
          <Avatar name={reporter?.name || 'Unknown'} size={48} color={getRoleColor(reporter?.role)} />
          <View style={styles.personInfo}>
            <Text style={styles.personName}>{reporter?.name || 'Unknown Reporter'}</Text>
            <Text style={styles.personEmail}>{reporter?.email || ''}</Text>
            {reporter && <Badge text={getRoleLabel(reporter.role)} type={reporter.role} />}
          </View>
          <View style={styles.personRole}>
            <Text style={styles.personRoleText}>Reporter</Text>
          </View>
        </View>

        {assignee && (
          <View style={styles.personCard}>
            <Avatar name={assignee.name} size={48} color={getRoleColor(assignee.role)} />
            <View style={styles.personInfo}>
              <Text style={styles.personName}>{assignee.name}</Text>
              <Text style={styles.personEmail}>{assignee.email}</Text>
              <Badge text={getRoleLabel(assignee.role)} type={assignee.role} />
            </View>
            <View style={styles.personRole}>
              <Text style={styles.personRoleText}>Assignee</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Update Status</Text>
        <View style={styles.statusButtons}>
          <TouchableOpacity
            style={[
              styles.statusButton,
              status === 'open' && styles.statusButtonActive,
              { borderColor: getStatusColor('open') },
            ]}
            onPress={() => handleStatusUpdate('open')}
          >
            <Ionicons 
              name="alert-circle-outline" 
              size={20} 
              color={status === 'open' ? '#FFFFFF' : getStatusColor('open')} 
            />
            <Text
              style={[
                styles.statusButtonText,
                status === 'open' && styles.statusButtonTextActive,
              ]}
            >
              Open
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.statusButton,
              status === 'in-progress' && styles.statusButtonActive,
              { borderColor: getStatusColor('in-progress') },
            ]}
            onPress={() => handleStatusUpdate('in-progress')}
          >
            <Ionicons 
              name="construct-outline" 
              size={20} 
              color={status === 'in-progress' ? '#FFFFFF' : getStatusColor('in-progress')} 
            />
            <Text
              style={[
                styles.statusButtonText,
                status === 'in-progress' && styles.statusButtonTextActive,
              ]}
            >
              In Progress
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.statusButton,
              status === 'resolved' && styles.statusButtonActive,
              { borderColor: getStatusColor('resolved') },
            ]}
            onPress={() => handleStatusUpdate('resolved')}
          >
            <Ionicons 
              name="checkmark-circle-outline" 
              size={20} 
              color={status === 'resolved' ? '#FFFFFF' : getStatusColor('resolved')} 
            />
            <Text
              style={[
                styles.statusButtonText,
                status === 'resolved' && styles.statusButtonTextActive,
              ]}
            >
              Resolved
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add Comment</Text>
        <View style={styles.commentSection}>
          <TextInput
            style={styles.commentInput}
            placeholder="Enter your comment..."
            placeholderTextColor="#999999"
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitComment}>
            <Ionicons name="send" size={20} color="#FFFFFF" style={styles.buttonIcon} />
            <Text style={styles.submitButtonText}>Submit Comment</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuButton: {
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 34,
  },
  bugHeader: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  bugBadges: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 15,
  },
  bugTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 5,
  },
  bugId: {
    fontSize: 14,
    color: '#999999',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 15,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 15,
  },
  description: {
    fontSize: 15,
    color: '#333333',
    lineHeight: 22,
  },
  infoGrid: {
    gap: 15,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  personCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  personInfo: {
    flex: 1,
    marginLeft: 15,
  },
  personName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 3,
  },
  personEmail: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 8,
  },
  personRole: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  personRoleText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666666',
  },
  statusButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  statusButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  statusButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  statusButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
    marginLeft: 8,
  },
  statusButtonTextActive: {
    color: '#FFFFFF',
  },
  commentSection: {
    gap: 15,
  },
  commentInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    fontSize: 15,
    color: '#333333',
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default BugDetailScreen;
