import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FinancialTip } from '../utils/helpers';

interface TipCardProps {
  tip: FinancialTip;
  isExpanded: boolean;
  onPress: () => void;
}

const TipCard: React.FC<TipCardProps> = ({ tip, isExpanded, onPress }) => (
  <TouchableOpacity style={styles.tipCard} onPress={onPress} activeOpacity={0.9}>
    <View style={[styles.tipIcon, { backgroundColor: `${tip.color}20` }]}>
      <Ionicons name={tip.icon as any} size={22} color={tip.color} />
    </View>
    <View style={styles.tipContent}>
      <Text style={styles.tipTitle}>{tip.title}</Text>
      <Text style={styles.tipDescription} numberOfLines={isExpanded ? undefined : 2}>
        {tip.description}
      </Text>
      <Text style={[styles.expandText, { color: tip.color }]}>
        {isExpanded ? 'ซ่อน' : 'อ่านเพิ่มเติม'}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  tipCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'flex-start',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  tipIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 6,
  },
  tipDescription: {
    fontSize: 13,
    color: '#7F8C8D',
    marginBottom: 6,
  },
  expandText: {
    fontSize: 13,
    fontWeight: '700',
  },
});

export default TipCard;