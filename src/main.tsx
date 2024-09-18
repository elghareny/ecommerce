/** @format */

import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {Provider} from "react-redux";
import {store} from "./app/store.ts";
import InternetConnectionProvider from "./services/InternetConnectionService.tsx";

// const colors = {
// 	brand: {
// 		900: "#1a365d",
// 		800: "#153e75",
// 		700: "#2a69ac",
// 	},
// };

// const theme = extendTheme({colors});

createRoot(document.getElementById("root")!).render(
	<InternetConnectionProvider>
		<StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</StrictMode>
	</InternetConnectionProvider>,
);
