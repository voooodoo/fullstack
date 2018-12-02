import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MaterialService, MaterialInstance } from 'src/app/shared/services/material.service';
import { OrderService } from './order.service';
import { OrderPosition, Order } from 'src/app/shared/models/order';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [OrderService]
})
export class OrderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialInstance;
  isRoot: boolean;
  pending = false;
  oSub: Subscription;

  constructor(
    private router: Router,
    public order: OrderService,
    private ordersService: OrdersService
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });
  }
  ngOnDestroy() {
    this.modal.destroy();
    if (this.oSub) {
      this.oSub.unsubscribe();
    }
  }
  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  removePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition);
  }
  open() {
    this.modal.open();
  }
  cancel() {
    this.modal.close();
  }
  submit() {
    this.pending = true;
    const order: Order = {
      list: this.order.list.map(item => {
        delete item._id;
        return item;
      })
    };
    this.oSub = this.ordersService.create(order).subscribe(
      newOrder => {
        MaterialService.toast(`Order ${newOrder.order} was added.`);
        this.order.clear();
      },
      error => {
        MaterialService.toast(error.error.message);
      },
      () => {
        this.pending = false;
        this.modal.close();
      }
    );
  }
}
