import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import {
  MaterialInstance,
  MaterialService
} from 'src/app/shared/services/material.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements AfterViewInit, OnDestroy {
  @Input() orders: Order[];
  @ViewChild('modal') modalRef: ElementRef;

  selectedOrder: Order;
  modal: MaterialInstance;

  constructor() {}

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  computePrice(order: Order): number {
    return order.list.reduce((total, item) => {
      return (total += item.quantity * item.cost);
    }, 0);
  }
  selectOrder(order: Order) {
    this.selectedOrder = order;
    this.modal.open();
  }
  closeModal() {
    this.modal.close();
  }
}
