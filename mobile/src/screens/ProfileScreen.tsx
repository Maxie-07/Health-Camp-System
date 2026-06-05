import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CampScreenShell } from '../components/CampScreenShell';
import { useAuth } from '../hooks/useAuth';
import { colors } from '../theme/colors';

export const ProfileScreen = ({ onLogout }: { onLogout: () => void }) => {
  const { logout } = useAuth();

  return (
    <CampScreenShell title="Coordinator Profile" subtitle="Session and device settings.">
      <View style={styles.card}>
        <Text style={styles.meta}>Signed in to Health Camp Command</Text>
        <Pressable
          style={styles.primaryBtn}
          onPress={async () => {
            await logout();
            onLogout();
          }}
        >
          <Text style={styles.primaryBtnText}>Logout</Text>
        </Pressable>
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
  meta: { fontSize: 14, color: colors.slate700, marginBottom: 16 },
  primaryBtn: {
    backgroundColor: colors.navy,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center'
  },
  primaryBtnText: { color: '#fff', fontWeight: '700' }
});
