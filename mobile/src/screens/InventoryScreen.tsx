import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { CampScreenShell } from '../components/CampScreenShell';
import { SyncDeckHeader } from '../components/SyncStateContext';
import { apiClient } from '../services/api';
import { colors } from '../theme/colors';

export const InventoryScreen = () => {
  const [items, setItems] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [quantity, setQuantity] = useState('100');
  const [message, setMessage] = useState('');

  useEffect(() => {
    apiClient.get('/stock').then(response => setItems(response.data));
  }, []);

  const filtered = items.filter((item: any) =>
    !search ||
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.sku.toLowerCase().includes(search.toLowerCase())
  );

  const depleted = items.filter((item: any) => item.lowStock).length;

  return (
    <CampScreenShell
      title="National Stock Logistics & Alerts"
      subtitle="Monitor consumables inventory, expiry risk, and replenishment triggers."
      header={<SyncDeckHeader />}
    >
      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Depleted Items</Text>
          <Text style={[styles.metricValue, { color: colors.rose }]}>{depleted}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Top Requested</Text>
          <Text style={styles.metricSmall}>{items[0]?.name ?? "RUTF Plumpy'Nut"}</Text>
        </View>
      </View>

      <View style={styles.alertBox}>
        <Text style={styles.alertText}>
          Shipment & replenishment forecasting: pre-position RUTF and ORS before the next weather window closes.
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Search by name, batch..."
        value={search}
        onChangeText={setSearch}
      />

      {filtered.map((item: any) => (
        <View key={item.id ?? item.sku} style={[styles.card, item.lowStock && styles.lowCard]}>
          <View style={styles.rowBetween}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={[styles.status, { color: item.lowStock ? colors.amber : colors.emerald }]}>
              {item.lowStock ? 'REORDER' : 'ADEQUATE'}
            </Text>
          </View>
          <Text style={styles.meta}>SKU {item.sku}</Text>
          <Text style={styles.meta}>Stock: {item.quantity} • Threshold: {item.minThreshold}</Text>
        </View>
      ))}

      <View style={styles.receiptCard}>
        <Text style={styles.sectionTitle}>RECEIVE PARTNER CONSIGNMENT</Text>
        <TextInput style={styles.input} value={quantity} onChangeText={setQuantity} keyboardType="numeric" placeholder="Batch shipment quantity" />
        <Pressable
          style={styles.primaryBtn}
          onPress={() => setMessage(`Receipt issued for ${quantity} units.`)}
        >
          <Text style={styles.primaryBtnText}>Issue Receipt & Store</Text>
        </Pressable>
        {message ? <Text style={styles.success}>{message}</Text> : null}
      </View>
    </CampScreenShell>
  );
};

const styles = StyleSheet.create({
  metricsRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  metricCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14
  },
  metricLabel: { fontSize: 10, fontWeight: '700', color: colors.slate500, letterSpacing: 0.8 },
  metricValue: { marginTop: 8, fontSize: 28, fontWeight: '700' },
  metricSmall: { marginTop: 8, fontSize: 13, fontWeight: '700', color: colors.navy },
  alertBox: {
    backgroundColor: '#ecfdf5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#a7f3d0',
    padding: 12,
    marginBottom: 12
  },
  alertText: { fontSize: 12, color: '#065f46', lineHeight: 18 },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 10
  },
  lowCard: { backgroundColor: '#fff7ed' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  name: { fontWeight: '700', color: colors.navy, flex: 1 },
  status: { fontSize: 11, fontWeight: '700' },
  meta: { marginTop: 4, fontSize: 12, color: colors.slate500 },
  receiptCard: {
    marginTop: 8,
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16
  },
  sectionTitle: { fontSize: 11, fontWeight: '700', letterSpacing: 1, color: colors.slate500, marginBottom: 10 },
  primaryBtn: {
    marginTop: 10,
    backgroundColor: colors.navy,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center'
  },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
  success: { marginTop: 10, color: colors.emerald, fontWeight: '600' }
});
