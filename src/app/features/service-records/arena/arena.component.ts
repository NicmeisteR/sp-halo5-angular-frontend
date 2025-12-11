import { Component, computed, inject } from '@angular/core';
import { ServiceRecordsService } from '../service-records.service';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from "../../../shared/components/stat-card/stat-card";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TabGroupComponent } from "../../../shared/components/tab-group/tab-group";
import { TabComponent } from "../../../shared/components/tab-group/tab";

@Component({
  selector: 'service-record-arena',
  imports: [CommonModule, StatCardComponent, RouterLink, TabGroupComponent, TabComponent],
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

  readonly WinRate = computed(() => {
    const record = this.serviceRecord.record();
    if (record && record.ArenaStats.TotalGamesCompleted > 0) {
      return (record.ArenaStats.TotalGamesCompleted / record.ArenaStats.TotalGamesWon).toFixed(2);
    }
    return 0;
  });

  readonly timePlayed = computed(() => {
    const record = this.serviceRecord.record();
    if (!record?.ArenaStats?.TotalTimePlayed) return '0h';
    // Parse ISO 8601 duration (e.g., P13DT17H3M25.9518777S)
    const match = record.ArenaStats.TotalTimePlayed.match(/P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:[\d.]+S)?/);
    if (!match) return record.ArenaStats.TotalTimePlayed;
    const days = parseInt(match[1] || '0', 10);
    const hours = parseInt(match[2] || '0', 10);
    const minutes = parseInt(match[3] || '0', 10);
    const totalHours = days * 24 + hours;
    return `${totalHours}h ${minutes}m`;
  });

  readonly totalGamesPlayed = computed(() => {
    const record = this.serviceRecord.record();
    return record?.ArenaStats?.TotalGamesCompleted ?? 0;
  });

  readonly spartanRank = computed(() => {
    const record = this.serviceRecord.record();
    return record?.SpartanRank ?? 0;
  });

  readonly xp = computed(() => {
    const record = this.serviceRecord.record();
    return record?.Xp ?? 0;
  });

  readonly highestCsrAttained = computed(() => {
    const record = this.serviceRecord.record();
    const designations: { [key: number]: string } = {
      1: 'Bronze',
      2: 'Silver',
      3: 'Gold',
      4: 'Platinum',
      5: 'Diamond',
      6: 'Onyx',
      7: 'Champion'
    };
    const designationId = record?.ArenaStats?.HighestCsrAttained?.DesignationId;
    if (designationId && designations[designationId]) {
      return designations[designationId];
    }
    return 'Unknown';
  });

  formatXP(xp: number): string {
    if (xp >= 1_000_000) return (xp / 1_000_000).toFixed(1) + 'M';
    if (xp >= 1_000) return (xp / 1_000).toFixed(1) + 'K';
    return xp.toString();
  }

  activeTab = computed(() => 'overview');

  setActiveTab(tab: string) {
    this.activeTab = computed(() => tab);
  }
}
