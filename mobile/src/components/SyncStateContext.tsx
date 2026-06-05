import React, { createContext, useContext, ReactNode } from 'react';
import { SyncControlDeck } from './SyncControlDeck';
import { useSyncState } from '../hooks/useSyncState';

type SyncStateContextValue = ReturnType<typeof useSyncState>;

const SyncStateContext = createContext<SyncStateContextValue | null>(null);

export const SyncStateProvider = ({ children }: { children: ReactNode }) => {
  const value = useSyncState();
  return <SyncStateContext.Provider value={value}>{children}</SyncStateContext.Provider>;
};

export const useCampSync = () => {
  const context = useContext(SyncStateContext);
  if (!context) {
    throw new Error('useCampSync must be used within SyncStateProvider');
  }
  return context;
};

export const SyncDeckHeader = () => {
  const sync = useCampSync();
  return (
    <SyncControlDeck
      online={sync.online}
      outboxCount={sync.outboxCount}
      syncing={sync.syncing}
      onToggleOnline={sync.toggleOnline}
      onSync={sync.syncNow}
    />
  );
};
