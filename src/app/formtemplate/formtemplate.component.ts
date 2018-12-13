import { Component, OnInit } from "@angular/core";
import { first } from 'rxjs/operators'
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { AlertService, FormService } from '../_services';
import { User, Form, Item } from "../_models";import { Router } from "@angular/router";
;


@Component({selector: 'app-claim', templateUrl: 'formtemplate.html', styleUrls: ['formtemplate.css']})

export class FormTemplate implements OnInit{
    formTemplate: FormGroup;
    returnUrl: string;
    currentUser: User;
    loading = false;
    submitted = false;
    forms: Form [] = [];
    items: Item[] = [
        {id: '1', question: 'Enter Name'},
        {id: '2', question: 'Enter your Social Security Number'},
        {id: '3', question: 'Check your Gender'},
        {id: '5a', question: 'Enter your date of birth'},
        {id: '5b', question: 'Enter name of city and state or foreign country where you were born'},
        {id: '5c', question: 'Was a public record of your birth made before you were age 5?'},
        {id: '5d', question: 'Was a religious record of your birth made before you were age 5?'},
        {id: '6a', question: 'Are you a U.S. citizen?'},
        {id: '6b', question:'Are you an alien lawfully present in the U.S.?'}
    ];
    refreshUrl: string;
    route: Router;
    
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
            ssn: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9),Validators.pattern('[0-9]*')]],
            gender: ['Male', Validators.required],
            dob: ['', [Validators.required]],
            pob: ['', Validators.required],
            publicRecord: ['Yes', Validators.required],
            religiousRecord: ['Yes', Validators.required],
            citizenship: [true, Validators.required]
        });
    }

    get f() { return this.formTemplate.controls; }

    onSubmit(){
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
                        this.loadAllUserDocs();
                        this.loading = false;
                        this.submitted=false;
                        this.formTemplate = this.formBuilder.group({
                            user_id : [this.currentUser._id],
                            name: ['', Validators.required],
                            ssn: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9),Validators.pattern('[0-9]*')]],
                            gender: ['Male', Validators.required],
                            dob: ['', [Validators.required]],
                            pob: ['', Validators.required],
                            publicRecord: ['Yes', Validators.required],
                            religiousRecord: ['Yes', Validators.required],
                            citizenship: [true, Validators.required]
                        });
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

