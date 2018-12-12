import { Component, OnInit } from "@angular/core";
import { first } from 'rxjs/operators';

import { User, Form } from '../_models';
import { UserService, FormService } from '../_services';

@Component({templateUrl: 'archive.component.html', styleUrls: ['archive.component.css']})

export class ArchiveComponent{
    currentUser: User;
    users: User[] = [];
    forms: Form[] = [];
    
    constructor(private userService: UserService, private formService: FormService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.loadAllUserDocs();
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

    loadAllUserDocs() {
        this.formService.getByUserId(this.currentUser._id).pipe(first()).subscribe( forms=>{
            this.forms = forms;

        })
    }
}