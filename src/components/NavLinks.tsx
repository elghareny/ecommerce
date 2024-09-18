/** @format */

import {NavLink} from "react-router-dom";

interface IProps {
	className?: string;
}

const NavLinks = ({className}: IProps) => {
	const links = [
		{title: "Products", route: "products"},
		{title: "Contact", route: "contact"},
		{title: "About", route: "about"},
	];

	const renderNavLinks = links.map((link, idx) => (
		<li key={idx}>
			<NavLink
				to={`/${link.route}`}
				className=' rounded-lg px-3 py-2 text-base font-semibold duration-300 hover:bg-[#172554] hover:text-[#ffffff]'>
				{link.title}
			</NavLink>
		</li>
	));

	return <ul className={`flex space-x-3 ${className}`}>{renderNavLinks}</ul>;
};

export default NavLinks;
