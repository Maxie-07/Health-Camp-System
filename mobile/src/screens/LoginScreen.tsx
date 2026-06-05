import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { colors } from '../theme/colors';

export const LoginScreen = ({ onSuccess }: { onSuccess: () => void }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const submit = async () => {
    try {
      await login(username, password);
      onSuccess();
    } catch {
      setError('Login failed');
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.card}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Health Camp Command</Text>
          <Text style={styles.heroSubtitle}>Offline-capable camp coordination console</Text>
        </View>

        <View style={styles.form}>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Username" />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
          <Pressable style={styles.primaryBtn} onPress={submit}>
            <Text style={styles.primaryBtnText}>Enter Command Console</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    padding: 20
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border
  },
  hero: {
    backgroundColor: colors.navy,
    padding: 28,
    alignItems: 'center'
  },
  heroTitle: { color: '#fff', fontSize: 22, fontWeight: '700' },
  heroSubtitle: { marginTop: 6, color: '#cbd5e1', fontSize: 13, textAlign: 'center' },
  form: { padding: 20, gap: 12 },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  primaryBtn: {
    marginTop: 8,
    backgroundColor: colors.violet,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center'
  },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
  error: { color: colors.rose, fontWeight: '600' }
});
