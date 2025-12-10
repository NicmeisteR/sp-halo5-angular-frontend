import { Injectable, inject, signal, computed } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { ServiceRecord } from '../../shared/models/service-record.model';

@Injectable({ providedIn: 'root' })
export class ServiceRecordsService {
  private readonly api = inject(ApiService);
  private readonly apiUrl = 'arena/servicerecord/';

  readonly record = signal<ServiceRecord | null>(null);
  readonly loading = computed(() => this.api.loading());
  readonly error = computed(() => this.api.error()?.message ?? null);

  async fetchServiceRecord(gamertag: string): Promise<void> {
    const data = await this.api.get<ServiceRecord>(`${this.apiUrl}${encodeURIComponent(gamertag)}`);
    if (data) {
      this.record.set(data);
    }
  }
}