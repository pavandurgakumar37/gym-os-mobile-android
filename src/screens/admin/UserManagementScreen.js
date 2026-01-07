import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../../components/SearchBar';
import ListItem from '../../components/ListItem';
import Badge from '../../components/Badge';
import Avatar from '../../components/Avatar';
import Modal from '../../components/Modal';
import { users, workoutLevels } from '../../data/data';

const UserManagementScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const handleUserPress = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleEditUser = () => {
    // Placeholder for edit user functionality
    console.log('Edit user:', selectedUser?.name);
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleUserPress(item)} activeOpacity={0.7}>
      <ListItem
        title={item.name}
        subtitle={item.email}
        leftComponent={
          <Avatar name={item.name} size={40} color={getRoleColor(item.role)} />
        }
        rightComponent={<Badge text={getRoleLabel(item.role)} type={item.role} />}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>User Management</Text>
        <Text style={styles.subtitle}>Manage all system users</Text>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={64} color="#E0E0E0" />
            <Text style={styles.emptyText}>No users found</Text>
          </View>
        }
      />

      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        title="User Details"
      >
        {selectedUser && (
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Avatar name={selectedUser.name} size={64} color={getRoleColor(selectedUser.role)} />
              <View style={styles.modalUserInfo}>
                <Text style={styles.modalUserName}>{selectedUser.name}</Text>
                <Text style={styles.modalUserEmail}>{selectedUser.email}</Text>
                <Badge text={getRoleLabel(selectedUser.role)} type={selectedUser.role} />
              </View>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Account Information</Text>
              <View style={styles.modalInfoRow}>
                <Text style={styles.modalInfoLabel}>Username</Text>
                <Text style={styles.modalInfoValue}>{selectedUser.username}</Text>
              </View>
              <View style={styles.modalInfoRow}>
                <Text style={styles.modalInfoLabel}>Role</Text>
                <Text style={styles.modalInfoValue}>{getRoleLabel(selectedUser.role)}</Text>
              </View>
              <View style={styles.modalInfoRow}>
                <Text style={styles.modalInfoLabel}>Join Date</Text>
                <Text style={styles.modalInfoValue}>{selectedUser.createdAt}</Text>
              </View>
            </View>

            {selectedUser.role === 'user' && (
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Fitness Information</Text>
                <View style={styles.modalInfoRow}>
                  <Text style={styles.modalInfoLabel}>Goal</Text>
                  <Text style={styles.modalInfoValue}>
                    {selectedUser.goal ? selectedUser.goal.charAt(0).toUpperCase() + selectedUser.goal.slice(1) : 'Not Set'}
                  </Text>
                </View>
                <View style={styles.modalInfoRow}>
                  <Text style={styles.modalInfoLabel}>Current Level</Text>
                  <Text style={styles.modalInfoValue}>
                    {selectedUser.currentLevel ? selectedUser.currentLevel.charAt(0).toUpperCase() + selectedUser.currentLevel.slice(1) : 'Not Set'}
                  </Text>
                </View>
                <View style={styles.modalInfoRow}>
                  <Text style={styles.modalInfoLabel}>Streak</Text>
                  <Text style={styles.modalInfoValue}>{selectedUser.streak || 0} days</Text>
                </View>
              </View>
            )}

            <TouchableOpacity style={styles.editButton} onPress={handleEditUser}>
              <Ionicons name="create-outline" size={20} color="#FFFFFF" style={styles.buttonIcon} />
              <Text style={styles.editButtonText}>Edit User</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
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
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  modalContent: {
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  modalUserInfo: {
    flex: 1,
    marginLeft: 15,
  },
  modalUserName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 5,
  },
  modalUserEmail: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  modalSection: {
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 15,
  },
  modalInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalInfoLabel: {
    fontSize: 14,
    color: '#666666',
  },
  modalInfoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  editButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonIcon: {
    marginRight: 8,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default UserManagementScreen;
