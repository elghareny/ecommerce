/** @format */

import {Link} from "react-router-dom";
import cookiesService from "../services/cookies.Services";
import Button from "../components/ui/Button";
import {Menu} from "lucide-react";
import UserAvatar from "../components/ui/UserAvatar";
import AsideLinks from "../components/AsideLinks";

interface IProps {
	isDashboardOpen?: boolean;
	className?: string;
	dashboardClose?: () => void;
}
const AdminNavbar = ({className, isDashboardOpen, dashboardClose}: IProps) => {
	// STATE

	const storageKey = "user";
	const userData = cookiesService.get(storageKey);

	// HANDLER

	// RENDER

	return (
		<nav
			className={`sticky top-0 right-0 z-40 w-full flex flex-col justify-between items-center  shadow-[10px_3px_10px_2px_rgb(23,37,84,0.2)] bg-slate-100 ${className}`}>
			<div
				className={` flex justify-between items-center w-full h-[65px] px-1 lg:px-4 `}>
				<div className='flex justify-center items-center space-x-5'>
					<Button
						name='menu'
						variant={"transparentBg"}
						className='hover:bg-transparent dark:hover:text-black'
						onClick={dashboardClose}>
						<Menu size={20} />
					</Button>
				</div>
				<div className='flex justify-center items-center space-x-10'>
					{!userData ? (
						<Link
							className=' text-base font-semibold'
							to={"/login"}>
							Login
						</Link>
					) : (
						<UserAvatar />
					)}
				</div>
			</div>
			<ul
				className={`mobile w-full duration-300 ${
					isDashboardOpen ? "h-fit" : "h-0"
				}`}>
				{isDashboardOpen && (
					<AsideLinks
						isDashboardOpen={isDashboardOpen}
						dashboardClose={dashboardClose}
					/>
				)}
			</ul>
		</nav>
	);
};

export default AdminNavbar;
