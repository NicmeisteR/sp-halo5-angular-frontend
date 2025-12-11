import { Component, input, output } from '@angular/core';

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  color?: 'cyan' | 'gold' | 'green' | 'red';
}

@Component({
  selector: 'tab-group',
  standalone: true,
  imports: [],
  template: `
    <div class="flex items-center gap-1 border-b border-[#1a3340]">
      @for (tab of tabs(); track tab.id) {
        <button 
          class="relative px-5 py-2.5 font-heading text-xs tracking-widest uppercase transition-all"
          [class.text-[#00d4ff]]="activeTab() === tab.id"
          [class.text-[#667788]]="activeTab() !== tab.id"
          [class.hover:text-[#99aabb]]="activeTab() !== tab.id"
          (click)="tabChange.emit(tab.id)"
        >
          {{ tab.label }}
          
          <!-- Active indicator line -->
          @if (activeTab() === tab.id) {
            <div class="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00d4ff]"></div>
          }
        </button>
      }
    </div>
  `,
})
export class TabGroupComponent {
  readonly tabs = input.required<TabItem[]>();
  readonly activeTab = input.required<string>();

  readonly tabChange = output<string>();
}
