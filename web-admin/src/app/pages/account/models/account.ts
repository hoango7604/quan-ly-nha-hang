import { Role } from './role';

export class Account {
	public id: number;
	public username: string;
	public password: string;
	public fullname: string;
	public role: Role | string;
	public email: string;
	public phoneNumber: string;
	public dependEventId: string;
	public isEnabled: boolean | string;
}
