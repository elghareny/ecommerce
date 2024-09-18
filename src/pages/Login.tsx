/** @format */
import {SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import {LOGIN_Form} from "../data";
import {IErrorResponse, IFormInputLogin} from "../interfaces";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoginSchema} from "../validation";
import {axiosInstance} from "../config/axios.config";
import {AxiosError} from "axios";
import {Eye, EyeOff} from "lucide-react";
import cookiesService from "../services/cookies.Services";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import loginImg from "/src/assets/login.jpg";
import Image from "../components/ui/Image";
// import {useAppDispatch, useAppSelector} from "../app/features/hooks";
// import {userLogin, selectLogin} from "../app/features/authSlice";
// import {useNavigate} from "react-router-dom";

const LoginPage = () => {
	// STATE
	// const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [isShowPassword, setIsShowPassword] = useState(false);
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<IFormInputLogin>({
		resolver: yupResolver(LoginSchema),
	});

	// const {data, loading, status, error} = useAppSelector(selectLogin);

	// HANDLER

	const onSubmitLogin: SubmitHandler<IFormInputLogin> = async (
		formData: IFormInputLogin,
	) => {
		// try {
		// 	dispatch(userLogin(formData));
		// 	if (status === 200) {
		// 		toast.success("Successfully Login!", {
		// 			duration: 2000,
		// 			style: {
		// 				fontSize: "22px",
		// 				borderRadius: "10px",
		// 				background: "#333",
		// 				color: "#fff",
		// 			},
		// 		});

		// 		const date = new Date();
		// 		date.setTime(date.getTime() + 1000 * 60 * 60);
		// 		const options = {path: "/", expires: date};
		// 		cookiesService.set("user", data, options);
		// 		location.replace("/");
		// 	}
		// } catch (err) {
		// 	toast.error(`${error}`, {
		// 		duration: 2000,
		// 		style: {
		// 			fontSize: "18px",
		// 			borderRadius: "10px",
		// 			background: "#333",
		// 			color: "#fff",
		// 		},
		// 	});
		// }

		setIsLoading(true);
		try {
			const {data: resData, status} = await axiosInstance.post(
				"/api/auth/local",
				formData,
			);
			if (status === 200) {
				const date = new Date();
				date.setTime(date.getTime() + 1000 * 60 * 60);
				const options = {path: "/", expires: date};
				cookiesService.set("user", resData, options);
				toast.success("Successfully Login !");
				if (resData.user.admin) {
					setTimeout(() => {
						location.replace("/admin");
					}, 1000);
				} else {
					location.replace("/");
				}
			}
		} catch (error) {
			const {response} = error as AxiosError<IErrorResponse>;

			toast.error(`${response?.data?.error?.message}`);
		} finally {
			setIsLoading(false);
		}
	};

	// RENDER
	const renderInputsForm = LOGIN_Form.map(
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
		<div className=' w-full min-h-[700px] flex items-center justify-center overflow-auto'>
			<div className='flex items-center justify-center max-w-[80%] h-[500px]  shadow-[0_0_30px_2px_rgb(23,37,84,0.5)] rounded-lg'>
				<div className='w-0 h-0 lg:w-[50%] lg:h-full rounded-l-md'>
					<Image
						className='w-full h-full lg:object-fill rounded-l-md'
						src={loginImg}
						alt={loginImg}
					/>
				</div>
				<div className='w-full lg:w-[50%] h-full p-5 flex flex-col justify-center'>
					<h2 className='text-center text-4xl font-semibold mb-5'>
						Sign in your account
					</h2>
					<form
						className=''
						onSubmit={handleSubmit(onSubmitLogin)}>
						{renderInputsForm}
						<Button
							name='login'
							variant={"custom"}
							type='submit'
							className='mt-5'
							isLoading={isLoading}
							fullWidth>
							Sign in
						</Button>
						<p className='text-center text-[18px] font-semibold mt-5'>
							Don't have an account ?{" "}
							<Link
								className='text-[#172554] font-bold'
								to='/register'>
								Sign up
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
