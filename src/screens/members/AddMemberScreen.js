import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {api} from '../../services/api';

const AddMemberScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [membershipType, setMembershipType] = useState('basic');
  const [membershipEndDate, setMembershipEndDate] = useState('');
  const [fitnessGoals, setFitnessGoals] = useState('');
  const [healthConditions, setHealthConditions] = useState('');
  const [notes, setNotes] = useState('');

  const handleAddMember = async () => {
    if (!name || !email || !membershipEndDate) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // First, create a user
      const userResponse = await api.post('/auth/register', {
        name,
        email,
        password: 'password123', // Default password, should be changed
        phone,
        role: 'member',
      });

      // Then create member profile
      const memberResponse = await api.post('/members', {
        userId: userResponse.data.user.id,
        membershipType,
        membershipEndDate: new Date(membershipEndDate),
        fitnessGoals: fitnessGoals ? fitnessGoals.split(',').map(g => g.trim()) : [],
        healthConditions,
        notes,
      });

      Alert.alert('Success', 'Member added successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to add member',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add New Member</Text>
        <Text style={styles.headerSubtitle}>Fill in the member details</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter full name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Membership Type *</Text>
        <View style={styles.membershipTypes}>
          {['basic', 'standard', 'premium', 'vip'].map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.membershipType,
                membershipType === type && styles.membershipTypeActive,
              ]}
              onPress={() => setMembershipType(type)}>
              <Text
                style={[
                  styles.membershipTypeText,
                  membershipType === type && styles.membershipTypeTextActive,
                ]}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Membership End Date *</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={membershipEndDate}
          onChangeText={setMembershipEndDate}
        />

        <Text style={styles.label}>Fitness Goals (comma separated)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="e.g., weight loss, muscle gain, flexibility"
          value={fitnessGoals}
          onChangeText={setFitnessGoals}
          multiline
        />

        <Text style={styles.label}>Health Conditions</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Any health conditions or allergies"
          value={healthConditions}
          onChangeText={setHealthConditions}
          multiline
        />

        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Additional notes"
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleAddMember}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Add Member</Text>
          )}
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
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  membershipTypes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  membershipType: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 8,
    marginBottom: 8,
  },
  membershipTypeActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  membershipTypeText: {
    fontSize: 14,
    color: '#666',
  },
  membershipTypeTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddMemberScreen;
