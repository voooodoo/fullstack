import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import {
  MaterialInstance,
  MaterialService
} from 'src/app/shared/services/material.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/models/order';
import { Filter } from 'src/app/shared/models/filter';

const STEP = 2;
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip: MaterialInstance;
  isFilterVisible = false;
  loading = false;
  reloading = false;
  orders: Order[] = [];
  noMoreOrders = false;
  filter: Filter = {};
  oSub: Subscription;

  offset = 0;
  limit = STEP;

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.reloading = true;
    this.fetch();
  }
  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }
  ngOnDestroy() {
    this.tooltip.destroy();
    if (this.oSub) {
      this.oSub.unsubscribe();
    }
  }
  private fetch(): void {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    });
    this.oSub = this.ordersService.fetch(params).subscribe(orders => {
      this.loading = false;
      this.reloading = false;
      this.noMoreOrders = orders.length < STEP;
      this.orders = this.orders.concat(orders);
    });
  }
  loadMore() {
    this.offset += STEP;
    this.loading = true;
    this.fetch();
  }
  allpyFilter(filter: Filter) {
    this.orders = [];
    this.offset = 0;
    this.filter = filter;
    this.reloading = true;
    this.fetch();
  }
  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0;
  }
}
