import NetInfo from '@react-native-community/netinfo';
import { runSync } from '../database/syncEngine';

export const syncService = {
  async syncNow(): Promise<'online' | 'offline'> {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      return 'offline';
    }
    await runSync();
    return 'online';
  },
};
