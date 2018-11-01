import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, UserService } from '../_services';

import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'reset-password.component.html',
    styleUrls: ['reset-password.component.css']
})
export class ResetPasswordComponent {
    resetPasswordForm: FormGroup;
    loading = false;
    submitted = false;
    token : String;

    constructor(
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute){}
    
    ngOnInit(){
        this.resetPasswordForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(8)]]
        }); 

        this.token = this.route.snapshot.queryParams['token']
    }

    //Convenient getter
    get f() {return this.resetPasswordForm.controls;}

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.resetPasswordForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.resetPass(this.resetPasswordForm.value, this.token)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Your password has been successfully reset', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}