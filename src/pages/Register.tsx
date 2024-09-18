/** @format */

import {Link} from "react-router-dom";
import Button from "../components/ui/Button";
import {Register_Form} from "../data";
import Input from "../components/ui/Input";
import {Eye, EyeOff} from "lucide-react";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import {IErrorResponse, IFormInputRegister} from "../interfaces";
import {axiosInstance} from "../config/axios.config";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {RegisterSchema} from "../validation";
import {useState} from "react";
import Image from "../components/ui/Image";
import loginImg from "/src/assets/login.jpg";

const RegisterPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isShowPassword, setIsShowPassword] = useState(false);
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<IFormInputRegister>({
		resolver: yupResolver(RegisterSchema),
	});

	// HANDLER

	const onSubmitLogin: SubmitHandler<IFormInputRegister> = async (
		formData: IFormInputRegister,
	) => {
		setIsLoading(true);
		try {
			const {status} = await axiosInstance.post(
				"/api/auth/local/register",
				formData,
			);
			if (status === 200) {
				toast.success(
					"Successfully Register you will navigate to the login page !",
				);
				location.replace("/login");
			}
		} catch (error) {
			const {response} = error as AxiosError<IErrorResponse>;

			toast.error(`${response?.data?.error?.message}`);
		} finally {
			setIsLoading(false);
		}
	};

	const renderInputsForm = Register_Form.map(
		({name, placeholder, type, validation}, idx) => {
			return (
				<div
					key={idx}
					className='space-y-2 mb-3'>
					<label
						className='text-lg font-semibold'
						htmlFor={name}>
						{placeholder}
					</label>
					<div className='flex space-x-3'>
						<Input
							className={
								errors[name]
									? "ring-1 ring-red-500 py-[6px]"
									: "ring-1 ring-[#172554e0] py-[6px]"
							}
							id={name}
							type={name === "password" && isShowPassword ? "text" : type}
							placeholder={placeholder}
							{...register(name, validation)}
							name={name}
						/>
						{name === "password" && (
							<Button
								name='is-password'
								variant={"custom"}
								className='py-2'
								type='button'
								onClick={() => {
									setIsShowPassword((prev) => !prev);
								}}>
								{isShowPassword ? <EyeOff /> : <Eye />}
							</Button>
						)}
					</div>
					{errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
				</div>
			);
		},
	);

	return (
		<div className='w-full min-h-[700px] flex items-center justify-center overflow-auto'>
			<div className='flex items-center justify-center max-w-[80%] h-[500px] shadow-[0_0_30px_2px_rgb(23,37,84,0.5)] rounded-lg'>
				<div className='w-0 h-0 lg:w-[50%] lg:h-full rounded-l-md'>
					<Image
						className='w-full h-full lg:object-fill rounded-l-md'
						src={loginImg}
						alt={loginImg}
					/>
				</div>
				<div className='w-full lg:w-[50%] p-5 h-full flex flex-col justify-center'>
					<h2 className='text-center text-4xl font-semibold mb-5'>
						Create new account
					</h2>
					<form
						className=''
						onSubmit={handleSubmit(onSubmitLogin)}>
						{renderInputsForm}
						<Button
							name='register'
							variant={"custom"}
							type='submit'
							className='mt-5'
							isLoading={isLoading}
							fullWidth>
							Sign up
						</Button>
						<p className='text-center text-[18px] font-semibold mt-5'>
							Already have an account ?{" "}
							<Link
								className='text-[#172554] font-bold'
								to='/login'>
								Login
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
