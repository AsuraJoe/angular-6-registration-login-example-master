import { Component } from "@angular/core";
import { User } from "../_models";

@Component({templateUrl:'profile.component.html', styleUrls: ['profile.component.css']})

export class ProfileComponent{
    currentUser: User;

    constructor(){};

    ngOninit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
}