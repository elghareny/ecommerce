/** @format */

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "../../interfaces";
import {addItemToShoppingCart, calcTotalPrice} from "../../utils";

export interface ICartState {
	cartProducts: IProduct[];
	totalPrice: number;
}
const initialState: ICartState = {
	cartProducts: [],
	totalPrice: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<IProduct>) => {
			state.cartProducts = addItemToShoppingCart(
				action.payload,
				state.cartProducts,
			);
			state.totalPrice = calcTotalPrice(state.cartProducts);
		},
		RemoveFromCart: (state, action: PayloadAction<number>) => {
			state.cartProducts = state.cartProducts.filter(
				(item) => item.id !== action.payload,
			);
			state.totalPrice = calcTotalPrice(state.cartProducts);
		},
		ClearCart: (state) => {
			state.cartProducts = [];
			state.totalPrice = 0;
		},
	},
});

export const {addToCart, RemoveFromCart, ClearCart} = cartSlice.actions;
export const selectCart = (state: {cart: ICartState}) => state.cart;
export default cartSlice.reducer;
