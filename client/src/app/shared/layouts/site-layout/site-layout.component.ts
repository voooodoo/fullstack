import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MaterialService } from '../../services/material.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss'],
})
export class SiteLayoutComponent implements AfterViewInit {
  links = [
    { url: '/overview', name: 'Overview' },
    { url: '/analytics', name: 'Analytics' },
    { url: '/history', name: 'History' },
    { url: '/order', name: 'Order' },
    { url: '/categories', name: 'Categories' },
  ];
  @ViewChild('floating')
  floatingRef: ElementRef;
  constructor(private authService: AuthService, private router: Router) {}
  ngAfterViewInit() {
    MaterialService.initializeFloatingButton(this.floatingRef);
  }

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
