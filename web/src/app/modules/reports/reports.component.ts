import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { DailyReport } from '../../shared/models';

@Component({
  selector: 'app-reports',
  standalone: false,
  templateUrl: './reports.component.html'
})
export class ReportsComponent {
  report: DailyReport | null = null;
  form;

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.form = this.fb.group({ date: [new Date()] });
  }

  load(): void {
    const date = this.formatDate(this.form.value.date);
    this.api.get<DailyReport>(`/reports/daily?date=${date}`).subscribe({
      next: (report) => (this.report = report)
    });
  }

  private formatDate(value: Date | string | null | undefined): string {
    if (!value) {
      return new Date().toISOString().slice(0, 10);
    }
    if (value instanceof Date) {
      return value.toISOString().slice(0, 10);
    }
    return value;
  }
}
