import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { getLocalVisits } from '../database/migrations';

export const HistoryScreen = () => {
  const [visits, setVisits] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    getLocalVisits().then(setVisits);
  }, []);

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, marginBottom: 12 }}>Visit History</Text>
      <FlatList
        data={visits}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }) => (
          <Text>{String(item.diagnosis ?? 'Visit')} - {String(item.visit_date ?? 'pending')}</Text>
        )}
      />
    </View>
  );
};
