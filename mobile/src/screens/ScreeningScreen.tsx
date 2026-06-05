import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { CampScreenShell } from '../components/CampScreenShell';
import { SyncDeckHeader, useCampSync } from '../components/SyncStateContext';
import { apiClient } from '../services/api';
import { CampBeneficiaryView, toCampBeneficiary } from '../services/campData';
import { colors } from '../theme/colors';

export const ScreeningScreen = () => {
  const sync = useCampSync();
  const [beneficiaries, setBeneficiaries] = useState<CampBeneficiaryView[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [vitals, setVitals] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    apiClient.get('/beneficiaries').then(response => {
      setBeneficiaries(response.data.map((item: any, index: number) => toCampBeneficiary(item, index)));
    });
  }, []);

  const selected = beneficiaries.find(item => item.id === selectedId) ?? null;

  const submit = async () => {
    if (!selectedId || !diagnosis) {
      return;
    }

    if (!sync.online) {
      sync.queueRecord();
      setMessage('Screening saved to offline outbox.');
      return;
    }

    await apiClient.post('/visits', {
      beneficiaryId: selectedId,
      diagnosis,
      treatment,
      vitals
    });
    setMessage('Screening record saved.');
    setDiagnosis('');
    setTreatment('');
    setVitals('');
  };

  return (
    <CampScreenShell
      title="Clinical Diagnostic Screening Checklist"
      subtitle="WHO MUAC classification, vitals capture, and treatment planning."
      header={<SyncDeckHeader />}
    >
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>DIAGNOSTICS DESK</Text>
          <Text style={styles.badge}>Clinical Guidance v3</Text>
        </View>

        <Text style={styles.label}>Select Registered Camp Beneficiary *</Text>
        {beneficiaries.map(item => (
          <Pressable
            key={item.id ?? item.displayId}
            style={[styles.option, selectedId === item.id && styles.optionActive]}
            onPress={() => setSelectedId(item.id ?? null)}
          >
            <Text style={styles.optionText}>{item.displayId} — {item.fullName}</Text>
          </Pressable>
        ))}

        {selected ? (
          <View style={styles.form}>
            <Text style={styles.meta}>MUAC: {selected.muac} cm • {selected.status}</Text>
            <TextInput style={styles.input} value={vitals} onChangeText={setVitals} placeholder='Vitals JSON / notes' />
            <TextInput style={styles.input} value={diagnosis} onChangeText={setDiagnosis} placeholder="Diagnosis *" />
            <TextInput style={styles.input} value={treatment} onChangeText={setTreatment} placeholder="Treatment plan" />
            <Pressable style={styles.primaryBtn} onPress={submit}>
              <Text style={styles.primaryBtnText}>Save Screening Record</Text>
            </Pressable>
            {message ? <Text style={styles.success}>{message}</Text> : null}
          </View>
        ) : (
          <View style={styles.empty}>
            <Text style={styles.meta}>Select a participant to initiate the screening form.</Text>
          </View>
        )}
      </View>
    </CampScreenShell>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16
  },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 11, fontWeight: '700', letterSpacing: 1, color: colors.slate500 },
  badge: {
    backgroundColor: '#dcfce7',
    color: colors.emerald,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: 'hidden',
    fontSize: 10,
    fontWeight: '700'
  },
  label: { fontSize: 11, fontWeight: '700', color: colors.slate500, marginBottom: 8 },
  option: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#f8fafc'
  },
  optionActive: { borderColor: colors.navy, backgroundColor: '#eef2ff' },
  optionText: { fontSize: 12, color: colors.navy, fontWeight: '600' },
  form: { marginTop: 12 },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 10
  },
  empty: {
    marginTop: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#f8fafc'
  },
  meta: { fontSize: 12, color: colors.slate500 },
  primaryBtn: {
    marginTop: 14,
    backgroundColor: colors.navy,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center'
  },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
  success: { marginTop: 10, color: colors.emerald, fontWeight: '600' }
});
