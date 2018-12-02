import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Overview } from '../models/overview';
import { Analytics } from '../models/analytics';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private http: HttpClient) {}

  getOverview(): Observable<Overview> {
    return this.http.get<Overview>('/api/analytics/overview');
  }

  getAnalytics(): Observable<Analytics> {
    return this.http.get<Analytics>('/api/analytics/analytics');
  }
}
