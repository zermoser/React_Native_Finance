import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Transaction } from '../utils/helpers';

const categories = {
  income: [
    { name: 'เงินเดือน', icon: 'wallet', color: '#4ECDC4' },
    { name: 'โบนัส', icon: 'gift', color: '#45B7D1' },
    { name: 'ขายของ', icon: 'storefront', color: '#96CEB4' },
    { name: 'ลงทุน', icon: 'trending-up', color: '#FECA57' },
    { name: 'อื่นๆ', icon: 'cash', color: '#FF9FF3' },
  ],
  expense: [
    { name: 'อาหาร & เครื่องดื่ม', icon: 'restaurant', color: '#FF6B6B' },
    { name: 'คมนาคม', icon: 'car', color: '#45B7D1' },
    { name: 'ช้อปปิ้ง', icon: 'bag', color: '#96CEB4' },
    { name: 'บันเทิง', icon: 'game-controller', color: '#FECA57' },
    { name: 'สุขภาพ', icon: 'medical', color: '#FF9FF3' },
    { name: 'การศึกษา', icon: 'school', color: '#54A0FF' },
    { name: 'บิลประจำ', icon: 'receipt', color: '#FF6348' },
    { name: 'อื่นๆ', icon: 'ellipsis-horizontal', color: '#778CA3' },
  ],
};

interface AddTransactionModalProps {
  visible: boolean;
  onClose: () => void;
  type: 'income' | 'expense';
  onAdd: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  visible,
  onClose,
  type,
  onAdd,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (!selectedCategory || !amount) {
      Alert.alert('ข้อมูลไม่ครบ', 'กรุณาเลือกหมวดหมู่และใส่จำนวนเงิน');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('จำนวนเงินไม่ถูกต้อง', 'กรุณาใส่จำนวนเงินที่ถูกต้อง');
      return;
    }

    onAdd({
      type,
      category: selectedCategory.name,
      amount: numAmount,
      icon: selectedCategory.icon,
      color: selectedCategory.color,
      description: description || undefined,
    });

    // Reset form
    setSelectedCategory(null);
    setAmount('');
    setDescription('');
    onClose();
  };

  const categoryList = categories[type];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#2C3E50" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>
            {type === 'income' ? 'เพิ่มรายรับ' : 'เพิ่มรายจ่าย'}
          </Text>
          <TouchableOpacity onPress={handleAdd}>
            <Text style={styles.saveButton}>บันทึก</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <Text style={styles.sectionLabel}>เลือกหมวดหมู่</Text>
          <View style={styles.categoryGrid}>
            {categoryList.map((cat, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryButton,
                  selectedCategory?.name === cat.name && styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <View style={[styles.categoryIcon, { backgroundColor: cat.color }]}>
                  <Ionicons name={cat.icon as any} size={24} color="white" />
                </View>
                <Text style={styles.categoryText}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionLabel}>จำนวนเงิน (฿)</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholderTextColor="#BDC3C7"
          />

          <Text style={styles.sectionLabel}>หมายเหตุ (ไม่บังคับ)</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="เพิ่มหมายเหตุ..."
            value={description}
            onChangeText={setDescription}
            multiline
            placeholderTextColor="#BDC3C7"
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12,
    marginTop: 20,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryButton: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    width: '30%',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedCategory: {
    borderColor: '#667eea',
    borderWidth: 2,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#2C3E50',
    textAlign: 'center',
    fontWeight: '500',
  },
  amountInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  descriptionInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2C3E50',
    minHeight: 100,
    textAlignVertical: 'top',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});

export default AddTransactionModal;