import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Avatar = ({ name, size = 40, color = '#007AFF', style }) => {
  const getInitials = (name) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2, backgroundColor: `${color}20` }, style]}>
      <Text style={[styles.text, { fontSize: size * 0.4, color }]}>{getInitials(name)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '700',
  },
});

export default Avatar;
