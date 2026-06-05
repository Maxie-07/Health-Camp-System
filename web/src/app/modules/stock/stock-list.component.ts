import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { StockItem } from '../../shared/models';

@Component({
  selector: 'app-stock-list',
  standalone: false,
  templateUrl: './stock-list.component.html'
})
export class StockListComponent implements OnInit {
  items: StockItem[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.get<StockItem[]>('/stock').subscribe({
      next: (items) => (this.items = items)
    });
  }
}
