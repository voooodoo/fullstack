import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  loading = false;
  categories$: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categories$ = this.categoriesService.fetch();
  }
}
