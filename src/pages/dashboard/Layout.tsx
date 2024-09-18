/** @format */
import {useState} from "react";
import AsideLinks from "../../components/AsideLinks";
import AdminNavbar from "../../layout/AdminNavbar";
import AsideBar from "../../layout/AsideBar";
import {Outlet} from "react-router-dom";

const DashboardLayout = () => {
	// STATES
	const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);

	// HANDLER

	const onDashboardOpen = () => {
		setIsDashboardOpen((prev) => !prev);
	};

	const dashboardHandler = () => {
		setIsDashboardOpen(true);
	};

	// RENDER

	return (
		<main className='relative flex '>
			<AsideBar isDashboardOpen={isDashboardOpen}>
				<AsideLinks
					dashboardHandler={dashboardHandler}
					isDashboardOpen={isDashboardOpen}
				/>
			</AsideBar>
			<div className='w-full flex flex-col'>
				<AdminNavbar
					className='pl-2'
					isDashboardOpen={isDashboardOpen}
					dashboardClose={onDashboardOpen}
				/>
				<Outlet />
			</div>
		</main>
	);
};

export default DashboardLayout;
