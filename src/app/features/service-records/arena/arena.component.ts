import { Component, computed, inject } from '@angular/core';
import { ServiceRecordsService } from '../service-records.service';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from "../../../shared/components/stat-card";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'service-record-arena',
  imports: [CommonModule, StatCardComponent],
  templateUrl: './arena.component.html'
})
export class ArenaComponent {
  private readonly route = inject(ActivatedRoute);
  readonly serviceRecord = inject(ServiceRecordsService);
  readonly gamertag = computed(() => this.route.snapshot.paramMap.get('gamertag'));
  arenaServiceRecord = this.serviceRecord.record();

  constructor() {
    this.serviceRecord.fetchServiceRecord(this.gamertag() || '');
  }

  readonly KDRatio = computed(() => {
    const record = this.serviceRecord.record();
    if (record && record.ArenaStats.TotalDeaths > 0) {
      return (record.ArenaStats.TotalKills / record.ArenaStats.TotalDeaths).toFixed(2);
    }
    return 0;
  });
}
