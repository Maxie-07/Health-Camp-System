import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { CampDataService } from '../../shared/services/camp-data.service';
import { CONSIGNMENT_ITEMS, STOCK_CATEGORIES, StockLedgerItem } from '../../shared/models/camp.models';
import { StockItem } from '../../shared/models';

@Component({
  selector: 'app-inventory',
  standalone: false,
  templateUrl: './inventory.component.html'
})
export class InventoryComponent implements OnInit {
  items: StockLedgerItem[] = [];
  filtered: StockLedgerItem[] = [];
  search = '';
  category = 'ALL CATEGORIES';
  receiptMessage = '';
  readonly categories = STOCK_CATEGORIES;
  readonly consignmentItems = CONSIGNMENT_ITEMS;
  form;

  constructor(
    private api: ApiService,
    private campData: CampDataService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      item: [CONSIGNMENT_ITEMS[0], Validators.required],
      quantity: [100, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.api.get<StockItem[]>('/stock').subscribe({
      next: (items) => {
        this.items = items.map((item, index) => this.campData.toStockLedgerItem(item, index));
        this.applyFilters();
      }
    });
  }

  applyFilters(): void {
    this.filtered = this.items.filter(item => {
      const matchesSearch =
        !this.search ||
        item.name.toLowerCase().includes(this.search.toLowerCase()) ||
        item.batch.toLowerCase().includes(this.search.toLowerCase()) ||
        item.sku.toLowerCase().includes(this.search.toLowerCase());
      const matchesCategory = this.category === 'ALL CATEGORIES' || item.category === this.category;
      return matchesSearch && matchesCategory;
    });
  }

  get depletedCount(): number {
    return this.items.filter(item => item.lowStock).length;
  }

  get topVelocity(): string {
    return this.items[0]?.name ?? 'RUTF Plumpy\'Nut';
  }

  receiveConsignment(): void {
    if (this.form.invalid) {
      return;
    }
    this.receiptMessage = `Receipt issued for ${this.form.value.quantity} units of ${this.form.value.item}.`;
    this.form.patchValue({ quantity: 100 });
  }
}
