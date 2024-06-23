import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  fuelLoader = false;
  machanicLoader = false;
  dropLoader = false;

  constructor(private route: Router) {}

  loadButton(value: number): void {
    if (value === 1) {
      this.fuelLoader = true;
      setTimeout(() => {
        this.fuelLoader = false;
        this.route.navigate(['main-module/fuel']);
      }, 300);
    } else if (value === 2) {
      this.machanicLoader = true;
      setTimeout(() => {
        this.machanicLoader = false;
        this.route.navigate(['main-module/mechanic']);
      }, 300);
    } else {
      this.dropLoader = true;
      setTimeout(() => {
        this.dropLoader = false;
        this.route.navigate(['main-module/dropping']);
      }, 300);
    }
  }
}
