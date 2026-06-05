import AsyncStorage from '@react-native-async-storage/async-storage';
import { SCHEMA_VERSION, TABLES } from './schema';

const DB_KEY = 'healthcamp_local_db';

type Row = Record<string, unknown>;

interface LocalDatabase {
  version: number;
  beneficiaries: Row[];
  visits: Row[];
  syncQueue: Row[];
}

const emptyDb = (): LocalDatabase => ({
  version: SCHEMA_VERSION,
  beneficiaries: [],
  visits: [],
  syncQueue: [],
});

export const initDatabase = async (): Promise<void> => {
  const existing = await AsyncStorage.getItem(DB_KEY);
  if (!existing) {
    await AsyncStorage.setItem(DB_KEY, JSON.stringify(emptyDb()));
  }
};

export const runMigrations = async (): Promise<void> => {
  await initDatabase();
  void TABLES;
};

const readDb = async (): Promise<LocalDatabase> => {
  const raw = await AsyncStorage.getItem(DB_KEY);
  return raw ? (JSON.parse(raw) as LocalDatabase) : emptyDb();
};

const writeDb = async (db: LocalDatabase): Promise<void> => {
  await AsyncStorage.setItem(DB_KEY, JSON.stringify(db));
};

export const insertBeneficiary = async (row: Row): Promise<void> => {
  const db = await readDb();
  db.beneficiaries.push({ ...row, updated_at: new Date().toISOString() });
  await writeDb(db);
};

export const insertVisit = async (row: Row): Promise<void> => {
  const db = await readDb();
  db.visits.push({ ...row, updated_at: new Date().toISOString() });
  await writeDb(db);
};

export const queueSyncItem = async (entityType: string, payload: unknown): Promise<void> => {
  const db = await readDb();
  db.syncQueue.push({
    entity_type: entityType,
    payload: JSON.stringify(payload),
    created_at: new Date().toISOString(),
  });
  await writeDb(db);
};

export const getQueuedItems = async (): Promise<Row[]> => {
  const db = await readDb();
  return db.syncQueue;
};

export const clearQueue = async (): Promise<void> => {
  const db = await readDb();
  db.syncQueue = [];
  await writeDb(db);
};

export const replaceRemoteData = async (beneficiaries: Row[], visits: Row[]): Promise<void> => {
  const db = await readDb();
  db.beneficiaries = beneficiaries;
  db.visits = visits;
  await writeDb(db);
};

export const getLocalBeneficiaries = async (): Promise<Row[]> => {
  const db = await readDb();
  return db.beneficiaries;
};

export const getLocalVisits = async (): Promise<Row[]> => {
  const db = await readDb();
  return db.visits;
};
