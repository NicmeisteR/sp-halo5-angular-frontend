import { Component, input, output } from '@angular/core';

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  color?: 'cyan' | 'gold' | 'green' | 'red';
}

@Component({
  selector: 'tab',
  standalone: true,
  imports: [],
  template: `
     <!-- Overview Tab -->
        <div class="animate-fade-in">
            <ng-content></ng-content>
        </div>
  `,
})
export class TabComponent {

}
