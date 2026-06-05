import { useCallback, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { syncService } from '../services/syncService';

export const useSyncState = () => {
  const [online, setOnline] = useState(true);
  const [outboxCount, setOutboxCount] = useState(0);
  const [syncing, setSyncing] = useState(false);

  const toggleOnline = useCallback((value: boolean) => {
    setOnline(value);
  }, []);

  const queueRecord = useCallback(() => {
    setOutboxCount(count => count + 1);
  }, []);

  const syncNow = useCallback(async () => {
    if (!online) {
      return;
    }
    setSyncing(true);
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      await syncService.syncNow();
      setOutboxCount(0);
    }
    setSyncing(false);
  }, [online]);

  return { online, outboxCount, syncing, toggleOnline, queueRecord, syncNow };
};
