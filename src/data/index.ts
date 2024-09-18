/** @format */

import {ILoginInput, IProductInput, IRegisterInput} from "../interfaces";

export const LOGIN_Form: ILoginInput[] = [
	{
		name: "identifier",
		placeholder: "Email address",
		type: "email",
		validation: {
			required: true,
			minLength: 6,
			pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
		},
	},
	{
		name: "password",
		placeholder: "Password",
		type: "password",
		validation: {
			required: true,
			minLength: 6,
		},
	},
];

export const Register_Form: IRegisterInput[] = [
	{
		name: "username",
		placeholder: "Username",
		type: "text",
		validation: {
			required: true,
			minLength: 3,
		},
	},
	{
		name: "email",
		placeholder: "Email address",
		type: "email",
		validation: {
			required: true,
			minLength: 6,
			pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
		},
	},
	{
		name: "password",
		placeholder: "Password",
		type: "password",
		validation: {
			required: true,
			minLength: 6,
		},
	},
];

export const Product_Form: IProductInput[] = [
	{
		name: "title",
		placeholder: "Title",
		type: "text",
		validation: {
			required: true,
			minLength: 3,
		},
	},
	{
		name: "description",
		placeholder: "Description",
		type: "text",
		validation: {
			required: true,
			minLength: 10,
		},
	},
	{
		name: "price",
		placeholder: "Price",
		type: "number",
		validation: {
			required: true,
		},
	},
	{
		name: "stock",
		placeholder: "Stock",
		type: "number",
		validation: {
			required: true,
		},
	},
];
