import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SyncStateService {
  private readonly online = signal(true);
  private readonly outbox = signal(0);
  private readonly syncing = signal(false);

  readonly isOnline = this.online.asReadonly();
  readonly outboxCount = this.outbox.asReadonly();
  readonly isSyncing = this.syncing.asReadonly();

  setOnline(value: boolean): void {
    this.online.set(value);
  }

  queueRecord(): void {
    this.outbox.update(count => count + 1);
  }

  clearOutbox(): void {
    this.outbox.set(0);
  }

  syncNow(): void {
    if (!this.online()) {
      return;
    }
    this.syncing.set(true);
    window.setTimeout(() => {
      this.outbox.set(0);
      this.syncing.set(false);
    }, 900);
  }
}
