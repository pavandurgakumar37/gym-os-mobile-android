import React, {useEffect, useState} from 'react';
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

const PaymentScreen = ({route, navigation}) => {
  const {memberId} = route.params;
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paymentType, setPaymentType] = useState('membership');
  const [membershipType, setMembershipType] = useState('basic');
  const [notes, setNotes] = useState('');

  const handlePayment = async () => {
    if (!amount || !paymentMethod || !paymentType) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const paymentData = {
        memberId,
        amount: parseFloat(amount),
        paymentMethod,
        paymentType,
        notes,
      };

      if (paymentType === 'membership') {
        paymentData.membershipType = membershipType;
      }

      await api.post('/payments', paymentData);

      Alert.alert('Success', 'Payment recorded successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to record payment',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Record Payment</Text>
        <Text style={styles.headerSubtitle}>Enter payment details</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Amount *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Payment Method *</Text>
        <View style={styles.paymentMethods}>
          {['cash', 'card', 'bank_transfer', 'online'].map(method => (
            <TouchableOpacity
              key={method}
              style={[
                styles.paymentMethod,
                paymentMethod === method && styles.paymentMethodActive,
              ]}
              onPress={() => setPaymentMethod(method)}>
              <Text
                style={[
                  styles.paymentMethodText,
                  paymentMethod === method && styles.paymentMethodTextActive,
                ]}>
                {method.replace('_', ' ').toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Payment Type *</Text>
        <View style={styles.paymentTypes}>
          {['membership', 'personal_training', 'equipment_rental', 'other'].map(
            type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.paymentType,
                  paymentType === type && styles.paymentTypeActive,
                ]}
                onPress={() => setPaymentType(type)}>
                <Text
                  style={[
                    styles.paymentTypeText,
                    paymentType === type && styles.paymentTypeTextActive,
                  ]}>
                  {type.replace('_', ' ').toUpperCase()}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>

        {paymentType === 'membership' && (
          <>
            <Text style={styles.label}>Membership Type</Text>
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
          </>
        )}

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
          onPress={handlePayment}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Record Payment</Text>
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
  paymentMethods: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  paymentMethod: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 8,
    marginBottom: 8,
  },
  paymentMethodActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  paymentMethodText: {
    fontSize: 14,
    color: '#666',
  },
  paymentMethodTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  paymentTypes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  paymentType: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 8,
    marginBottom: 8,
  },
  paymentTypeActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  paymentTypeText: {
    fontSize: 12,
    color: '#666',
  },
  paymentTypeTextActive: {
    color: '#fff',
    fontWeight: '600',
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
    backgroundColor: '#9C27B0',
    borderColor: '#9C27B0',
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

export default PaymentScreen;
