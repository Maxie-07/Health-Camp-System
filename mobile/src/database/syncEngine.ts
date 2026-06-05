import { clearQueue, getQueuedItems, replaceRemoteData } from './migrations';
import { apiClient } from '../services/api';

export const pushLocalChanges = async (): Promise<void> => {
  const queue = await getQueuedItems();
  if (queue.length === 0) {
    return;
  }

  const beneficiaries = queue
    .filter(item => item.entity_type === 'beneficiary')
    .map(item => JSON.parse(String(item.payload)));

  const visits = queue
    .filter(item => item.entity_type === 'visit')
    .map(item => JSON.parse(String(item.payload)));

  await apiClient.post('/sync/push', { beneficiaries, visits });
  await clearQueue();
};

export const pullRemoteChanges = async (since?: string): Promise<void> => {
  const response = await apiClient.get('/sync/pull', {
    params: since ? { since } : undefined,
  });

  await replaceRemoteData(
    (response.data.beneficiaries ?? []).map((item: Record<string, unknown>) => ({
      server_id: item.id,
      full_name: item.fullName,
      phone: item.phone,
      qr_code: item.qrCode,
      camp_location: item.campLocation,
      updated_at: item.updatedAt,
    })),
    (response.data.visits ?? []).map((item: Record<string, unknown>) => ({
      server_id: item.id,
      beneficiary_id: item.beneficiaryId,
      visit_date: item.visitDate,
      diagnosis: item.diagnosis,
      treatment: item.treatment,
      updated_at: item.updatedAt,
    })),
  );
};

export const runSync = async (): Promise<void> => {
  await pushLocalChanges();
  await pullRemoteChanges();
};
