import { Component, OnInit } from "@angular/core";
import { first } from 'rxjs/operators'
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { AlertService, FormService } from '../_services';
import { User, Form } from "../_models";


@Component({selector: 'app-claim', templateUrl: 'formtemplate.html', styleUrls: ['formtemplate.css']})

export class FormTemplate implements OnInit{
    formTemplate: FormGroup;
    returnUrl: string;
    currentUser: User;
    loading = false;
    submitted = false;
    forms: Form [] = [];
    
    constructor(
        private formBuilder: FormBuilder,
        private formService: FormService,
        private alertService: AlertService) {};

    
    ngOnInit(){
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.loadAllUserDocs();
        this.formTemplate = this.formBuilder.group({
            user_id : [this.currentUser._id],
            name: ['', Validators.required],
            ssn: ['', Validators.required, Validators.minLength(9), Validators.maxLength(9),Validators.pattern('\d')],
            gender: ['', Validators.required],
            dob: ['', Validators.required],
            pob: ['', Validators.required],
            publicRecord: ['', Validators.required],
            religousRecord: ['', Validators.required],
            citizenship: [null, Validators.required]
        });
    }

    get f() { return this.formTemplate.controls; }

    OnSubmit(){
        this.submitted = true;
        if(this.formTemplate.invalid){
            return;
        }

        this.loading = true;
        this.formService.create(this.formTemplate.value)
            .pipe(first())
                .subscribe(
                    data => {
                        this.alertService.success('Claim successfully submitted', true);
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
    }

    loadAllUserDocs() {
        this.formService.getByUserId(this.currentUser._id).pipe(first()).subscribe( forms=>{
            this.forms = forms;

        })
    }
}

