export interface UserI {
	id?: string;
	email: string;
	name?: string;
	password?: string;
	betaUser?: boolean;
	emailValidated?: boolean;
	lastValidationEmailSentTs?: number;
}
