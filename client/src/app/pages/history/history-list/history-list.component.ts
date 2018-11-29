import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
  @Input() orders: Order[];
  constructor() {}

  ngOnInit() {}
}
