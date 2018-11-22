import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialService } from 'src/app/shared/services/material.service';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'],
})
export class CategoriesFormComponent implements OnInit {
  @ViewChild('input') input: ElementRef;
  form: FormGroup;
  image: File;
  imagePreview = '';
  isNewCategory = true;
  category: Category;

  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
    this.form.disable();
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            this.isNewCategory = false;
            return this.categoriesService.getById(params['id']);
          }
          return of(null);
        })
      )
      .subscribe(
        (category: Category) => {
          if (category) {
            this.category = category;
            this.form.patchValue({
              name: category.name,
            });
            this.imagePreview = category.imageSrc;
            MaterialService.updateTextInput();
          }
          this.form.enable();
        },
        error => MaterialService.toast(error.error.message)
      );
  }
  triggerClick() {
    this.input.nativeElement.click();
  }

  deleteCategory() {
    const desigion = window.confirm(`Are you shure wont to remove category '${this.category.name}'`);
    if (desigion) {
      this.categoriesService
        .delete(this.category._id)
        .subscribe(
          response => MaterialService.toast(response.message),
          error => MaterialService.toast(error.error.message),
          () => this.router.navigate(['/categories'])
        );
    }
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    this.image = file;
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = <string>reader.result;
    };

    reader.readAsDataURL(file);
  }

  onSubmit() {
    let obs$;
    this.form.disable();
    if (this.isNewCategory) {
      obs$ = this.categoriesService.create(this.form.value.name, this.image);
    } else {
      obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image);
    }
    obs$.subscribe(
      category => {
        this.form.enable();
        MaterialService.toast('Changes have been saved');
      },
      error => {
        this.form.enable();
        MaterialService.toast(error.error.message);
      }
    );
  }
}
