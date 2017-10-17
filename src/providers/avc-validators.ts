import { FormControl } from '@angular/forms';
import { Config } from './config';

export function ValidateIsTrue(c: FormControl) {

	return c.value === true ? null : {
		validateIsTrue: {
			valid: false
		}
	};
}

export function ValidateEmail(c: FormControl) {

	let reg = /^([A-Za-z0-9_\-\.+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

	return reg.test(c.value) ? null : {
		validateEmail: {
			valid: false
		}
	};
}


export function ValidateNumber(c: FormControl) {

	return !isNaN(Number(c.value)) ? null : {
		validateNumber: {
			valid: false
		}
	};
}


export function ValidateAge(c: FormControl) {

    var config = new Config();
    let currentDate: any = new Date();
    let selectedDate: any = new Date(c.value);
    let diff: any = (currentDate - selectedDate) / 1000;
    let diffInYears: any = Math.floor((diff / (24*60*60)) / 365);

    /*return diffInYears > config.minAge ? null : {
        ValidateAge: { 
            valid: false
        }
    };*/

	return null;
}

export function ValidateWhiteSpace(c: FormControl) {

    return c.value.trim().length > 0 ? null : {
        ValidateWhiteSpace: {
            valid: false
        }
    };
}

export function ValidatePassword(c: FormControl) {

	let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*`?&\-=|#+;~^></\\(){}\[\]])[A-Za-z\d$@$!%*`?&\-=|#+;~^&gt;&lt;/\\(){}\[\]]{8,}/;
	return reg.test(c.value) ? null : {
		invalidPassword: true,
	};
}