import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { Beneficiary } from '../../shared/models';

@Component({
  selector: 'app-beneficiary-list',
  standalone: false,
  templateUrl: './beneficiary-list.component.html'
})
export class BeneficiaryListComponent implements OnInit {
  beneficiaries: Beneficiary[] = [];
  form;

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      phone: [''],
      campLocation: ['']
    });
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.api.get<Beneficiary[]>('/beneficiaries').subscribe({
      next: (items) => (this.beneficiaries = items)
    });
  }

  create(): void {
    if (this.form.invalid) {
      return;
    }
    this.api.post<Beneficiary>('/beneficiaries', this.form.value).subscribe({
      next: () => {
        this.form.reset();
        this.load();
      }
    });
  }
}
