/** @format */

export interface IProduct {
	id: number;
	attributes: IAttributes;
	quantity?: number;
	totalPrice?: number;
}
export interface IAttributes {
	title: string;
	description: string;
	price: number;
	stock: number;
	thumbnail: IThumbnail;
	categories: ICategories;
}

export interface IThumbnail {
	data: {attributes: {url: string; name: string}};
}

export interface ICategories {
	data: {
		id: string;
		attributes: {title: string};
	}[];
}

export interface ILoginInput {
	name: "identifier" | "password";
	placeholder: string;
	type: string;
	validation: {
		required: boolean;
		pattern?: RegExp;
		minLength?: number;
	};
}

export interface IRegisterInput {
	name: "username" | "email" | "password";
	placeholder: string;
	type: string;
	validation: {
		required: boolean;
		pattern?: RegExp;
		minLength?: number;
	};
}

export interface IFormInputLogin {
	identifier: string;
	password: string;
}
export interface IFormInputRegister {
	username: string;
	email: string;
	password: string;
}

export interface IErrorResponse {
	status?: number;
	error: {
		details?: {
			errors: {
				message: string;
			}[];
		};
		message?: string;
	};
}

export interface IUser {
	jwt: string;
	user: {
		email: string;
		id: number;
		username: string;
		createdAt: string;
		updatedAt: string;
		admin: boolean;
	};
}

export interface IProductInput {
	name: "title" | "description" | "price" | "stock";
	placeholder: string;
	type: string;
	validation: {
		required: boolean;
		minLength?: number;
	};
}

export interface IFormInputProduct {
	title: string;
	description: string;
	price: number;
	stock: number;
	categories: ICategories;
}
