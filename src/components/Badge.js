import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Badge = ({ text, type = 'default' }) => {
  const getBadgeStyle = () => {
    switch (type) {
      case 'success':
        return { backgroundColor: '#34C759' };
      case 'warning':
        return { backgroundColor: '#FF9500' };
      case 'error':
        return { backgroundColor: '#FF3B30' };
      case 'admin':
        return { backgroundColor: '#FF3B30' };
      case 'user':
        return { backgroundColor: '#007AFF' };
      case 'ituser':
        return { backgroundColor: '#FF9500' };
      case 'delivered':
        return { backgroundColor: '#34C759' };
      case 'shipped':
        return { backgroundColor: '#007AFF' };
      case 'processing':
        return { backgroundColor: '#FF9500' };
      case 'pending':
        return { backgroundColor: '#FF3B30' };
      case 'high':
        return { backgroundColor: '#FF3B30' };
      case 'medium':
        return { backgroundColor: '#FF9500' };
      case 'low':
        return { backgroundColor: '#34C759' };
      case 'open':
        return { backgroundColor: '#FF3B30' };
      case 'in-progress':
        return { backgroundColor: '#FF9500' };
      case 'resolved':
        return { backgroundColor: '#34C759' };
      case 'current':
        return { backgroundColor: '#007AFF' };
      default:
        return { backgroundColor: '#666666' };
    }
  };

  return (
    <View style={[styles.container, getBadgeStyle()]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
});

export default Badge;
