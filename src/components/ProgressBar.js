import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ progress, color = '#007AFF', height = 8, style }) => {
  return (
    <View style={[styles.container, { height }, style]}>
      <View style={[styles.progress, { width: `${progress}%`, backgroundColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 4,
  },
});

export default ProgressBar;
