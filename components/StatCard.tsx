import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ColorValue, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


interface StatCardProps {
  title: string;
  amount: number;
  icon: string;
  gradient: readonly [ColorValue, ColorValue, ...ColorValue[]];
  onPress: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ title, amount, icon, gradient, onPress }) => (
  <TouchableOpacity style={styles.statCardContainer} onPress={onPress}>
    <LinearGradient
      colors={gradient}
      style={styles.statCard}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.statCardHeader}>
        <Ionicons name={icon as any} size={24} color="white" />
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={styles.statAmount}>฿{amount.toLocaleString()}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  statCardContainer: {
    flex: 1,
  },
  statCard: {
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  statTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  statAmount: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StatCard;