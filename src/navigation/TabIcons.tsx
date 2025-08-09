import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const TabIcons = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="home" size={24} color="#333" />
      <Ionicons name="analytics" size={24} color="#333" />
      <Ionicons name="trophy" size={24} color="#333" />
      <Ionicons name="pie-chart" size={24} color="#333" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 10,
  },
});

export default TabIcons;