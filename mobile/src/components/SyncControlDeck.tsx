import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  online: boolean;
  outboxCount: number;
  syncing: boolean;
  onToggleOnline: (value: boolean) => void;
  onSync: () => void;
};

export const SyncControlDeck = ({ online, outboxCount, syncing, onToggleOnline, onSync }: Props) => (
  <View style={styles.card}>
    <View style={styles.headerRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>OFFLINE SYNC CONTROL DECK</Text>
        <Text style={styles.subtitle}>
          Simulate health camp operations with intermittent connectivity in remote subcounties.
        </Text>
      </View>
    </View>

    <View style={styles.toggleRow}>
      <Pressable
        style={[styles.toggleBtn, online && styles.toggleActive]}
        onPress={() => onToggleOnline(true)}
      >
        <Text style={[styles.toggleText, online && styles.toggleTextActive]}>Online</Text>
      </Pressable>
      <Pressable
        style={[styles.toggleBtn, !online && styles.toggleOffline]}
        onPress={() => onToggleOnline(false)}
      >
        <Text style={[styles.toggleText, !online && styles.toggleTextActive]}>Simulate Offline</Text>
      </Pressable>
    </View>

    <View style={styles.statusGrid}>
      <View style={styles.statusCard}>
        <Text style={styles.label}>Environment Status</Text>
        <Text style={styles.mono}>{online ? 'SYNC-ACKNOWLEDGE ONLINE' : 'FIELD OFFLINE CACHE MODE'}</Text>
      </View>
      <View style={styles.statusCard}>
        <Text style={styles.label}>Outbox Queue</Text>
        <Text style={styles.count}>{outboxCount}</Text>
        <Text style={styles.small}>Records Waiting</Text>
      </View>
      <View style={[styles.statusCard, styles.gatewayCard]}>
        <Text style={styles.label}>National Health Gateway</Text>
        <Text style={styles.gatewayText}>
          {online ? 'Gateway ready to flush encrypted outbox records.' : 'Cannot sync while offline.'}
        </Text>
        <Pressable
          style={[styles.syncBtn, !online && styles.syncBtnDisabled]}
          disabled={!online || syncing}
          onPress={onSync}
        >
          <Text style={styles.syncBtnText}>{online ? 'Uptodate' : 'Cannot Sync Offline'}</Text>
        </Pressable>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 12
  },
  headerRow: { marginBottom: 12 },
  title: { fontSize: 12, fontWeight: '700', letterSpacing: 1.2, color: colors.navy },
  subtitle: { marginTop: 4, fontSize: 12, color: colors.slate500, lineHeight: 18 },
  toggleRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  toggleBtn: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f8fafc'
  },
  toggleActive: { backgroundColor: colors.navy, borderColor: colors.navy },
  toggleOffline: { backgroundColor: '#fff7ed', borderColor: '#fdba74' },
  toggleText: { fontSize: 11, fontWeight: '700', color: colors.slate700 },
  toggleTextActive: { color: '#fff' },
  statusGrid: { gap: 10 },
  statusCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12
  },
  gatewayCard: { backgroundColor: '#eff6ff', borderColor: '#bfdbfe' },
  label: { fontSize: 10, fontWeight: '700', letterSpacing: 1, color: colors.slate500 },
  mono: { marginTop: 8, fontSize: 12, fontWeight: '700', color: colors.navy },
  count: { marginTop: 8, fontSize: 32, fontWeight: '700', color: colors.navy },
  small: { fontSize: 10, fontWeight: '700', letterSpacing: 1, color: colors.slate500 },
  gatewayText: { marginTop: 8, fontSize: 12, color: colors.slate700, lineHeight: 18 },
  syncBtn: {
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    paddingVertical: 10,
    alignItems: 'center'
  },
  syncBtnDisabled: { opacity: 0.6 },
  syncBtnText: { fontWeight: '700', color: colors.slate700 }
});
