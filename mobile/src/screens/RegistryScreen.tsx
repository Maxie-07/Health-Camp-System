import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { CampScreenShell } from '../components/CampScreenShell';
import { SyncDeckHeader } from '../components/SyncStateContext';
import { apiClient } from '../services/api';
import { CampBeneficiaryView, toCampBeneficiary } from '../services/campData';
import { colors } from '../theme/colors';

export const RegistryScreen = () => {
  const [beneficiaries, setBeneficiaries] = useState<CampBeneficiaryView[]>([]);
  const [selected, setSelected] = useState<CampBeneficiaryView | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    apiClient.get('/beneficiaries').then(response => {
      setBeneficiaries(response.data.map((item: any, index: number) => toCampBeneficiary(item, index)));
    });
  }, []);

  const filtered = beneficiaries.filter(item =>
    item.fullName.toLowerCase().includes(search.toLowerCase()) ||
    item.displayId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <CampScreenShell
      title={`Camp Registry (${beneficiaries.length} Registered)`}
      subtitle="Search by name, ID, district, or vulnerability status."
      header={<SyncDeckHeader />}
    >
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Select a participant to review MUAC history and screening readiness.</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Search by name, ID..."
        value={search}
        onChangeText={setSearch}
      />

      {filtered.map(item => (
        <Pressable
          key={item.id ?? item.displayId}
          style={[styles.card, selected?.id === item.id && styles.cardSelected]}
          onPress={() => setSelected(item)}
        >
          <Text style={styles.badge}>{item.displayId}</Text>
          <Text style={styles.name}>{item.fullName}</Text>
          <Text style={styles.meta}>{item.vulnerability} • {item.age} Years • {item.district}</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.meta}>{item.lc1Chief}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>
          <Text style={styles.muac}>MUAC: {item.muac} cm</Text>
        </Pressable>
      ))}

      {selected ? (
        <View style={styles.detailCard}>
          <Text style={styles.sectionTitle}>Selected Participant</Text>
          <Text style={styles.name}>{selected.fullName}</Text>
          <Text style={styles.meta}>Phone: {selected.phone || 'Not recorded'}</Text>
          <Text style={styles.meta}>QR Code: {selected.qrCode}</Text>
          <Text style={styles.meta}>Camp: {selected.campLocation || selected.subcounty}</Text>
        </View>
      ) : null}
    </CampScreenShell>
  );
};

const styles = StyleSheet.create({
  infoBox: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    padding: 12,
    marginBottom: 12
  },
  infoText: { fontSize: 12, color: colors.slate700, lineHeight: 18 },
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
  cardSelected: { borderColor: colors.navy, borderWidth: 2 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0f2fe',
    color: colors.sky,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
    fontSize: 11,
    fontWeight: '700'
  },
  name: { marginTop: 8, fontSize: 16, fontWeight: '700', color: colors.navy },
  meta: { marginTop: 4, fontSize: 12, color: colors.slate500 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  status: { fontSize: 11, fontWeight: '700', color: colors.rose },
  muac: { marginTop: 4, fontSize: 12, fontWeight: '600', color: colors.slate700 },
  detailCard: {
    marginTop: 8,
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14
  },
  sectionTitle: { fontSize: 11, fontWeight: '700', letterSpacing: 1, color: colors.slate500 }
});
