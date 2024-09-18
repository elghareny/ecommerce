/** @format */

import {toast} from "react-toastify";
import {IProduct} from "../interfaces";

export const addItemToShoppingCart = (
	cartItem: IProduct,
	shoppingCartItems: IProduct[],
) => {
	const existingItem = shoppingCartItems.find(
		(item: IProduct) => item.id === cartItem.id,
	);

	if (existingItem) {
		toast.success(
			"This Item is already in your shopping cart, the quantity will be increased !",
		);
		return shoppingCartItems.map((item: IProduct) => {
			return item.id === cartItem.id
				? {
						...item,
						quantity: item.quantity! + 1,
						totalPrice: item.attributes.price * (item.quantity! + 1),
				  }
				: item;
		});
	}
	toast.success("Added Item to your shopping cart !");
	return [
		...shoppingCartItems,
		{...cartItem, quantity: 1, totalPrice: cartItem.attributes.price * 1},
	];
};

export const calcTotalPrice = (cartProducts: IProduct[]) => {
	return cartProducts.reduce((prev, curr) => prev + curr.totalPrice!, 0);
};
