/** @format */

import Button from "./ui/Button";
import Image from "./ui/Image";
import {IProduct} from "../interfaces";
import {Base_URL} from "../constant";
import {useNavigate} from "react-router-dom";
import {FaRegHeart, FaHeart} from "react-icons/fa";

interface IProps {
	product: IProduct;
}

const ProductCard = ({product}: IProps) => {
	// STATE
	const navigate = useNavigate();
	const {title, description, price, thumbnail} = product.attributes;

	// HANDLER
	const onDetails = (product: IProduct) => {
		navigate(`${product.id}`);
	};

	return (
		<div
			className='flex flex-col justify-between space-y-2 items-start max-h-[450px] max-w-[250px] shadow-[0_0_30px_2px_rgb(23,37,84,0.2)] rounded-lg p-3 cursor-pointer'
			onClick={() => {
				onDetails(product);
			}}>
			<div className='w-full h-[250px] rounded-lg'>
				<Image
					src={`${Base_URL}${thumbnail.data.attributes.url}`}
					alt={`${thumbnail.data.attributes.name}`}
					className='w-full h-full object-cover rounded-lg'
				/>
			</div>
			<div className='w-full flex flex-col justify-between space-y-0'>
				<div className='flex justify-between items-center'>
					<h2 className='text-[18px] font-semibold'>{title.slice(0, 10)}</h2>
					<span className='text-[18px] font-semibold'>${price}</span>
				</div>
				<p className='text-base text-gray-500 mb-2'>
					{description.slice(0, 20)}
				</p>
			</div>
			<div className='flex justify-center items-center space-x-3 w-full'>
				<Button
					name='details-product'
					variant={"transparentBg"}
					type='button'
					onClick={() => {}}
					className='p-0 hover:bg-transparent dark:hover:text-black'>
					<FaRegHeart
						size={30}
						color='#c42805'
					/>
					<FaHeart
						size={30}
						color='#c42805'
					/>
				</Button>

				<Button
					name='add-to-cart'
					variant={"outline"}
					className='w-full py-2'>
					Add To Cart
				</Button>
			</div>
		</div>
	);
};

export default ProductCard;
