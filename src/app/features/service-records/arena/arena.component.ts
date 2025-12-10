import { Component, inject } from '@angular/core';
import { ServiceRecordsService } from '../service-records.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'service-record-arena',
  imports: [CommonModule],
  templateUrl: './arena.component.html'
})
export class ArenaComponent {
  readonly serviceRecord = inject(ServiceRecordsService);
}
