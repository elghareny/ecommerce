/** @format */

import {Link, NavLink} from "react-router-dom";
import cookiesService from "../services/cookies.Services";
import NavLinks from "../components/NavLinks";
import Logo from "../components/ui/Logo";
import Button from "../components/ui/Button";
import {Menu, ShoppingCart} from "lucide-react";
import {useAppDispatch, useAppSelector} from "../app/features/hooks";
import {selectCart} from "../app/features/cartSlice";
import {isOpenCartDrawer, onCloseCartDrawer} from "../app/features/globalSlice";
import UserAvatar from "../components/ui/UserAvatar";

interface IProps {
	isMenuNavOpen?: boolean;
	openMenuNav?: () => void;
	className?: string;
}
const Navbar = ({className, isMenuNavOpen, openMenuNav}: IProps) => {
	// STATE
	// const dispatch = useAppDispatch();
	// const {cartProducts} = useAppSelector(selectCart);
	// const storageKey = "user";
	// const userStorageString = localStorage.getItem(storageKey);
	// const userData = userStorageString ? JSON.parse(userStorageString) : null;
	const storageKey = "user";
	const userData = cookiesService.get(storageKey);
	const dispatch = useAppDispatch();
	const {cartProducts} = useAppSelector(selectCart);

	// HANDLER

	// RENDER
	const links = [
		{title: "Products", route: "products"},
		{title: "Contact", route: "contact"},
		{title: "About", route: "about"},
	];

	const renderMobileNavLinks = links.map((link, idx) => (
		<li key={idx}>
			<NavLink
				className={` duration-300 flex justify-start p-2 text-base font-semibold rounded-lg opacity-40 hover:opacity-100 `}
				onClick={openMenuNav}
				to={link.route}
				key={idx}>
				{link.title}
			</NavLink>
		</li>
	));

	return (
		<nav
			className={`sticky top-0 right-0 z-40 w-full flex flex-col justify-between items-center  shadow-[10px_3px_10px_2px_rgb(23,37,84,0.2)] bg-slate-100 ${className}`}>
			<div
				className={` flex justify-between items-center w-full h-[65px] px-4 `}>
				<div className='flex justify-center items-center space-x-5'>
					<div className='flex justify-center items-center space-x-5'>
						<Logo to='/' />
						<div className='desktop'>
							<NavLinks />
						</div>
						<Button
							name='menu'
							variant={"transparentBg"}
							className='mobile hover:bg-transparent dark:hover:text-black'
							onClick={openMenuNav}>
							<Menu size={20} />
						</Button>
					</div>
				</div>
				<div className='flex justify-center items-center space-x-10'>
					{!userData ? (
						<Link
							className=' text-base font-semibold'
							to={"/login"}>
							Login
						</Link>
					) : (
						<div className='flex justify-between items-center space-x-5'>
							<ul className='flex space-x-5 '>
								<div className='relative'>
									<Button
										name='Cart'
										className='relative text-base px-3  text-red-500'
										variant={"transparentBg"}
										onClick={() => {
											setTimeout(() => {
												dispatch(isOpenCartDrawer());
											}, 1);
											dispatch(onCloseCartDrawer());
										}}>
										<ShoppingCart className='mr-2' />{" "}
									</Button>
									<span className='absolute -top-1 right-0 rounded-full bg-[#172554] text-white text-base px-2 cursor-default'>
										{cartProducts.length}
									</span>
								</div>
							</ul>
							<UserAvatar />
						</div>
					)}
					{/* <Button
					className='text-[20px] px-3 py-2 text-red-500'
					variant={"transparentBg"}
					onClick={() => {
						setTimeout(() => {
							dispatch(isOpenCartDrawer());
						}, 1);
						dispatch(onCloseCartDrawer());
					}}>
					<ShoppingCart className='mr-2' /> {cartProducts.length}
				</Button> */}
					{/* {avatar} */}
				</div>
			</div>
			<ul
				className={`mobile w-full duration-300 ${
					isMenuNavOpen ? "h-fit" : "h-0"
				}`}>
				{isMenuNavOpen && renderMobileNavLinks}
			</ul>
		</nav>
	);
};

export default Navbar;
