/** @format */

import {X} from "lucide-react";
import Button from "./ui/Button";
import {useAppDispatch, useAppSelector} from "../app/features/hooks";
import CartDrawerItem from "./CartDrawerItem";
import {
	isOpenCartDrawer,
	onCloseCartDrawer,
	selectGlobal,
} from "../app/features/globalSlice";
import {ClearCart, selectCart} from "../app/features/cartSlice";
import {toast} from "react-toastify";

const CartDrawer = () => {
	// STATES
	const dispatch = useAppDispatch();
	const {closeCartDrawer, openCartDrawer} = useAppSelector(selectGlobal);
	const {cartProducts, totalPrice} = useAppSelector(selectCart);

	// HANDLER

	const onClearAllCartHandler = () => {
		dispatch(ClearCart());
		toast.success("All items removed from cart !");
	};

	const drawerHandler = () => {
		dispatch(isOpenCartDrawer());
		setTimeout(() => {
			dispatch(onCloseCartDrawer());
		}, 300);
	};

	// RENDER

	const renderCartDrawerItems = cartProducts.map((item) => {
		return (
			<CartDrawerItem
				key={item.id}
				productCart={item}
			/>
		);
	});

	return (
		<div
			className={`ease-in-out transition-all duration-300 relative  ${
				!closeCartDrawer ? "block " : "hidden"
			}`}>
			<div
				onClick={drawerHandler}
				className={` ease-in-out w-screen h-screen z-[55] transition-all duration-300 bg-[#3333334d] ${
					!closeCartDrawer ? "opacity-1 " : "opacity-0"
				}`}></div>
			<div
				className={`z-[60] duration-300 ease-in-out transition-all flex flex-col justify-between   absolute  top-0 px-5 py-3 shadow-[0_0_25px_5px_rgb(150,150,150,.5)] bg-slate-100 h-screen w-[80%] sm:w-[60%] md:w-[45%] lg:w-[35%] xl:w-[25%] ${
					openCartDrawer ? "right-0" : "-right-[100%]"
				}`}>
				<div className='flex flex-col justify-between '>
					<div className='flex justify-between py-2'>
						<h2 className='text-[20px] font-semibold '>Your Shopping Cart</h2>
						<span
							onClick={drawerHandler}
							className='cursor-pointer duration-300 hover:bg-[#172554] hover:text-white p-1 rounded-lg'>
							<X />
						</span>
					</div>
					<hr className='w-full h-[2px] bg-[#172554e0]' />
				</div>
				<div className='overflow-auto h-full '>
					{cartProducts.length > 0 ? (
						renderCartDrawerItems
					) : (
						<p className='text-base font-semibold mt-5'>Cart is empty ...</p>
					)}
				</div>
				<div className='flex flex-col justify-between space-y-2'>
					<hr className='w-full h-[2px] bg-[#172554e0]' />
					<div className='flex justify-between items-center'>
						<h2 className='text-[20px] font-semibold text-red-700'>
							Total : {totalPrice}
						</h2>
						<div className='flex justify-end items-center my-2 space-x-3'>
							<Button
								name='clear-cart'
								onClick={onClearAllCartHandler}
								type='button'
								variant={"danger"}>
								Clear All
							</Button>
							<Button
								name='save'
								type='button'
								variant={"custom"}>
								Save
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartDrawer;
