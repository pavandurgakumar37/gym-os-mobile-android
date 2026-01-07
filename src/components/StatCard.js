import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StatCard = ({ title, value, icon, color = '#007AFF' }) => {
  return (
    <View style={[styles.container, { borderLeftColor: color }]}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={28} color={color} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '48%',
  },
  iconContainer: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
  },
  title: {
    fontSize: 13,
    color: '#666666',
    marginTop: 2,
  },
});

export default StatCard;
