/** @format */

import * as yup from "yup";

export const LoginSchema = yup.object({
	identifier: yup
		.string()
		.required("Email is required!")
		.min(6, "Email must be at least 6 characters long!")
		.matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address!"),
	password: yup
		.string()
		.required("Password is required!")
		.min(6, "Password must be at least 6 characters long!"),
});

export const RegisterSchema = yup.object({
	username: yup
		.string()
		.required("Email is required!")
		.min(3, "Email must be at least 3 characters long!"),
	email: yup
		.string()
		.required("Email is required!")
		.min(6, "Email must be at least 6 characters long!")
		.matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address!"),
	password: yup
		.string()
		.required("Password is required!")
		.min(6, "Password must be at least 6 characters long!"),
});

export const ProductSchema = yup.object({
	title: yup
		.string()
		.required("title is required!")
		.min(3, "title must be at least 3 characters long!"),
	description: yup
		.string()
		.required("description is required!")
		.min(10, "description must be at least 6 characters long!"),
	price: yup.string().required("price is required!"),
	stock: yup.string().required("stock is required!"),
	thumbnail: yup.string().required("thumbnail is required!"),
});
