import { Component, OnInit } from "@angular/core";
import { first } from 'rxjs/operators'
import { templateSourceUrl } from "@angular/compiler";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services';


@Component({templateUrl: 'formtemplate.html', styleUrls: ['formtemplate.css']})

export class FormTemplate implements OnInit{
    formTemplate: FormGroup;
    returnUrl: string;
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {}
    

    ngOnInit(){
        this.fileDisplay();
    }
    private fileDisplay(){
        
    }
}

