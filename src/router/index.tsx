/** @format */

import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import ErrorHandler from "../components/errors/ErrorHandler";
import HomePage from "../pages";
import ProductsPage from "../pages/Products";
import RootLayout from "../layout/Layout";
import ProductDetails from "../pages/ProductDetails";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import cookiesService from "../services/cookies.Services";
import DashboardLayout from "../pages/dashboard/Layout";
import AdminPage from "../pages/dashboard";
import RegisterPage from "../pages/Register";
import DashboardProductsPage from "../pages/dashboard/DashboardProducts";
import LoginPage from "../pages/Login";

// const storageKey = "user";
// const userStorageString = localStorage.getItem(storageKey);
// const userData = userStorageString ? JSON.parse(userStorageString) : null;

const storageKey = "user";
const userData = cookiesService.get(storageKey);

const router = createBrowserRouter(
	createRoutesFromElements([
		// <Route
		// 	path='/login'
		// 	element={
		// 		<ProtectedRoute
		// 			isAllowed={!userData}
		// 			redirectPath={"/"}>
		// 			<LoginLayout />
		// 		</ProtectedRoute>
		// 	}
		// 	errorElement={<ErrorHandler />}></Route>,
		// <Route
		// 	path='/register'
		// 	element={<RegisterPage />}
		// 	errorElement={<ErrorHandler />}></Route>,
		<Route
			path='/'
			element={<RootLayout />}
			errorElement={<ErrorHandler />}>
			<Route
				index
				element={<HomePage />}
			/>
			<Route
				path='products'
				element={<ProductsPage />}
			/>
			<Route
				path={`products/:id`}
				element={<ProductDetails />}
			/>
			<Route
				path='/login'
				element={<LoginPage />}
				errorElement={<ErrorHandler />}></Route>
			,
			<Route
				path='/register'
				element={
					<ProtectedRoute
						isAllowed={!userData}
						redirectPath={"/"}>
						<RegisterPage />
					</ProtectedRoute>
				}
				errorElement={<ErrorHandler />}></Route>
			,
		</Route>,
		<Route
			path='admin'
			element={<DashboardLayout />}
			errorElement={<ErrorHandler />}>
			<Route
				index
				element={
					<ProtectedRoute
						isAllowed={userData}
						redirectPath='/login'>
						<AdminPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path='products'
				element={
					<ProtectedRoute
						isAllowed={userData}
						redirectPath='/login'>
						<DashboardProductsPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path='categories'
				element={
					<ProtectedRoute
						isAllowed={userData}
						redirectPath='/login'>
						<h1>categories</h1>
					</ProtectedRoute>
				}
			/>
		</Route>,

		// <Route
		// 	path='/'
		// 	element={
		// 		<ProtectedRoute
		// 			isAllowed={!userData?.user?.admin}
		// 			redirectPath={"/admin"}>
		// 			<RootLayout />
		// 		</ProtectedRoute>
		// 	}
		// 	errorElement={<ErrorHandler />}>
		// 	<Route
		// 		index
		// 		element={
		// 			<ProtectedRoute
		// 				isAllowed={!userData?.user?.admin}
		// 				redirectPath={"/admin"}>
		// 				<HomePage />
		// 			</ProtectedRoute>
		// 		}
		// 	/>
		// 	<Route
		// 		path='products'
		// 		element={
		// 			<ProtectedRoute
		// 				isAllowed={!userData?.user?.admin}
		// 				redirectPath={"/admin"}>
		// 				<ProductsPage />
		// 			</ProtectedRoute>
		// 		}
		// 	/>
		// 	<Route
		// 		path='products/:id'
		// 		element={
		// 			<ProtectedRoute
		// 				isAllowed={!userData?.user?.admin}
		// 				redirectPath={"/admin"}>
		// 				<ProductDetails />
		// 			</ProtectedRoute>
		// 		}
		// 	/>
		// </Route>,
		// <Route
		// 	path='/admin'
		// 	element={
		// 		<ProtectedRoute
		// 			isAllowed={userData?.user?.admin}
		// 			redirectPath={"/"}>
		// 			<DashboardLayout />
		// 		</ProtectedRoute>
		// 	}
		// 	errorElement={<ErrorHandler />}>
		// 	<Route
		// 		index
		// 		element={
		// 			<ProtectedRoute
		// 				isAllowed={userData?.user?.admin}
		// 				redirectPath={"/"}>
		// 				<AdminPage />
		// 			</ProtectedRoute>
		// 		}
		// 	/>
		// 	<Route
		// 		path='products'
		// 		element={
		// 			<ProtectedRoute
		// 				isAllowed={userData?.user?.admin}
		// 				redirectPath={"/"}>
		// 				<DashboardProductsPage />
		// 			</ProtectedRoute>
		// 		}
		// 	/>
		// </Route>,
	]),
);

export default router;
