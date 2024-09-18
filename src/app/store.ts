/** @format */
import {configureStore} from "@reduxjs/toolkit";
import {productsApiSlice} from "./services/productsSlice";
import {useDispatch, useSelector} from "react-redux";
import cartSlice from "./features/cartSlice";
import globalSlice from "./features/globalSlice";
import authSlice from "./features/authSlice";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistedCart = persistReducer({key: "cart", storage}, cartSlice);

export const store = configureStore({
	reducer: {
		cart: persistedCart,
		global: globalSlice,
		login: authSlice,
		[productsApiSlice.reducerPath]: productsApiSlice.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat([productsApiSlice.middleware]),
});

export const useAppSelector = useSelector.withTypes<RootState>();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// export default store;

export const persister = persistStore(store);
