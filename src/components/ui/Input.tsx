/** @format */

import {forwardRef, InputHTMLAttributes} from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	type?: string;
	name?: string;
	id?: string;
	className?: string;
}

const Input = forwardRef<HTMLInputElement, IProps>(
	({id, name, type, className, ...props}, ref) => {
		return (
			<input
				ref={ref}
				className={`${className} p-3 text-lg border-2 border-gray-300 shadow-lg rounded-lg bg-transparent w-full focus:outline-none `}
				type={type}
				name={name}
				id={id}
				{...props}
			/>
		);
	},
);

export default Input;
