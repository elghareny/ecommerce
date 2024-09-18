/** @format */

import {ShoppingBag} from "lucide-react";
import Logo from "../components/ui/Logo";
import {ReactNode} from "react";

interface IProps {
	isDashboardOpen: boolean;
	children: ReactNode;
}

const AsideBar = ({isDashboardOpen, children}: IProps) => {
	return (
		<div>
			<aside
				className={`aside sticky top-0 left-0 w-fit flex-col items-center px-3 py-5 z-40  h-screen shadow-[0_3px_10px_2px_rgb(23,37,84,0.2)] bg-slate-100 ${
					isDashboardOpen ? " lg:flex " : " hidden"
				}`}>
				<div className='mb-5 flex justify-center'>
					{isDashboardOpen ? (
						<Logo to='/admin' />
					) : (
						<ShoppingBag
							size={22}
							className=''
							color='#c42805'
						/>
					)}
				</div>
				<ul className='flex flex-col space-y-3'>{children}</ul>
			</aside>
		</div>
	);
};

export default AsideBar;
