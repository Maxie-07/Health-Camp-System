import React from 'react';
import { Pressable, Text } from 'react-native';

export const SyncStatus = ({
  status,
  onSync,
}: {
  status: string;
  onSync: () => void;
}) => (
  <Pressable onPress={onSync} style={{ padding: 8 }}>
    <Text>Sync: {status}</Text>
  </Pressable>
);
