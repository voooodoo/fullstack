import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { PositionsService } from 'src/app/shared/services/position.service';
import { Position } from '../../../../shared/models/position';
import { MaterialService, MaterialInstance } from 'src/app/shared/services/material.service';
@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss'],
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() categoryId: string;
  @ViewChild('modal') modalRef: ElementRef;
  positions: Position[];
  loading = false;
  modal: MaterialInstance;

  constructor(private positionsService: PositionsService) {}

  ngOnInit() {
    this.loading = true;
    this.positionsService.fetch(this.categoryId).subscribe(positions => {
      this.positions = positions;
      this.loading = false;
    });
  }
  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }
  ngOnDestroy() {
    this.modal.destroy();
  }
  onSelectPosition(position: Position) {
    this.modal.open();
  }

  onAddPosition() {
    this.modal.open();
  }
  onCancel() {
    this.modal.close();
  }
}
