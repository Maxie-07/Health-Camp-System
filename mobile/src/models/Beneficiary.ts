export interface Beneficiary {
  id?: number;
  fullName: string;
  phone?: string;
  nationalId?: string;
  qrCode?: string;
  campLocation?: string;
}

export interface Visit {
  id?: number;
  beneficiaryId: number;
  visitDate?: string;
  vitals?: string;
  diagnosis?: string;
  treatment?: string;
}

export interface StockItem {
  id?: number;
  name: string;
  sku: string;
  quantity: number;
  minThreshold: number;
  lowStock?: boolean;
}
