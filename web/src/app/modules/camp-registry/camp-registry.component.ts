import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { CampDataService } from '../../shared/services/camp-data.service';
import { CampBeneficiaryView } from '../../shared/models/camp.models';
import { Beneficiary } from '../../shared/models';
import { DISTRICT_OPTIONS } from '../../shared/models/camp.models';

@Component({
  selector: 'app-camp-registry',
  standalone: false,
  templateUrl: './camp-registry.component.html'
})
export class CampRegistryComponent implements OnInit {
  beneficiaries: CampBeneficiaryView[] = [];
  filtered: CampBeneficiaryView[] = [];
  selected: CampBeneficiaryView | null = null;
  search = '';
  districtFilter = 'ALL';
  statusFilter = 'ALL';
  readonly districts = ['ALL', ...DISTRICT_OPTIONS];

  constructor(
    private api: ApiService,
    private campData: CampDataService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.api.get<Beneficiary[]>('/beneficiaries').subscribe({
      next: (items) => {
        this.beneficiaries = items.map((item, index) => this.campData.toCampBeneficiary(item, index));
        this.applyFilters();
      }
    });
  }

  applyFilters(): void {
    this.filtered = this.beneficiaries.filter(item => {
      const matchesSearch =
        !this.search ||
        item.fullName.toLowerCase().includes(this.search.toLowerCase()) ||
        item.displayId.toLowerCase().includes(this.search.toLowerCase());
      const matchesDistrict =
        this.districtFilter === 'ALL' || item.district.toUpperCase() === this.districtFilter;
      const matchesStatus = this.statusFilter === 'ALL' || item.status === this.statusFilter;
      return matchesSearch && matchesDistrict && matchesStatus;
    });
  }

  select(item: CampBeneficiaryView): void {
    this.selected = item;
  }

  severity(status: CampBeneficiaryView['status']): 'danger' | 'success' | 'warn' {
    return this.campData.statusSeverity(status);
  }
}
