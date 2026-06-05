import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  header?: ReactNode;
};

export const CampScreenShell = ({ title, subtitle, children, header }: Props) => (
  <ScrollView style={styles.container} contentContainerStyle={styles.content}>
    {header}
    <View style={styles.pageHeader}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
    {children}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, paddingBottom: 28 },
  pageHeader: { marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '700', color: colors.navy },
  subtitle: { marginTop: 4, fontSize: 13, color: colors.slate500, lineHeight: 20 }
});
