import { Injectable, Inject, forwardRef } from '@angular/core';
// import { Http, Headers, RequestOptions  } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Config } from './config';
import 'rxjs/add/operator/map';

export class User {
    userId: string;
    authToken: string;
    refreshToken: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    locale: string;
    username: string;
    couchPassword: string;
    phoneNumber: string;


    constructor(userId: string, authToken: string, refreshToken: string, email: string, firstname: string, lastname: string,
        password: string, locale: string, username: string, couchPassword: string, phoneNumber: string) {
        this.userId = userId;
        this.authToken = authToken;
        this.refreshToken = refreshToken;
        this.email = email;
        this.firstName = firstname;
        this.lastName = lastname;
        this.password = password;
        this.locale = locale;
        this.username = username;
        this.couchPassword = couchPassword;
        this.phoneNumber = phoneNumber;
    }

    /* avcAuth 1.0.1 format */
    public toAPIUser(): any {
        return {
            UserID: this.userId,
            Email: this.email,
            Username: this.email,
            Firstname: this.firstName,
            Lastname: this.lastName,
            Password: this.password,
            PhoneNumber: this.phoneNumber,
            AcceptedAge: true,
            AcceptedTOS: true,
            AcceptedPP: true,
            Locale: this.locale
        }
    }

    /* avcAuth 2.0 format */
    public toAvcAuth2User(): any {
        return {
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            password: this.password,
            username: this.username,
            phoneNumber: this.phoneNumber
        }
    }
}


export class AuthenticationResponse {
    success: boolean;
    message: string;
    responseObject: any;
    errorObject: any;
    oneTimePassword: boolean;
    user: User;


    constructor(success: boolean, message: string, responseObject: any, errorObject: any, oneTimePassword: boolean, user: User) {
        this.errorObject = errorObject;
        this.message = message;
        this.oneTimePassword = oneTimePassword;
        this.responseObject = responseObject;
        this.success = success;
        this.user = user;
    }
}

@Injectable()
export class AvcAuth {

    public currentUser: User;
    private handler = "/api/users/";
    private debug = true;
    
    constructor(public config: Config) {
    }
}
