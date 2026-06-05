import React from 'react';
import { Text, View } from 'react-native';

export const QRScanner = ({ onScan }: { onScan: (value: string) => void }) => (
  <View style={{ padding: 12, borderWidth: 1, borderColor: '#cbd5e1' }}>
    <Text onPress={() => onScan('demo-qr-code')}>Tap to simulate QR scan</Text>
  </View>
);
