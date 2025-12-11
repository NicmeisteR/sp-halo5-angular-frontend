import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'landing-page',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './landing.component.html'
})
export class LandingComponent {
  gamertag = signal('');
  currentTime = signal(this.getTime());

  constructor(private router: Router) {
    setInterval(() => this.currentTime.set(this.getTime()), 1000);
  }

  private getTime(): string {
    const now = new Date();
    return now.toLocaleTimeString('en-GB', { hour12: false });
  }

  search(): void {
    const tag = this.gamertag().trim();
    if (tag) {
      this.router.navigate(['/service-records', tag, 'arena']);
    }
  }
}
