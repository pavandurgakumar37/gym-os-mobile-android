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

const AddEquipmentScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('cardio');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [currentCondition, setCurrentCondition] = useState('good');
  const [status, setStatus] = useState('available');
  const [location, setLocation] = useState('');
  const [maintenanceNotes, setMaintenanceNotes] = useState('');

  const handleAddEquipment = async () => {
    if (!name || !category) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await api.post('/equipment', {
        name,
        category,
        brand,
        model,
        serialNumber,
        purchasePrice: purchasePrice ? parseFloat(purchasePrice) : undefined,
        currentCondition,
        status,
        location,
        maintenanceNotes,
      });

      Alert.alert('Success', 'Equipment added successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to add equipment',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Equipment</Text>
        <Text style={styles.headerSubtitle}>Fill in the equipment details</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Equipment Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter equipment name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Category *</Text>
        <View style={styles.categories}>
          {['cardio', 'strength', 'flexibility', 'weights', 'accessories'].map(
            cat => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.category,
                  category === cat && styles.categoryActive,
                ]}
                onPress={() => setCategory(cat)}>
                <Text
                  style={[
                    styles.categoryText,
                    category === cat && styles.categoryTextActive,
                  ]}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>

        <Text style={styles.label}>Brand</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter brand"
          value={brand}
          onChangeText={setBrand}
        />

        <Text style={styles.label}>Model</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter model"
          value={model}
          onChangeText={setModel}
        />

        <Text style={styles.label}>Serial Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter serial number"
          value={serialNumber}
          onChangeText={setSerialNumber}
        />

        <Text style={styles.label}>Purchase Price</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter purchase price"
          value={purchasePrice}
          onChangeText={setPurchasePrice}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Condition</Text>
        <View style={styles.conditions}>
          {['excellent', 'good', 'fair', 'poor', 'maintenance_needed'].map(
            cond => (
              <TouchableOpacity
                key={cond}
                style={[
                  styles.condition,
                  currentCondition === cond && styles.conditionActive,
                ]}
                onPress={() => setCurrentCondition(cond)}>
                <Text
                  style={[
                    styles.conditionText,
                    currentCondition === cond && styles.conditionTextActive,
                  ]}>
                  {cond.replace('_', ' ').toUpperCase()}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>

        <Text style={styles.label}>Status</Text>
        <View style={styles.statuses}>
          {['available', 'in_use', 'maintenance', 'out_of_service'].map(
            stat => (
              <TouchableOpacity
                key={stat}
                style={[
                  styles.status,
                  status === stat && styles.statusActive,
                ]}
                onPress={() => setStatus(stat)}>
                <Text
                  style={[
                    styles.statusText,
                    status === stat && styles.statusTextActive,
                  ]}>
                  {stat.replace('_', ' ').toUpperCase()}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>

        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter location"
          value={location}
          onChangeText={setLocation}
        />

        <Text style={styles.label}>Maintenance Notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Any maintenance notes"
          value={maintenanceNotes}
          onChangeText={setMaintenanceNotes}
          multiline
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleAddEquipment}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Add Equipment</Text>
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
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  category: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 8,
    marginBottom: 8,
  },
  categoryActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  categoryTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  conditions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  condition: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 8,
    marginBottom: 8,
  },
  conditionActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  conditionText: {
    fontSize: 12,
    color: '#666',
  },
  conditionTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  statuses: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  status: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 8,
    marginBottom: 8,
  },
  statusActive: {
    backgroundColor: '#FF9800',
    borderColor: '#FF9800',
  },
  statusText: {
    fontSize: 12,
    color: '#666',
  },
  statusTextActive: {
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

export default AddEquipmentScreen;
