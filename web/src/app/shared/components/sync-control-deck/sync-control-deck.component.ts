import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { SyncStateService } from '../../services/sync-state.service';

@Component({
  selector: 'app-sync-control-deck',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, SelectButtonModule],
  templateUrl: './sync-control-deck.component.html'
})
export class SyncControlDeckComponent {
  connectivityOptions = [
    { label: 'Online', value: true, icon: 'pi pi-wifi' },
    { label: 'Simulate Offline', value: false, icon: 'pi pi-ban' }
  ];

  onlineModel = true;

  constructor(public syncState: SyncStateService) {
    this.onlineModel = this.syncState.isOnline();
  }

  onConnectivityChange(online: boolean): void {
    this.syncState.setOnline(online);
  }

  syncNow(): void {
    this.syncState.syncNow();
  }

  environmentLabel(): string {
    return this.syncState.isOnline() ? 'SYNC-ACKNOWLEDGE ONLINE' : 'FIELD OFFLINE CACHE MODE';
  }

  gatewayLabel(): string {
    return this.syncState.isOnline()
      ? 'Gateway ready to flush encrypted outbox records.'
      : 'Cannot sync while offline. Records remain encrypted locally.';
  }
}
