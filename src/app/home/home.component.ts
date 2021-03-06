﻿import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, Form } from '../_models';
import { UserService, FormService } from '../_services';

@Component({templateUrl: 'home.component.html', styleUrls: ['home.component.css']})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    forms: Form[] = [];
    
    constructor(private userService: UserService, private claimService: FormService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.loadAllDocuments();
    }

    deleteUser(id: string) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }

    private loadAllDocuments() {
        this.claimService.getAll().pipe(first()).subscribe(forms => {
            this.forms = forms;
        })
    }
    
}