/** @format */

// /** @format */

import {useEffect, useRef, useState} from "react";
import cookiesServices from "../../services/cookies.Services";
import {toast} from "react-toastify";
import {ClearCart} from "../../app/features/cartSlice";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../app/features/hooks";
import {Button} from "@headlessui/react";

const UserAvatar = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const trigger = useRef(null);
	const dropdown = useRef(null);
	const storageKey = "user";
	const UserData = cookiesServices.get(storageKey);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	// close on click outside
	useEffect(() => {
		const clickHandler = ({target}) => {
			if (!dropdown.current) return;
			if (
				!dropdownOpen ||
				dropdown.current.contains(target) ||
				trigger.current?.contains(target)
			)
				return;
			setDropdownOpen(false);
		};
		document.addEventListener("click", clickHandler);
		return () => document.removeEventListener("click", clickHandler);
	});

	const onLogout = () => {
		// localStorage.removeItem(storageKey);
		cookiesServices.remove(storageKey);
		toast.success("Successfully logout you will navigate to the login page !");
		dispatch(ClearCart());
		setDropdownOpen(false);
		navigate("/login", {replace: true, relative: "path"});
	};

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({keyCode}) => {
			if (!dropdownOpen || keyCode !== 27) return;
			setDropdownOpen(false);
		};
		document.addEventListener("keydown", keyHandler);
		return () => document.removeEventListener("keydown", keyHandler);
	});

	return (
		<section className='dark:bg-dark'>
			<div className=''>
				<div className='flex justify-center'>
					<div className='relative inline-block'>
						<button
							ref={trigger}
							onClick={() => setDropdownOpen(!dropdownOpen)}
							className='flex items-center text-left'>
							<div className='relative mr-4 h-[40px] w-[40px] rounded-full'>
								<img
									src='https://cdn.tailgrids.com/2.2/assets/core-components/images/avatar/image-05.jpg'
									alt='avatar'
									className='h-full w-full rounded-full object-cover object-center'
								/>
								<span className='absolute -right-0.5 -top-0.5 block h-[14px] w-[14px] rounded-full border-[2.3px] border-white bg-[#219653] dark:border-dark'></span>
							</div>
							<span className=' font-medium text-dark dark:text-black text-base'>
								{UserData.user.username}
							</span>
							<span className='pl-[10px] text-dark duration-100 dark:text-black'>
								<svg
									width='20'
									height='20'
									viewBox='0 0 20 20'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
									className={`fill-current ${
										dropdownOpen ? "-scale-y-100" : ""
									}`}>
									<path d='M10 14.25C9.8125 14.25 9.65625 14.1875 9.5 14.0625L2.3125 7C2.03125 6.71875 2.03125 6.28125 2.3125 6C2.59375 5.71875 3.03125 5.71875 3.3125 6L10 12.5312L16.6875 5.9375C16.9688 5.65625 17.4062 5.65625 17.6875 5.9375C17.9688 6.21875 17.9688 6.65625 17.6875 6.9375L10.5 14C10.3437 14.1562 10.1875 14.25 10 14.25Z' />
								</svg>
							</span>
						</button>
						<div
							ref={dropdown}
							onFocus={() => setDropdownOpen(true)}
							onBlur={() => setDropdownOpen(false)}
							className={`absolute right-0 top-[calc(100%+5px)] z-40 w-[200px] space-y-1 rounded-lg bg-white p-2 shadow-card dark:bg-dark-2 dark:shadow-box-dark shadow-[0_3px_10px_2px_rgb(23,37,84,0.3)] ${
								dropdownOpen ? "block" : "hidden"
							}`}>
							<Link
								to=''
								className='block w-full rounded px-3 py-2 text-left text-sm text-body-color hover:bg-gray-200 dark:text-dark-6 dark:hover:bg-dark-3 duration-300'>
								Profile
							</Link>
							<Link
								to=''
								className='block w-full rounded px-3 py-2 text-left text-sm text-body-color hover:bg-gray-200 dark:text-dark-6 dark:hover:bg-dark-3 duration-300'>
								Settings
							</Link>
							<Button
								onClick={onLogout}
								className='block w-full rounded px-3 py-2 text-left text-sm text-body-color hover:bg-gray-200 dark:text-dark-6 dark:hover:bg-dark-3 duration-300'>
								Sign Out
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default UserAvatar;

// import {useState} from "react";
// import cookiesServices from "../../services/cookies.Services";
// import {toast} from "react-toastify";
// import {Link, useNavigate} from "react-router-dom";
// import Image from "./Image";
// import {useAppDispatch} from "../../app/features/hooks";
// import {ClearCart} from "../../app/features/cartSlice";
// import Button from "./Button";

// interface IProps {}

// const UserAvatar = ({}: IProps) => {
// 	// const dispatch = useAppDispatch();
// 	// const {showMenuListAvatar} = useAppSelector(selectGlobal);
// 	// const userData = cookiesServices.get(storageKey);
// 	const storageKey = "user";
// 	const dispatch = useAppDispatch();
// 	const navigate = useNavigate();

// 	const linksMenuList = [
// 		{title: "Your Services", route: "serves"},
// 		{title: "Account Setting", route: "setting"},
// 		{title: "Logout"},
// 	];
// 	const [ShowMenuList, setShowMenuList] = useState<boolean>(false);

// 	const onLogout = () => {
// 		// localStorage.removeItem(storageKey);
// 		cookiesServices.remove(storageKey);
// 		toast.success("Successfully logout you will navigate to the login page !");
// 		// toast.success("You will navigate to the login page!", {
// 		// 	position: "top-center",
// 		// 	duration: 2000,
// 		// 	style: {
// 		// 		backgroundColor: "black",
// 		// 		color: "white",
// 		// 		width: "fit-content",
// 		// 	},
// 		// });
// 		setShowMenuList(false);
// 		dispatch(ClearCart());
// 		navigate("/login", {replace: true, relative: "path"});
// 	};

// 	const renderMenuList = linksMenuList.map((link, idx) => {
// 		if (idx === linksMenuList.length - 1) {
// 			return (
// 				<Button
// 					name='Logout'
// 					variant={"transparentBg"}
// 					onClick={() => {
// 						onLogout();
// 					}}
// 					key={idx}
// 					className='text-start dark:hover:text-black text-[18px] w-full block pl-3 pr-10 py-2 rounded-lg duration-300 hover:bg-slate-300 '>
// 					{link.title}
// 				</Button>
// 			);
// 		} else {
// 			return (
// 				<Link
// 					to={`${link.route}`}
// 					onClick={() => {
// 						if (link.title === "Logout") onLogout();
// 					}}
// 					key={idx}
// 					className='text-[18px] block pl-3 pr-10 py-2 rounded-lg duration-300 hover:bg-slate-300 '>
// 					{link.title}
// 				</Link>
// 			);
// 		}
// 	});

// 	return (
// 		<>
// 			<Image
// 				className='border-[#999] shadow-xl rounded-full cursor-pointer'
// 				width={40}
// 				height={40}
// 				src='/src/assets/react.svg'
// 				alt='avatar'
// 				onClick={() => {
// 					// if (showMenuListAvatar) {
// 					// 	dispatch(onCloseMenuListAvatar());
// 					// } else dispatch(onShowMenuListAvatar());
// 					setShowMenuList((prev) => !prev);
// 				}}
// 			/>
// 			{ShowMenuList && (
// 				<div className='p-3 bg-white shadow-[0_3px_25px_5px_rgb(150,150,150,.3)] rounded-lg absolute right-10 top-16 z-[100]'>
// 					<div className='w-full flex flex-col justify-between items-center'>
// 						<div className='w-full p-5 border-b-2 flex flex-col justify-center items-center'>
// 							<Image
// 								className='w-20 h-20 rounded-full m-5'
// 								alt='avatar'
// 								src='/src/assets/react.svg'
// 							/>
// 							<h2>User Name</h2>
// 						</div>
// 						<ul className='w-full pt-3'>{renderMenuList}</ul>
// 					</div>
// 				</div>
// 			)}
// 		</>
// 	);
// };

// export default UserAvatar;
