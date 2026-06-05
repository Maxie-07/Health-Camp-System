export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  expiresInMs: number;
  username: string;
  role: string;
}

export interface Beneficiary {
  id: number;
  fullName: string;
  phone?: string;
  nationalId?: string;
  qrCode: string;
  campLocation?: string;
}

export interface Visit {
  id: number;
  beneficiaryId: number;
  beneficiaryName: string;
  visitDate: string;
  diagnosis?: string;
  treatment?: string;
}

export interface StockItem {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  minThreshold: number;
  lowStock: boolean;
}

export interface DashboardSummary {
  beneficiaryCount: number;
  todayVisits: number;
  lowStockCount: number;
}

export interface DailyReport {
  date: string;
  totalVisits: number;
  totalBeneficiaries: number;
  lowStockItems: number;
}
