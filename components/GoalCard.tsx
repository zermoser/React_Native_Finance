import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Goal } from '../utils/helpers';

interface GoalCardProps {
  goal: Goal;
  onPress: () => void;
  onAddMoney: () => void;
  animValue: Animated.Value;
}

const GoalCard: React.FC<GoalCardProps> = ({ 
  goal, 
  onPress, 
  onAddMoney,
  animValue 
}) => {
  const secondColor = goal.color.endsWith('80') ? goal.color : `${goal.color}80`;

  const widthInterpolated = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const progressPercent = Math.min(goal.currentAmount / Math.max(goal.targetAmount, 1), 1) * 100;

  return (
    <TouchableOpacity style={styles.goalCard} activeOpacity={0.95} onPress={onPress}>
      <LinearGradient
        colors={[goal.color, secondColor]}
        style={styles.goalGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.goalHeader}>
          <Ionicons name={goal.icon as any} size={26} color="white" />
          <Text style={styles.goalTitle}>{goal.title}</Text>
        </View>

        <View style={styles.goalProgress}>
          <Text style={styles.goalAmount}>
            ฿{goal.currentAmount.toLocaleString()} / ฿{goal.targetAmount.toLocaleString()}
          </Text>

          <View style={styles.goalProgressBarContainer}>
            <View style={styles.goalProgressBarBackground} />
            <Animated.View
              style={[
                styles.goalProgressBar,
                {
                  width: widthInterpolated,
                },
              ]}
            />
          </View>

          <View style={styles.goalFooter}>
            <Text style={styles.goalPercentage}>{Math.round(progressPercent)}% สำเร็จ</Text>
            <TouchableOpacity style={styles.addMoneyButton} onPress={onAddMoney}>
              <Ionicons name="add-circle" size={18} color="white" />
              <Text style={styles.addMoneyText}>เติมเงิน</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  goalCard: {
    marginBottom: 14,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  goalGradient: {
    padding: 16,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginLeft: 12,
  },
  goalProgress: {
    marginTop: 6,
  },
  goalAmount: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.95)',
    fontWeight: '600',
    marginBottom: 8,
  },
  goalProgressBarContainer: {
    height: 12,
    backgroundColor: 'transparent',
    borderRadius: 8,
    overflow: 'hidden',
  },
  goalProgressBarBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  goalProgressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 8,
  },
  goalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  goalPercentage: {
    color: 'rgba(255,255,255,0.95)',
    fontWeight: '700',
  },
  addMoneyButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addMoneyText: {
    color: 'white',
    marginLeft: 6,
    fontWeight: '600',
  },
});

export default GoalCard;