import { Injectable } from '@angular/core';
import {
  BeneficiaryStatus,
  CampBeneficiaryView,
  CategoryBreakdown,
  InterventionCard,
  RegionalHotspot,
  StockLedgerItem
} from '../models/camp.models';
import { Beneficiary, StockItem } from '../models';

@Injectable({ providedIn: 'root' })
export class CampDataService {
  toCampBeneficiary(item: Beneficiary, index: number): CampBeneficiaryView {
    const districts = ['Kampala', 'Wakiso', 'Gulu', 'Moroto', 'Mukono'];
    const vulnerabilities = ['ELDERLY', 'BREASTFEEDING MOTHER', 'PREGNANT MOTHER', 'INFANT', 'CHILD UNDER 5'];
    const statuses: BeneficiaryStatus[] = ['CRITICAL ACTION TEAM', 'ACTIVE', 'RECOVERED', 'ACTIVE'];
    const district = item.campLocation || districts[index % districts.length];

    return {
      ...item,
      displayId: `UG-HC-2026-${String(item.id ?? index + 1).padStart(4, '0')}`,
      district,
      subcounty: item.campLocation || `${district} Central`,
      age: 2 + ((item.id ?? index) * 7) % 68,
      vulnerability: vulnerabilities[index % vulnerabilities.length],
      status: statuses[index % statuses.length],
      muac: Number((9 + ((item.id ?? index) % 8) * 0.35).toFixed(1)),
      lc1Chief: `LC1 Chief ${district}`
    };
  }

  buildHotspots(beneficiaries: CampBeneficiaryView[]): RegionalHotspot[] {
    const grouped = new Map<string, CampBeneficiaryView[]>();
    beneficiaries.forEach(item => {
      const key = item.district;
      grouped.set(key, [...(grouped.get(key) ?? []), item]);
    });

    return Array.from(grouped.entries()).map(([region, items]) => {
      const severe = items.filter(item => item.muac < 11.5).length;
      const critical = items.filter(item => item.status === 'CRITICAL ACTION TEAM').length;
      return {
        region,
        attendees: items.length,
        criticalCases: critical,
        severeMuacCases: severe,
        severeMuacPercent: items.length ? Math.round((severe / items.length) * 100) : 0
      };
    });
  }

  buildInterventions(hotspots: RegionalHotspot[]): InterventionCard[] {
    const top = [...hotspots].sort((a, b) => b.severeMuacPercent - a.severeMuacPercent)[0];
    return [
      {
        category: 'NUTRITION SUPPORT',
        priority: 'HIGH PRIORITY',
        title: top
          ? `Severe Acute Malnutrition (SAM) Hotspot: ${top.region}`
          : 'Malnutrition Warning (High Prevalence Rate)',
        description: top
          ? `Deploy specialized community clinical team to ${top.region}. ${top.severeMuacCases} cases flagged below MUAC threshold.`
          : 'Deploy specialized community clinical team to the highest-risk subcounty immediately.'
      },
      {
        category: 'SURVEILLANCE',
        priority: 'HIGH PRIORITY',
        title: 'Outbreak Monitoring Required',
        description: 'Increase daily screening cadence and activate village health team alerts for symptomatic cases.'
      },
      {
        category: 'NUTRITION SUPPORT',
        priority: 'HIGH PRIORITY',
        title: 'RUTF Dispensation Surge',
        description: 'Pre-position supplementary feeding sachets before forecasted logistics disruption window.'
      },
      {
        category: 'SURVEILLANCE',
        priority: 'HIGH PRIORITY',
        title: 'Continuity Follow-up Needed',
        description: 'Schedule recovered beneficiaries for weekly MUAC checks to prevent relapse into critical status.'
      }
    ];
  }

  buildCategoryBreakdown(beneficiaries: CampBeneficiaryView[]): CategoryBreakdown[] {
    const counts = new Map<string, number>();
    beneficiaries.forEach(item => {
      counts.set(item.vulnerability, (counts.get(item.vulnerability) ?? 0) + 1);
    });
    const total = beneficiaries.length || 1;
    return Array.from(counts.entries()).map(([label, count]) => ({
      label,
      count,
      percent: Math.round((count / total) * 100)
    }));
  }

  toStockLedgerItem(item: StockItem, index: number): StockLedgerItem {
    const categories = ['SUPPLEMENT', 'CONSUMABLE', 'MEDICINE'];
    return {
      ...item,
      batch: `BATCH-${String(index + 1).padStart(3, '0')}`,
      category: categories[index % categories.length],
      expiryDate: `2026-${String((index % 12) + 1).padStart(2, '0')}-15`,
      totalDistributed: 120 + index * 35
    };
  }

  statusSeverity(status: BeneficiaryStatus): 'danger' | 'success' | 'warn' {
    if (status === 'CRITICAL ACTION TEAM') {
      return 'danger';
    }
    if (status === 'RECOVERED') {
      return 'success';
    }
    return 'warn';
  }
}
