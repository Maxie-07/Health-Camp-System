import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { CampScreenShell } from '../components/CampScreenShell';
import { SyncDeckHeader, useCampSync } from '../components/SyncStateContext';
import { apiClient } from '../services/api';
import { colors } from '../theme/colors';

const VULNERABILITIES = ['BREASTFEEDING MOTHER', 'PREGNANT MOTHER', 'ELDERLY', 'INFANT', 'CHILD UNDER 5'];
const DISTRICTS = ['KAMPALA', 'WAKISO', 'GULU', 'MOROTO', 'MUKONO'];

export const RegisterScreen = () => {
  const sync = useCampSync();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [subcounty, setSubcounty] = useState('');
  const [district, setDistrict] = useState(DISTRICTS[0]);
  const [vulnerability, setVulnerability] = useState(VULNERABILITIES[0]);
  const [message, setMessage] = useState('');

  const submit = async () => {
    if (!fullName || !subcounty) {
      return;
    }

    const payload = {
      fullName,
      phone,
      campLocation: `${district} / ${subcounty}`
    };

    if (sync.online) {
      await apiClient.post('/beneficiaries', payload);
      setMessage('Beneficiary registered and barcode ID generated.');
    } else {
      sync.queueRecord();
      setMessage('Registration saved to offline outbox.');
    }

    setFullName('');
    setPhone('');
    setSubcounty('');
  };

  return (
    <CampScreenShell
      title="Enroll New Camp Participant"
      subtitle="Capture demographic, vulnerability, and rural identity fallback records."
      header={<SyncDeckHeader />}
    >
      {message ? <Text style={styles.success}>{message}</Text> : null}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>VULNERABLE REGISTER</Text>
        <Text style={styles.label}>Full Name of Beneficiary *</Text>
        <TextInput style={styles.input} value={fullName} onChangeText={setFullName} placeholder="Enter full legal name" />

        <Text style={styles.label}>Vulnerability Category</Text>
        <View style={styles.chipRow}>
          {VULNERABILITIES.map(item => (
            <Pressable
              key={item}
              style={[styles.chip, vulnerability === item && styles.chipActive]}
              onPress={() => setVulnerability(item)}
            >
              <Text style={[styles.chipText, vulnerability === item && styles.chipTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Home District</Text>
        <View style={styles.chipRow}>
          {DISTRICTS.map(item => (
            <Pressable
              key={item}
              style={[styles.chip, district === item && styles.chipActive]}
              onPress={() => setDistrict(item)}
            >
              <Text style={[styles.chipText, district === item && styles.chipTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Subcounty / Village *</Text>
        <TextInput style={styles.input} value={subcounty} onChangeText={setSubcounty} placeholder="Enter subcounty or village" />

        <Text style={styles.label}>Contact Phone</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="+256..." keyboardType="phone-pad" />
      </View>

      <View style={styles.fallbackBox}>
        <Text style={styles.sectionTitle}>RURAL IDENTITY FALLBACK RECORDS</Text>
        <View style={styles.dashedBox}>
          <Text style={styles.dashedTitle}>Simulated Biometric Fingerprint Hash</Text>
          <Text style={styles.meta}>Placeholder for field biometric capture during offline enrollment.</Text>
        </View>
      </View>

      <Pressable style={styles.primaryBtn} onPress={submit}>
        <Text style={styles.primaryBtnText}>Register and Generate Barcode ID</Text>
      </Pressable>
    </CampScreenShell>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 12
  },
  sectionTitle: { fontSize: 11, fontWeight: '700', letterSpacing: 1, color: colors.slate500, marginBottom: 12 },
  label: { fontSize: 11, fontWeight: '700', letterSpacing: 0.8, color: colors.slate500, marginBottom: 6, marginTop: 8 },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#f8fafc'
  },
  chipActive: { backgroundColor: colors.navy, borderColor: colors.navy },
  chipText: { fontSize: 10, fontWeight: '700', color: colors.slate700 },
  chipTextActive: { color: '#fff' },
  fallbackBox: {
    backgroundColor: '#eff6ff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    padding: 16,
    marginBottom: 12
  },
  dashedBox: {
    marginTop: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#93c5fd',
    borderRadius: 12,
    backgroundColor: colors.card,
    padding: 16,
    alignItems: 'center'
  },
  dashedTitle: { fontWeight: '700', color: colors.slate700 },
  meta: { marginTop: 6, fontSize: 12, color: colors.slate500, textAlign: 'center' },
  primaryBtn: {
    backgroundColor: colors.violet,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center'
  },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
  success: { marginBottom: 12, color: colors.emerald, fontWeight: '600' }
});
