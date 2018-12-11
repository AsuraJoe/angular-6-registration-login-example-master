import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService} from "../_services";
import { User } from "../_models";

@Component({
    selector: 'app-nav',
    templateUrl: 'navBar.component.html', 
    styleUrls: ['navBar.component.css']})

export class NavigationComponent{
    currentUser: User;
    userFlag: Observable<boolean>;

    constructor(private authService: AuthenticationService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.userFlag = this.authService.isLoggedIn;
    }
}