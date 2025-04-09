import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';

const transactions = [
  {
    id: 1,
    type: 'sent',
    title: 'Transfer to Sarah',
    date: 'Today, 2:30 PM',
    amount: -50.0,
  },
  {
    id: 2,
    type: 'received',
    title: 'Received from John',
    date: 'Today, 1:15 PM',
    amount: 75.0,
  },
  {
    id: 3,
    type: 'sent',
    title: 'Coffee Shop',
    date: 'Yesterday, 9:20 AM',
    amount: -4.5,
  },
];

export default function HistoryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>
      </View>

      <ScrollView>
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transaction}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor:
                    transaction.type === 'sent'
                      ? 'rgba(231, 76, 60, 0.1)'
                      : 'rgba(80, 227, 194, 0.1)',
                },
              ]}
            >
              {transaction.type === 'sent' ? (
                <ArrowUpRight color="#E74C3C" size={24} />
              ) : (
                <ArrowDownLeft color="#50E3C2" size={24} />
              )}
            </View>
            <View style={styles.details}>
              <Text style={styles.transactionTitle}>{transaction.title}</Text>
              <Text style={styles.date}>{transaction.date}</Text>
            </View>
            <Text
              style={[
                styles.amount,
                {
                  color: transaction.type === 'sent' ? '#E74C3C' : '#50E3C2',
                },
              ]}
            >
              {transaction.type === 'sent' ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    padding: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  transactionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  date: {
    color: '#666666',
    fontSize: 12,
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
