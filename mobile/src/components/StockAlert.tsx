import React from 'react';
import { Text, View } from 'react-native';

export const StockAlert = ({ count }: { count: number }) => (
  <View style={{ backgroundColor: '#fef3c7', padding: 8, marginVertical: 8 }}>
    <Text>{count} stock items are low</Text>
  </View>
);
