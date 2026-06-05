import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CampScreenShell } from '../components/CampScreenShell';
import { SyncDeckHeader } from '../components/SyncStateContext';
import { apiClient } from '../services/api';
import { buildCategories, buildHotspots, buildInterventions, toCampBeneficiary } from '../services/campData';
import { colors } from '../theme/colors';

export const DashboardScreen = () => {
  const [summary, setSummary] = useState({ beneficiaryCount: 0, todayVisits: 0, lowStockCount: 0 });
  const [beneficiaries, setBeneficiaries] = useState<any[]>([]);

  useEffect(() => {
    apiClient.get('/beneficiaries/summary').then(response => setSummary(response.data));
    apiClient.get('/beneficiaries').then(response => {
      setBeneficiaries(response.data.map((item: any, index: number) => toCampBeneficiary(item, index)));
    });
  }, []);

  const hotspots = buildHotspots(beneficiaries);
  const categories = buildCategories(beneficiaries);
  const interventions = buildInterventions(hotspots);
  const critical = beneficiaries.filter(item => item.status === 'CRITICAL ACTION TEAM').length;
  const recovered = beneficiaries.filter(item => item.status === 'RECOVERED').length;
  const severe = beneficiaries.filter(item => item.muac < 11.5).length;
  const malnutritionRate = beneficiaries.length ? Math.round((severe / beneficiaries.length) * 100) : 0;

  return (
    <CampScreenShell
      title="Camp Coordinator Analytics Hub"
      subtitle="Decision support diagnostics and localized intervention planning."
      header={<SyncDeckHeader />}
    >
      <View style={styles.metricsRow}>
        <MetricCard dark label="Total Registered" value={String(summary.beneficiaryCount)} hint="Beneficiaries logged" />
        <MetricCard label="Critical Alerts" value={String(critical || summary.lowStockCount)} hint="Immediate recheck" accent={colors.rose} />
      </View>
      <View style={styles.metricsRow}>
        <MetricCard label="Recovered" value={String(recovered)} hint="Continuity success" accent={colors.emerald} />
        <MetricCard label="Malnutrition Rate" value={`${malnutritionRate}%`} hint="Under wasting threshold" accent={colors.violet} />
      </View>

      <Section title="UGANDA REGIONAL HOTSPOTS">
        {hotspots.map(hotspot => (
          <View key={hotspot.region} style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>{hotspot.region}</Text>
              <Text style={styles.meta}>{hotspot.attendees} Attendees</Text>
            </View>
            <Text style={styles.meta}>Critical Cases: {hotspot.criticalCases} Action Required</Text>
            <Text style={styles.alertMeta}>
              Severe MUAC: {hotspot.severeMuacCases} cases ({hotspot.severeMuacPercent}%)
            </Text>
          </View>
        ))}
      </Section>

      <Section title="EVIDENCE-BASED TARGETED INTERVENTIONS">
        {interventions.map(item => (
          <View key={item.title} style={styles.interventionCard}>
            <Text style={styles.tag}>{item.category}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.meta}>{item.description}</Text>
            <Text style={styles.proven}>Clinically Proven Decision Model</Text>
          </View>
        ))}
      </Section>

      <Section title="CAMP CATEGORY DISTRIBUTION">
        <View style={styles.categoryGrid}>
          {categories.map(item => (
            <View key={item.label} style={styles.categoryCard}>
              <Text style={styles.meta}>{item.label}</Text>
              <Text style={styles.cardTitle}>{item.count} ({item.percent}%)</Text>
            </View>
          ))}
        </View>
      </Section>
    </CampScreenShell>
  );
};

const MetricCard = ({
  label,
  value,
  hint,
  accent,
  dark
}: {
  label: string;
  value: string;
  hint: string;
  accent?: string;
  dark?: boolean;
}) => (
  <View style={[styles.metricCard, dark && styles.metricDark]}>
    <Text style={[styles.meta, dark && styles.metricDarkText]}>{label}</Text>
    <Text style={[styles.metricValue, dark && styles.metricDarkText, accent ? { color: accent } : undefined]}>{value}</Text>
    <Text style={[styles.meta, dark && styles.metricDarkText]}>{hint}</Text>
  </View>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={{ marginTop: 16 }}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  metricsRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  metricCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14
  },
  metricDark: { backgroundColor: colors.navy, borderColor: colors.navy },
  metricDarkText: { color: '#cbd5e1' },
  metricValue: { marginTop: 8, fontSize: 28, fontWeight: '700', color: colors.navy },
  sectionTitle: { fontSize: 11, fontWeight: '700', letterSpacing: 1, color: colors.slate500, marginBottom: 10 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 10
  },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  cardTitle: { fontWeight: '700', color: colors.navy },
  meta: { fontSize: 12, color: colors.slate500, marginTop: 4 },
  alertMeta: { fontSize: 12, color: colors.rose, marginTop: 4, fontWeight: '600' },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  categoryCard: {
    width: '47%',
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12
  },
  interventionCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 10
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#dbeafe',
    color: colors.sky,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: 'hidden',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 8
  },
  proven: { marginTop: 10, fontSize: 10, fontWeight: '700', color: colors.emerald, letterSpacing: 0.8 }
});
