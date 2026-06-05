import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { CampDataService } from '../../shared/services/camp-data.service';
import {
  AnalyticsSummary,
  CampBeneficiaryView,
  CategoryBreakdown,
  InterventionCard,
  RegionalHotspot
} from '../../shared/models/camp.models';
import { Beneficiary, DashboardSummary } from '../../shared/models';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  summary: AnalyticsSummary | null = null;
  hotspots: RegionalHotspot[] = [];
  interventions: InterventionCard[] = [];
  categories: CategoryBreakdown[] = [];
  beneficiaries: CampBeneficiaryView[] = [];

  constructor(
    private api: ApiService,
    private campData: CampDataService
  ) {}

  ngOnInit(): void {
    this.api.get<Beneficiary[]>('/beneficiaries').subscribe({
      next: (items) => {
        this.beneficiaries = items.map((item, index) => this.campData.toCampBeneficiary(item, index));
        this.hotspots = this.campData.buildHotspots(this.beneficiaries);
        this.interventions = this.campData.buildInterventions(this.hotspots);
        this.categories = this.campData.buildCategoryBreakdown(this.beneficiaries);
        this.refreshSummary({ beneficiaryCount: items.length, todayVisits: 0, lowStockCount: 0 });
      }
    });

    this.api.get<DashboardSummary>('/beneficiaries/summary').subscribe({
      next: (apiSummary) => this.refreshSummary(apiSummary)
    });
  }

  hotspotBarClass(percent: number): string {
    return percent >= 40 ? 'bg-rose-500' : 'bg-violet-500';
  }

  private refreshSummary(apiSummary: DashboardSummary): void {
    const critical = this.beneficiaries.filter(item => item.status === 'CRITICAL ACTION TEAM').length;
    const recovered = this.beneficiaries.filter(item => item.status === 'RECOVERED').length;
    const severe = this.beneficiaries.filter(item => item.muac < 11.5).length;
    const total = apiSummary.beneficiaryCount || this.beneficiaries.length;

    this.summary = {
      ...apiSummary,
      beneficiaryCount: total,
      criticalAlerts: critical || apiSummary.lowStockCount,
      recovered: recovered || Math.max(0, total - critical),
      malnutritionRate: total ? Math.round((severe / total) * 100) : 0
    };
  }
}
