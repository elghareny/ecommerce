/** @format */

import {RouterProvider} from "react-router-dom";
import "./App.css";
import router from "./router";
import {Toaster} from "react-hot-toast";
import CartDrawer from "./components/CartDrawer";

import {ToastContainer} from "react-toastify";
import {injectStyle} from "react-toastify/dist/inject-style";

function App() {
	if (typeof window !== "undefined") {
		injectStyle();
	}
	return (
		<main>
			<div className='fixed z-[100]'>
				<CartDrawer />
			</div>
			<RouterProvider router={router} />
			<ToastContainer
				autoClose={2000}
				position='top-center'
			/>
			<Toaster />
		</main>
	);
}

export default App;
