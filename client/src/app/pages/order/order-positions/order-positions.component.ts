import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Position } from '../../../shared/models/position';
import { switchMap, map } from 'rxjs/operators';
import { PositionsService } from 'src/app/shared/services/position.service';
import { OrderService } from '../order.service';
import { MaterialService } from 'src/app/shared/services/material.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent implements OnInit {
  positions$: Observable<Position[]>;

  constructor(
    private route: ActivatedRoute,
    private positionsService: PositionsService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.positions$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.positionsService.fetch(params['id']);
      }),
      map((positions: Position[]) => {
        return positions.map(position => {
          position.quantity = 1;
          return position;
        });
      })
    );
  }
  addToOrder(position: Position) {
    MaterialService.toast(`Added x${position.quantity}`);
    this.orderService.add(position);
  }
}
