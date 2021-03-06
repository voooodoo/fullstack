import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialService } from 'src/app/shared/services/material.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  aSub: Subscription;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    });
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialService.toast('Now you can login');
      } else if (params['accessDenied']) {
        MaterialService.toast('You need login');
      } else if (params['sessionFailed']) {
        MaterialService.toast('You need login');
      }
    });
  }
  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
  onSubmit() {
    this.form.disable();

    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this.aSub = this.authService.login(user).subscribe(
      () => {
        this.router.navigate(['/overview']);
      },
      error => {
        MaterialService.toast(error.error.message);
        console.warn(error);
        this.form.enable();
      }
    );
  }
}
