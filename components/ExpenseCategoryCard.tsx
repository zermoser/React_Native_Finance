import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ExpenseCategory } from '../utils/helpers';

interface ExpenseCategoryCardProps {
  category: ExpenseCategory;
  onPress: () => void;
  animatedValue: Animated.Value;
}

const ExpenseCategoryCard: React.FC<ExpenseCategoryCardProps> = ({
  category,
  onPress,
  animatedValue,
}) => {
  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.96],
  });

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={styles.categoryCard}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <View style={styles.categoryHeader}>
          <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
            <Ionicons name={category.icon as any} size={22} color="white" />
          </View>
          <View style={styles.categoryInfo}>
            <Text style={styles.categoryName}>{category.name}</Text>
            <Text style={styles.categoryAmount}>฿{category.amount.toLocaleString()}</Text>
          </View>
          <Text style={styles.categoryPercentage}>{category.percentage}%</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground} />
          <Animated.View
            style={[
              styles.progressBar,
              { 
                width: `${Math.min(Math.max(category.percentage, 0), 100)}%`, 
                backgroundColor: category.color 
              },
            ]}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  categoryAmount: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  categoryPercentage: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2C3E50',
    marginLeft: 8,
  },
  progressBarContainer: {
    height: 8,
    marginTop: 6,
    borderRadius: 6,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  progressBarBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#ECF0F1',
  },
  progressBar: {
    height: 8,
    borderRadius: 6,
  },
});

export default ExpenseCategoryCard;