import { Injectable } from "@angular/core";

@Injectable()
export class AuthService{
    group(arg0: { userName: (string | import("@angular/forms").ValidatorFn)[]; password: (string | import("@angular/forms").ValidatorFn)[]; }): import("@angular/forms").FormGroup {
      throw new Error("Method not implemented.");
    }
    isLoggedIn = false;

    login(){
        this.isLoggedIn = true;
    }

    logout(){
        this.isLoggedIn = false;
    }
    
    loggedIn(){
        return this.isLoggedIn;
    }

}