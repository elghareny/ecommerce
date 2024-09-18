/** @format */

import {Columns3, House, ShoppingBasket} from "lucide-react";
import {NavLink} from "react-router-dom";

interface IProps {
	isDashboardOpen?: boolean;
	dashboardHandler?: () => void;
	dashboardClose?: () => void;
}

const AsideLinks = ({
	isDashboardOpen,
	dashboardHandler,
	dashboardClose,
}: IProps) => {
	const dashboardLinks = [
		{
			icon: (
				<House
					className='mx-2'
					color='#c42805'
					strokeWidth={2.25}
					size={22}
				/>
			),
			title: "Home",
			route: "",
		},
		{
			icon: (
				<ShoppingBasket
					color='#c42805'
					strokeWidth={2.25}
					className='mx-2'
					size={22}
				/>
			),
			title: "Products",
			route: "products",
		},
		{
			icon: (
				<Columns3
					color='#c42805'
					strokeWidth={2.25}
					className='mx-2'
					size={22}
				/>
			),
			title: "Categories",
			route: "categories",
		},
	];

	const renderDashboardLinks = dashboardLinks.map((link, idx) => {
		return (
			<>
				<li className='mobile'>
					<NavLink
						className={` duration-300 flex justify-start items-center p-2 text-base font-semibold rounded-lg opacity-40 hover:opacity-100 `}
						onClick={dashboardClose}
						to={link.route}
						key={idx}>
						{link.icon}
						{link.title}
					</NavLink>
				</li>
				<li className='aside'>
					<NavLink
						className={` duration-300 flex text-base font-semibold rounded-lg opacity-40 hover:opacity-100  ${
							isDashboardOpen ? "py-3 pl-4 pr-10" : "p-3"
						}`}
						onClick={dashboardHandler}
						to={link.route}
						key={idx}>
						{link.icon}
						{isDashboardOpen && link.title}
					</NavLink>
				</li>
			</>
		);
	});
	return <>{renderDashboardLinks}</>;
};

export default AsideLinks;
