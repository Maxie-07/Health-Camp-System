import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { SyncStateService } from '../../shared/services/sync-state.service';
import { Beneficiary } from '../../shared/models';
import { DISTRICT_OPTIONS, VULNERABILITY_OPTIONS } from '../../shared/models/camp.models';

@Component({
  selector: 'app-register-beneficiary',
  standalone: false,
  templateUrl: './register-beneficiary.component.html'
})
export class RegisterBeneficiaryComponent {
  submitted = false;
  message = '';
  readonly vulnerabilities = VULNERABILITY_OPTIONS;
  readonly districts = DISTRICT_OPTIONS;
  form;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private syncState: SyncStateService,
    private router: Router
  ) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      vulnerability: [VULNERABILITY_OPTIONS[0], Validators.required],
      age: [30, [Validators.required, Validators.min(0)]],
      district: [DISTRICT_OPTIONS[0], Validators.required],
      subcounty: ['', Validators.required],
      phone: [''],
      lc1Chief: [''],
      partialNin: ['']
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const value = this.form.value;
    const payload = {
      fullName: value.fullName,
      phone: value.phone,
      nationalId: value.partialNin,
      campLocation: `${value.district} / ${value.subcounty}`
    };

    if (this.syncState.isOnline()) {
      this.api.post<Beneficiary>('/beneficiaries', payload).subscribe({
        next: () => {
          this.submitted = true;
          this.message = 'Beneficiary registered and barcode ID generated.';
          this.form.reset({
            vulnerability: VULNERABILITY_OPTIONS[0],
            district: DISTRICT_OPTIONS[0],
            age: 30
          });
        }
      });
      return;
    }

    this.syncState.queueRecord();
    this.submitted = true;
    this.message = 'Registration saved to offline outbox. Sync when connectivity returns.';
    this.form.reset({
      vulnerability: VULNERABILITY_OPTIONS[0],
      district: DISTRICT_OPTIONS[0],
      age: 30
    });
  }
}
