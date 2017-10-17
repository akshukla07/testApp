/******************************************************************************
avc-http.ts

Author: Ravi Pathak, Akhilesh Shukla

Description: This library provides HTTP Ajax helper functions.

Copyright (C) 2015-2017 Aspire Ventures 

This program is copyrighted software: you can redistribute it and/or
modify it under the terms of the Aspire General Community License as
published by Aspire Ventures, either version 1 of the License, or (at 
your option) any later version. 

This program is distributed in the hope that it will be useful, but 
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.See the 
Aspire General Community License for more details.

You should have received a copy of the Aspire General Community 
License along with this program. If not, see: 
<http://ACP.aspirevc.com/licenses/>.
******************************************************************************/
import { Injectable, Injector } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, App  } from 'ionic-angular';
import { AvcAuth, AuthenticationResponse } from './avc-auth';
import { Observable } from "rxjs/Observable";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Config } from './config';
// import { Login } from '../pages/login/login';
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/observable/throw'
import { AvcUi } from './avc-ui';

@Injectable()
export class AvcHttp {

    public debug:boolean = false;
    rootPage: any;
    public avcAuth: AvcAuth;
    private handler = "/api/users/refresh";
    private nav: NavController;
    public searchServerOffline: boolean = false;

    constructor(public injector: Injector, public platform: Platform, public config: Config, public http: Http, private app: App, public avcUi: AvcUi) {
        this.platform.ready().then(() => {
            this.avcAuth = injector.get(AvcAuth)
        });
        //this.nav = app.getActiveNav();
    }

    /*
        method - GET, PUT, POST etc.
        headers - Object containing any headers to be sent
        url - Full url to acccess
        data - payload to send (if not a string, it is coverted to JSON)
        returns a {Observable}
    */
    public sendRequest(method: string, url: string, data: any = "", headers?: any, anonymous: boolean = false) {
        //if header not required 
        if (anonymous) {
            return this.processRequest(method, headers, url, data, anonymous)
        }
        else
            return this.processRequest(method, headers, url, data, anonymous)
        /*else {
            return this.refreshAuthenticationToken().mergeMap(() => {
                // retry with new token
                return this.processRequest(method, headers, url, data, anonymous)
            });
        }*/
    }

    private processRequest(method: string, headers: any, url: string, data: any, anonymous: boolean): Observable<Response> {

        var currentObj = this;

        return new Observable(observer => {

            if (typeof method !== "string") {
                observer.next(new Error("AVC.http: sendRequest failed: METHOD not specified"))
                observer.complete();
            }
            method = method.toUpperCase();
            if (typeof url !== "string") {
                observer.next(new Error("AVC.http: sendRequest failed: URL not specified"))
                observer.complete();
            }

            // Headers and data can be empty but provide defaults
            headers = headers || {};
            if (typeof data === "string") {
                data = data || "";
            } else {
                data = JSON.stringify(data);
            }

            // Setup Request
            let options = new RequestOptions({
                method: method,
                headers: new Headers(),
                body: data,
            });

            // Add any requested headers
            for (var key in headers) {
                if (headers.hasOwnProperty(key)) {
                    options.headers.append(key, headers[key]);
                }
            }

            // Add our headers (Content & (optional Bearer token))
            options.headers.append('Content-Type', 'application/json');
            if (!anonymous) {
                options.headers.append('Authorization', `Bearer ${currentObj.avcAuth.currentUser.authToken}`);
            }

            // Make the Request
            if (this.debug) console.log("AVC.http:RQ url:" + url + " options:" + JSON.stringify(options));
            this.http.request(url, options).subscribe(
                body => {
                    if (this.debug) console.log("AVC.http:RS body:" + JSON.stringify(body));
                    if (body.status >= 200 && body.status < 300) {
                        observer.next(body.json())
                        observer.complete();
                    }
                    else if (body.status == 401) {
                        currentObj.nav = currentObj.app.getActiveNav();
                        // currentObj.nav.setRoot(Login);
                    }
                    else {
                        observer.next(body)
                        observer.complete();
                    }
                },
                err=> {
                    if (this.debug) console.log("##AvcHttp:res:" + JSON.stringify(err));
                    observer.error(err);
                    observer.complete();
                }
            );
        });
    }

}