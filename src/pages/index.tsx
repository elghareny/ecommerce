/** @format */

import {Outlet} from "react-router-dom";

interface IProps {}

const HomePage = ({}: IProps) => {
	return (
		<div>
			<Outlet />
		</div>
	);
};

export default HomePage;
