import { FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';


function isValidEmail (email: string) {
	const pattern = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
	return pattern.test(email);
}

export function basicUserFormFieldsValidator(group: FormGroup): ValidatorFn {
	return (controls = group): ValidationErrors | null => {

		const username = controls.get('username');
		const name = controls.get('name');
		const fullname = controls.get('fullname');
		const password = controls.get('password');
		const confirmPassword = controls.get('confirmPassword');
		const email = controls.get('email');
		const phoneNumber = controls.get('phoneNumber');

		if (username) {
			if (username.dirty && !username.value) return {'emptyUsername': true};
			if (username.dirty && username.value.length < 5) return {'shortUsername': true};
			if (username.dirty && username.value.length > 100) return {'longUsername': true};
		}

		if (name) {
			if (name.dirty && !name.value) return {'emptyName': true};
			if (name.dirty && name.value.length < 1) return {'shortName': true};
			if (name.dirty && name.value.length > 100) return {'longName': true};
		}

		if (fullname) {
			if (fullname.dirty && !fullname.value) return {'emptyFullname': true};
			if (fullname.dirty && fullname.value.length < 5) return {'shortFullname': true};
			if (fullname.dirty && fullname.value.length > 50) return {'longFullname': true};
		}

		if (password) {
			if (password.dirty && !password.value) return {'emptyPassword': true};
			if (password.dirty && password.value.length < 5) return {'shortPassword': true};
			if (password.dirty && password.value.length > 128) return {'longPassword': true};
		}

		if (confirmPassword) {
			if (confirmPassword.dirty && !confirmPassword.value && password.value) return {'emptyConfirmPass': true};
			if (confirmPassword.dirty && (confirmPassword.value != password.value) && password.value) return {'invalidConfirmPass': true};
		}

		if (email) {
			if (email.dirty && !isValidEmail(email.value)) return { 'invalidEmail': true };
		}

		if (phoneNumber) {
			if (phoneNumber.dirty && !phoneNumber.valid) return { 'invalidPhoneNumber': true };
		}

		return null;
	};
}

/**
 * Validator for editting an account
 * @param group FormGroup
 */
export function editUserFormFieldsValidator(group: FormGroup): ValidatorFn {
	return (controls = group): ValidationErrors | null => {

		const username = controls.get('username');
		const name = controls.get('name');
		const fullname = controls.get('fullname');
		const password = controls.get('password');
		const confirmPassword = controls.get('confirmPassword');
		const email = controls.get('email');
		const phoneNumber = controls.get('phoneNumber');

		if (username) {
			if (username.dirty && !username.value) return {'emptyUsername': true};
			if (username.dirty && username.value.length < 5) return {'shortUsername': true};
			if (username.dirty && username.value.length > 100) return {'longUsername': true};
		}

		if (name) {
			if (name.dirty && !name.value) return {'emptyName': true};
			if (name.dirty && name.value.length < 1) return {'shortName': true};
			if (name.dirty && name.value.length > 100) return {'longName': true};
		}

		if (fullname) {
			if (fullname.dirty && !fullname.value) return {'emptyFullname': true};
			if (fullname.dirty && fullname.value.length < 5) return {'shortFullname': true};
			if (fullname.dirty && fullname.value.length > 50) return {'longFullname': true};
		}

		if (password) {
			if (password.value && password.dirty && password.value.length < 5) return {'shortPassword': true};
			if (password.dirty && password.value.length > 128) return {'longPassword': true};
		}

		if (confirmPassword) {
			if (confirmPassword.dirty && !confirmPassword.value && password.value) return {'emptyConfirmPass': true};
			if (confirmPassword.dirty && (confirmPassword.value != password.value) && password.value) return {'invalidConfirmPass': true};
		}

		if (email) {
			if (email.dirty && !isValidEmail(email.value)) return { 'invalidEmail': true };
		}
		if (phoneNumber) {
			if (phoneNumber.dirty && !phoneNumber.valid) return { 'invalidPhoneNumber': true };
		}

		return null;
	};
}

/**
 * Validator function for events forms
 * @param group Form group to validate
 * @param isEditForm Determines whether this form is an edit form
 */
export function basicEventFormValidator(group: FormGroup, isEditForm: boolean): ValidatorFn {
	return (controls = group): ValidationErrors => {
		const eventName = controls.get('eventName');
		const place = controls.get('place');
		const startTime = controls.get('startTime');
		const endTime = controls.get('endTime');

		if (eventName && ((isEditForm && eventName.dirty) || (!isEditForm && eventName.touched))) {
			if (!eventName.value) return {'emptyName': true};
			if (eventName.value.length < 1) return {'shortName': true};
			if (eventName.value.length > 100) return {'longName': true};
		}

		if (place && ((isEditForm && place.dirty) || (!isEditForm && place.touched))) {
			if (!place.value) return {'emptyPlace': true};
		}

		if (startTime && ((isEditForm && startTime.dirty) || (!isEditForm && startTime.touched))) {
			if (!startTime.value) return {'emptyStartTime': true};
			if (startTime.value >= endTime.value) return {'invalidStartTime': true};
		}

		if (endTime && ((isEditForm && endTime.dirty) || (!isEditForm && endTime.touched))) {
			if (!endTime.value) return {'emptyEndTime': true};
			if (endTime.value <= startTime.value) return {'invalidEndTime': true};
		}

		return null;
	};
}

/**
* Validator for editting an account
* @param group FormGroup
*/
export function updateProfileAFormFieldsValidator(group: FormGroup): ValidatorFn {
	return (controls = group): ValidationErrors | null => {

		const username = controls.get('username');
		const name = controls.get('name');
		const fullname = controls.get('fullname');
		const oldpassword = controls.get('oldpassword');
		const newpassword = controls.get('newpassword');
		const confirmPassword = controls.get('confirmPassword');
		const email = controls.get('email');
		const phoneNumber = controls.get('phoneNumber');

		if (username) {
			if (username.dirty && !username.value) return {'emptyUsername': true};
			if (username.dirty && username.value.length < 5) return {'shortUsername': true};
			if (username.dirty && username.value.length > 100) return {'longUsername': true};
		}

		if (name) {
			if (name.dirty && !name.value) return {'emptyName': true};
			if (name.dirty && name.value.length < 1) return {'shortName': true};
			if (name.dirty && name.value.length > 100) return {'longName': true};
		}

		if (fullname) {
			if (fullname.dirty && !fullname.value) return {'emptyFullname': true};
			if (fullname.dirty && fullname.value.length < 5) return {'shortFullname': true};
			if (fullname.dirty && fullname.value.length > 50) return {'longFullname': true};
		}

		if (newpassword) {
			if (newpassword.value && !oldpassword.value) return { 'requireOldPassword': 'true' };
			if (newpassword.value && newpassword.dirty && newpassword.value.length < 5) return {'shortPassword': true};
			if (newpassword.dirty && newpassword.value.length > 128) return {'longPassword': true};
		}

		if (confirmPassword) {
			if (confirmPassword.dirty && !confirmPassword.value && newpassword.value) return {'emptyConfirmPass': true};
			if (confirmPassword.dirty && (confirmPassword.value != newpassword.value) && newpassword.value) return {'invalidConfirmPass': true};
		}

		if (email) {
			if (email.dirty && !isValidEmail(email.value)) return { 'invalidEmail': true };
		}

		if (phoneNumber) {
			if (phoneNumber.dirty && !phoneNumber.valid) return { 'invalidPhoneNumber': true };
		}

		return null;
	};
}

/**
 * Validator for editting a visitor
 * @param group FormGroup
 */
export function editVisitorFormFieldsValidator(group: FormGroup): ValidatorFn {
	return (controls = group): ValidationErrors | null => {

		const fullname = controls.get('fullname');
		const email = controls.get('email');
		const phoneNumber = controls.get('phoneNumber');
		const company = controls.get('company');

		if (fullname) {
			if (fullname.dirty && !fullname.value) return {'emptyFullname': true};
			if (fullname.dirty && fullname.value.length <= 0) return {'shortFullname': true};
			if (fullname.dirty && fullname.value.length > 50) return {'longFullname': true};
		}

		if (email && company) {
			if (!company.value) {
				if (email.dirty && (!email.value || email.value <= 0)) return { 'invalidEmail': true };
			}
			else {
				if (email.dirty && (!email.value.toString() || email.value < 0)) return { 'invalidEmail': true };
			}
		}

		if (phoneNumber) {
			if (phoneNumber.dirty && !phoneNumber.valid) return { 'invalidPhoneNumber': true };
		}

		return null;
	};
}
