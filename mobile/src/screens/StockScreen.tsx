import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { StockAlert } from '../components/StockAlert';
import { apiClient } from '../services/api';
import { StockItem } from '../models/Stock';

export const StockScreen = () => {
  const [items, setItems] = useState<StockItem[]>([]);

  useEffect(() => {
    apiClient.get('/stock').then(response => setItems(response.data));
  }, []);

  const lowCount = items.filter(item => item.lowStock).length;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, marginBottom: 12 }}>Stock</Text>
      {lowCount > 0 && <StockAlert count={lowCount} />}
      <FlatList
        data={items}
        keyExtractor={item => String(item.id ?? item.sku)}
        renderItem={({ item }) => (
          <Text>
            {item.name} ({item.quantity}) {item.lowStock ? '- LOW' : ''}
          </Text>
        )}
      />
    </View>
  );
};
