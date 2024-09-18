/** @format */

import Navbar from "./Navbar";
import {Outlet} from "react-router-dom";
import {useState} from "react";

const RootLayout = () => {
	const [isMenuNavOpen, setIsMenuNavOpen] = useState<boolean>(false);

	const openMenuNav = () => setIsMenuNavOpen((prev) => !prev);

	return (
		<>
			<Navbar
				isMenuNavOpen={isMenuNavOpen}
				openMenuNav={openMenuNav}
			/>
			<Outlet />
		</>
	);
};

export default RootLayout;
