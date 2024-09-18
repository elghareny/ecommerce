/** @format */

import {Trash2} from "lucide-react";
import Image from "./ui/Image";
import {IProduct} from "../interfaces";
import {Base_URL} from "../constant";
import {useAppDispatch} from "../app/features/hooks";
import Button from "./ui/Button";
import {RemoveFromCart} from "../app/features/cartSlice";
import {toast} from "react-toastify";

interface IProps {
	productCart: IProduct;
}

const CartDrawerItem = ({productCart}: IProps) => {
	const {id, attributes, quantity, totalPrice} = productCart;
	const dispatch = useAppDispatch();

	// HANDLER

	const onRemoveFromCartHandler = () => {
		dispatch(RemoveFromCart(id));
		toast.success("Item removed from cart !");
	};
	return (
		<div className='flex flex-col px-1 py-3 space-y-2 mt-2'>
			<div className='flex justify-between  rounded-2xl space-y-2'>
				<div className='flex items-center space-x-5'>
					<div className='w-[120px] h-[110px]'>
						<Image
							className='w-full h-full object-fill rounded-2xl'
							src={`${Base_URL}${attributes.thumbnail.data.attributes.url}`}
							alt={`${attributes.thumbnail.data.attributes.name}`}
						/>
					</div>
					<div className='text-[20px]'>
						<h2>{attributes.title}</h2>
						<h2>Price : {attributes.price}</h2>
						<h2>Quantity : {quantity}</h2>
						<h2 className='text-red-700'>
							Total Price : <span className=''>{totalPrice}</span>
						</h2>
					</div>
				</div>
				<Button
					name='remove-item-cart'
					variant={"transparentBg"}
					onClick={onRemoveFromCartHandler}
					className=' w-fit h-fit hover:bg-transparent cursor-pointer '>
					<Trash2
						color='red'
						width={30}
						height={30}
					/>
				</Button>
			</div>
			<hr className='w-full h-[2px] bg-[#99999991]' />
		</div>
	);
};

export default CartDrawerItem;
