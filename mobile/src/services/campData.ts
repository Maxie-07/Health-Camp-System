import { Beneficiary } from '../models/Beneficiary';

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

export const toCampBeneficiary = (item: Beneficiary, index: number): CampBeneficiaryView => {
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
};

export const buildHotspots = (beneficiaries: CampBeneficiaryView[]) => {
  const grouped = new Map<string, CampBeneficiaryView[]>();
  beneficiaries.forEach(item => {
    grouped.set(item.district, [...(grouped.get(item.district) ?? []), item]);
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
};

export const buildCategories = (beneficiaries: CampBeneficiaryView[]) => {
  const counts = new Map<string, number>();
  beneficiaries.forEach(item => counts.set(item.vulnerability, (counts.get(item.vulnerability) ?? 0) + 1));
  const total = beneficiaries.length || 1;
  return Array.from(counts.entries()).map(([label, count]) => ({
    label,
    count,
    percent: Math.round((count / total) * 100)
  }));
};

export const buildInterventions = (hotspots: ReturnType<typeof buildHotspots>) => {
  const top = [...hotspots].sort((a, b) => b.severeMuacPercent - a.severeMuacPercent)[0];
  return [
    {
      category: 'NUTRITION SUPPORT',
      title: top
        ? `Severe Acute Malnutrition (SAM) Hotspot: ${top.region}`
        : 'Malnutrition Warning (High Prevalence Rate)',
      description: top
        ? `Deploy specialized community clinical team to ${top.region}. ${top.severeMuacCases} cases flagged below MUAC threshold.`
        : 'Deploy specialized community clinical team to the highest-risk subcounty immediately.'
    },
    {
      category: 'SURVEILLANCE',
      title: 'Outbreak Monitoring Required',
      description: 'Increase daily screening cadence and activate village health team alerts for symptomatic cases.'
    }
  ];
};
