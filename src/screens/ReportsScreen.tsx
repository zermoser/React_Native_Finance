import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../utils/helpers';

const ReportsScreen = () => {
  const [selectedReport, setSelectedReport] = useState('monthly');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={colors.headerGradient} style={styles.header}>
        <Text style={styles.headerTitle}>รายงานการเงิน</Text>
        <Text style={styles.headerSubtitle}>วิเคราะห์การเงินของคุณแบบละเอียด</Text>
      </LinearGradient>

      <View style={styles.reportSelector}>
        <TouchableOpacity
          style={[styles.reportButton, selectedReport === 'monthly' && styles.selectedReportButton]}
          onPress={() => setSelectedReport('monthly')}
        >
          <Text style={styles.reportButtonText}>รายเดือน</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.reportButton, selectedReport === 'category' && styles.selectedReportButton]}
          onPress={() => setSelectedReport('category')}
        >
          <Text style={styles.reportButtonText}>ตามหมวดหมู่</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.reportButton, selectedReport === 'trends' && styles.selectedReportButton]}
          onPress={() => setSelectedReport('trends')}
        >
          <Text style={styles.reportButtonText}>แนวโน้ม</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.reportContainer}>
        {selectedReport === 'monthly' && (
          <View style={styles.chartPlaceholder}>
            <Ionicons name="bar-chart" size={100} color={colors.primaryLight} />
            <Text style={styles.chartTitle}>รายงานรายเดือน</Text>
          </View>
        )}

        {selectedReport === 'category' && (
          <View style={styles.chartPlaceholder}>
            <Ionicons name="pie-chart" size={100} color={colors.primaryLight} />
            <Text style={styles.chartTitle}>รายงานตามหมวดหมู่</Text>
          </View>
        )}

        {selectedReport === 'trends' && (
          <View style={styles.chartPlaceholder}>
            <Ionicons name="trending-up" size={100} color={colors.primaryLight} />
            <Text style={styles.chartTitle}>แนวโน้มการเงิน</Text>
          </View>
        )}
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>สรุปการเงิน</Text>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>รายรับรวม:</Text>
          <Text style={[styles.summaryValue, { color: colors.income }]}>฿25,000</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>รายจ่ายรวม:</Text>
          <Text style={[styles.summaryValue, { color: colors.expense }]}>฿18,500</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>ยอดคงเหลือ:</Text>
          <Text style={[styles.summaryValue, { color: colors.primary }]}>฿6,500</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 8 },
  headerSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.9)' },
  reportSelector: { flexDirection: 'row', justifyContent: 'space-around', padding: 16 },
  reportButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, backgroundColor: '#EDF2F7' },
  selectedReportButton: { backgroundColor: colors.primary },
  reportButtonText: { fontWeight: '600', color: '#4A5568' },
  selectedReportButtonText: { color: 'white' },
  reportContainer: { margin: 16, backgroundColor: 'white', borderRadius: 16, padding: 20, alignItems: 'center' },
  chartPlaceholder: { alignItems: 'center', padding: 20 },
  chartTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 16, color: colors.text },
  summaryCard: { margin: 16, backgroundColor: 'white', borderRadius: 16, padding: 20 },
  summaryTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: colors.text },
  summaryItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryLabel: { fontSize: 16, color: colors.textLight },
  summaryValue: { fontSize: 16, fontWeight: 'bold' },
});

export default ReportsScreen;