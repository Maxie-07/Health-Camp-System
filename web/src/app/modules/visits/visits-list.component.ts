import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Visit } from '../../shared/models';

@Component({
  selector: 'app-visits-list',
  standalone: false,
  templateUrl: './visits-list.component.html'
})
export class VisitsListComponent implements OnInit {
  visits: Visit[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.get<Visit[]>('/visits').subscribe({
      next: (items) => (this.visits = items)
    });
  }
}
