import { useCallback, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { syncService } from '../services/syncService';

export const useOfflineSync = () => {
  const [status, setStatus] = useState<'idle' | 'syncing' | 'offline' | 'done'>('idle');
  const [isOnline, setIsOnline] = useState(true);

  const sync = useCallback(async () => {
    setStatus('syncing');
    const network = await NetInfo.fetch();
    setIsOnline(!!network.isConnected);
    const result = await syncService.syncNow();
    setStatus(result === 'online' ? 'done' : 'offline');
  }, []);

  return { status, isOnline, sync };
};
