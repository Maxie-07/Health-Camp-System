import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { CampDataService } from '../../shared/services/camp-data.service';
import { SyncStateService } from '../../shared/services/sync-state.service';
import { CampBeneficiaryView } from '../../shared/models/camp.models';
import { Beneficiary } from '../../shared/models';

@Component({
  selector: 'app-screening',
  standalone: false,
  templateUrl: './screening.component.html'
})
export class ScreeningComponent implements OnInit {
  beneficiaries: CampBeneficiaryView[] = [];
  beneficiaryOptions: { label: string; value: number }[] = [];
  selected: CampBeneficiaryView | null = null;
  saved = false;
  form;

  constructor(
    private api: ApiService,
    private campData: CampDataService,
    private syncState: SyncStateService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      beneficiaryId: [null, Validators.required],
      diagnosis: ['', Validators.required],
      treatment: [''],
      vitals: ['']
    });
  }

  ngOnInit(): void {
    this.api.get<Beneficiary[]>('/beneficiaries').subscribe({
      next: (items) => {
        this.beneficiaries = items.map((item, index) => this.campData.toCampBeneficiary(item, index));
        this.beneficiaryOptions = this.beneficiaries.map(item => ({
          label: `${item.displayId} — ${item.fullName}`,
          value: item.id!
        }));
      }
    });

    this.form.get('beneficiaryId')?.valueChanges.subscribe(id => {
      this.selected = this.beneficiaries.find(item => item.id === id) ?? null;
      this.saved = false;
    });
  }

  submit(): void {
    if (this.form.invalid || !this.syncState.isOnline()) {
      if (!this.syncState.isOnline()) {
        this.syncState.queueRecord();
        this.saved = true;
      }
      return;
    }

    this.api
      .post('/visits', {
        beneficiaryId: this.form.value.beneficiaryId,
        diagnosis: this.form.value.diagnosis,
        treatment: this.form.value.treatment,
        vitals: this.form.value.vitals
      })
      .subscribe({
        next: () => {
          this.saved = true;
          this.form.patchValue({ diagnosis: '', treatment: '', vitals: '' });
        }
      });
  }
}
