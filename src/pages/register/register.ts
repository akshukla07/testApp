import { Component, Inject, forwardRef } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { ValidateEmail, ValidateWhiteSpace } from '../../providers/avc-validators';
import { Fileupload } from '../fileupload/fileupload';
import { AvcUi } from '../../providers/avc-ui';
import { Config } from '../../providers/config';

@Component({
    selector: 'page-register',
    templateUrl: './register.html'
})
export class Register {
    public registerForm: FormGroup;
    private city: Array<String> = [""];

    constructor(public navCtrl: NavController, fb: FormBuilder, public avcUi: AvcUi, public config: Config, public http: Http) {

        // this.states = Object.keys(this.config.cityStates);
        this.registerForm = fb.group({
            firstName: ["", [Validators.required, ValidateWhiteSpace]],
            lastName: ["", [Validators.required, ValidateWhiteSpace]],
            phoneNumber: ["", [ValidateWhiteSpace]],
            email: ["", [Validators.required, ValidateEmail]],
            address: ["", [Validators.required, ValidateWhiteSpace]],
            state: ["", [Validators.required, ValidateWhiteSpace]],
            city: ["", [Validators.required, ValidateWhiteSpace]],
            password: ["", [Validators.required, ValidateWhiteSpace]],
        });

    }

    getStates() {
        return Object.keys(this.config.cityStates);
    }
    
    changeCity() {
        this.avcUi.showLoading();
        console.log('called');
        this.city = this.config.cityStates[this.registerForm.value.state].cities;
        console.log(this.city);
        this.avcUi.dismissLoading();
    }

    getCities() {
        return this.city;
    }

    register(event) {
        // validate input
        let formData = {
            email: this.registerForm.value.email.trim(),
            first_name: this.registerForm.value.firstName.trim(),
            last_name: this.registerForm.value.lastName.trim(),
            phone: this.registerForm.value.phoneNumber.trim(),
            address: this.registerForm.value.address.trim(),
            state: this.config.cityStates[this.registerForm.value.state.trim()].name,
            city: this.registerForm.value.city.trim(),
            password: this.registerForm.value.password.trim()
        }

        this.avcUi.showLoading();
        
        if (formData.email.length > 256) {
            this.avcUi.showDialog("The registration information provided is invalid.", "Invalid input");
            return;
        }
        if (formData.first_name.length == 0 || formData.last_name.length == 0) {
            this.avcUi.showDialog("Please enter valid first and last name.", "Invalid input");
            return;
        }

        console.log(formData);
        
        
        // Setup Request
        let options = new RequestOptions({
            method: 'POST',
            headers: new Headers(),
            body: formData
        });

        this.http.request(this.config.uri+'user-register', options).subscribe(
            (res:any) => {
                res = res.json();
                console.log(res);
                this.avcUi.dismissLoading();
                if(res.status != 'error'){
                    this.avcUi.showToast(res.msg, res.status);
                    this.navCtrl.setRoot(Fileupload, { user: res.user });
                }
                else {
                    this.avcUi.showToast(res.msg, res.status);
                }
            },
            err => {
                console.log(err);
                this.avcUi.dismissLoading();
            }
        );
    }
}
