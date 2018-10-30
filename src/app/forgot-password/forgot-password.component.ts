import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, UserService } from '../_services';

import {first} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'forgot-password.component.html',
    styleUrls: ['forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
    forgotPasswordForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private userService: UserService,
        private router: Router){}
    
    ngOnInit(){
        this.forgotPasswordForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        }); 
    }

    //Convenient getter
    get f() {return this.forgotPasswordForm.controls;}

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.forgotPasswordForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.forgotPass(this.forgotPasswordForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('An email has been sent', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
