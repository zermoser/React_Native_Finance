import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Transaction } from '../utils/helpers';

interface TransactionCardProps {
  transaction: Transaction;
  onPress: (transaction: Transaction) => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.transactionCard}
    onPress={() => onPress(transaction)}
  >
    <View style={[styles.iconContainer, { backgroundColor: transaction.color }]}>
      <Ionicons name={transaction.icon as any} size={24} color="white" />
    </View>
    <View style={styles.transactionInfo}>
      <Text style={styles.transactionCategory}>{transaction.category}</Text>
      <Text
        style={[
          styles.transactionAmount,
          { color: transaction.type === 'income' ? '#4CAF50' : '#F44336' },
        ]}
      >
        {transaction.type === 'income' ? '+' : '-'}฿{transaction.amount.toLocaleString()}
      </Text>
      {transaction.description && (
        <Text style={styles.transactionDescription}>{transaction.description}</Text>
      )}
    </View>
    <Text style={styles.transactionTime}>
      {transaction.date.toLocaleDateString('th-TH', {
        day: '2-digit',
        month: 'short',
      })}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  transactionDescription: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 2,
  },
  transactionTime: {
    fontSize: 12,
    color: '#BDC3C7',
  },
});

export default TransactionCard;