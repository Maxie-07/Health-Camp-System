import React from 'react';
import { Text, View } from 'react-native';

export const OfflineIndicator = ({ online }: { online: boolean }) => (
  <View style={{ backgroundColor: online ? '#dcfce7' : '#fee2e2', padding: 8 }}>
    <Text>{online ? 'Online' : 'Offline mode'}</Text>
  </View>
);
