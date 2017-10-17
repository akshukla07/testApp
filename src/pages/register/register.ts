import { Component, Inject, forwardRef } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { AvcAuth, User } from '../../providers/avc-auth';
import { ValidateEmail, ValidateIsTrue, ValidateWhiteSpace, ValidatePassword } from '../../providers/avc-validators';
// import { Login } from '../login/login';
import { AvcUi } from '../../providers/avc-ui';
import { Config } from '../../providers/config';

@Component({
    selector: 'page-register',
    templateUrl: './register.html'
})
export class Register {
    public registerForm: FormGroup;
    public passwordsMatch: boolean;
    private avcAuth: AvcAuth;

    constructor(@Inject(forwardRef(() => AvcAuth)) avcAuth, public navCtrl: NavController, fb: FormBuilder,
        public avcUi: AvcUi, public config: Config) {

        this.avcAuth = avcAuth;
        this.registerForm = fb.group({
            firstName: ["", [Validators.required, ValidateWhiteSpace]],
            lastName: ["", [Validators.required, ValidateWhiteSpace]],
            phoneNumber: ["", [ValidateWhiteSpace]],
            email: ["", [Validators.required, ValidateEmail]],
            password: ["", [Validators.required, ValidatePassword]],
            passwordConfirm: ["", Validators.required],
            ageConfirm: [false, [Validators.required, ValidateIsTrue]],
            privacyPolicy: [false, [Validators.required, ValidateIsTrue]],
            termsAgreement: [false, [Validators.required, ValidateIsTrue]]
        });

    }


    ionViewDidLoad() {
        //subscribe to the changes event on the passwords to see of they match

        //not cool
        let changes$ = (<FormControl>this.registerForm.controls['password']).valueChanges;

        // subscribe to the stream
        changes$.subscribe(password => {
            this.passwordsMatch = (password === this.registerForm.value.passwordConfirm);
        });

        //still, not cool
        let changesConfirm$ = (<FormControl>this.registerForm.controls['passwordConfirm']).valueChanges;

        // subscribe to the stream
        changesConfirm$.subscribe(passConf => {
            this.passwordsMatch = (passConf === this.registerForm.value.password);
        });
    }


    register(event) {
        console.log(`is form valid? ${this.registerForm.valid}`);

        // validate input
        let formEmail = this.registerForm.value.email;
        formEmail = formEmail.trim();
        let formPassword = this.registerForm.value.password;
        formPassword = formPassword.trim();
        let formFirstName = this.registerForm.value.firstName;
        formFirstName = formFirstName.trim();
        let formLastName = this.registerForm.value.lastName;
        formLastName = formLastName.trim();
        let phoneNumber = this.registerForm.value.phoneNumber;
        phoneNumber = phoneNumber.trim();
        this.avcUi.showLoading();
        if (formEmail.length > 256 || formPassword.length > 100 || formFirstName.length > 50 || formLastName.length > 50) {
            this.avcUi.showDialog("The registration information provided is invalid.", "Invalid input");
            return;
        }
        if (formFirstName.length == 0 || formLastName.length == 0) {
            this.avcUi.showDialog("Please enter valid first and last name.", "Invalid input");
            return;
        }
        // let user = new User(undefined, undefined, undefined, formEmail, formFirstName, formLastName, btoa(formPassword), "en_US", formEmail, "", phoneNumber);


        //console.log(this.registerForm);
       /* this.avcAuth.register(user).subscribe(res => {
            var resObj = {errors:[]};
            if (typeof res.errorObject != 'undefined') {
                if (res.errorObject.length > 0) {
                    try {
                        resObj = JSON.parse(res.errorObject);
                    }
                    catch(e) {
                        resObj = {errors:[]};
                    }
                }
            }
            if (res.success) {
                setTimeout(() => {
                    this.avcUi.dismissLoading();
                    // this.navCtrl.setRoot(Login, { isNewRegistration: true, userName: formEmail, user: user });
                });
            }
            else if (res.message.indexOf("Application is not accepting new users") > -1) {
                this.avcUi.showDialog('Registration is currently closed for this application', 'Registration Closed');
            }
            else if (resObj.errors.length > 0) {
                this.avcUi.showDialog(resObj.errors[resObj.errors.length - 1].detail, resObj.errors[resObj.errors.length - 1].title);
            }
            else {
                this.avcUi.showDialog(res.message, "Information");
            }
        },
        error => {
            this.avcUi.showDialog(error, "Error");
        });*/
    }
}
