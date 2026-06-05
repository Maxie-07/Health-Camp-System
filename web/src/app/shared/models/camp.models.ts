import { Beneficiary, DashboardSummary, StockItem } from './index';

export type BeneficiaryStatus = 'CRITICAL ACTION TEAM' | 'RECOVERED' | 'ACTIVE';

export interface CampBeneficiaryView extends Beneficiary {
  displayId: string;
  district: string;
  subcounty: string;
  age: number;
  vulnerability: string;
  status: BeneficiaryStatus;
  muac: number;
  lc1Chief: string;
}

export interface RegionalHotspot {
  region: string;
  attendees: number;
  criticalCases: number;
  severeMuacCases: number;
  severeMuacPercent: number;
}

export interface InterventionCard {
  category: string;
  priority: 'HIGH PRIORITY' | 'MEDIUM PRIORITY';
  title: string;
  description: string;
}

export interface CategoryBreakdown {
  label: string;
  count: number;
  percent: number;
}

export interface AnalyticsSummary extends DashboardSummary {
  criticalAlerts: number;
  recovered: number;
  malnutritionRate: number;
}

export interface StockLedgerItem extends StockItem {
  batch: string;
  category: string;
  expiryDate: string;
  totalDistributed: number;
}

export const VULNERABILITY_OPTIONS = [
  'BREASTFEEDING MOTHER',
  'PREGNANT MOTHER',
  'ELDERLY',
  'INFANT',
  'CHILD UNDER 5'
];

export const DISTRICT_OPTIONS = ['KAMPALA', 'WAKISO', 'GULU', 'MOROTO', 'MUKONO'];

export const STOCK_CATEGORIES = ['ALL CATEGORIES', 'SUPPLEMENT', 'CONSUMABLE', 'MEDICINE'];

export const CONSIGNMENT_ITEMS = [
  "RUTF Plumpy'Nut",
  'Amoxicillin 250mg',
  'Oral Rehydration Salts',
  'MUAC Tape'
];
