import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';
import { Analytics } from 'src/app/shared/models/analytics';
import { Subscription } from 'rxjs';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('gain') gainRef: ElementRef;
  @ViewChild('orders') ordersRef: ElementRef;

  average: number;
  isPending = true;
  oSub: Subscription;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const gainConfig: any = {
      label: ' Gain',
      color: 'rgb(255, 99, 132)'
    };

    const ordersConfig: any = {
      label: ' Orders',
      color: 'rgb(54, 162, 235)'
    };

    this.oSub = this.analyticsService.getAnalytics().subscribe((data: Analytics) => {
      this.average = data.average;

      gainConfig.labels = data.chart.map(item => item.label);
      gainConfig.data = data.chart.map(item => item.gain);

      ordersConfig.labels = data.chart.map(item => item.label);
      ordersConfig.data = data.chart.map(item => item.order);

      const gainCtx = this.gainRef.nativeElement.getContext('2d');
      gainCtx.canvas.height = '300px';

      const ordersCtx = this.ordersRef.nativeElement.getContext('2d');
      ordersCtx.canvas.height = '300px';

      // tslint:disable-next-line:no-unused-expression
      new Chart(gainCtx, createChartConfig(gainConfig));
      new Chart(ordersCtx, createChartConfig(ordersConfig));

      this.isPending = false;
    });
  }

  ngOnDestroy() {
    if (this.oSub) {
      this.oSub.unsubscribe();
    }
  }
}

function createChartConfig({ labels, data, label, color }) {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  };
}
