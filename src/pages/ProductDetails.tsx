/** @format */

import {replace, useNavigate, useParams} from "react-router-dom";
import Button from "../components/ui/Button";
import Image from "../components/ui/Image";
import {Base_URL} from "../constant";
import {useGetProductDetailsQuery} from "../app/services/productsSlice";
import Spinner from "../components/ui/Spinner";
import {useAppDispatch} from "../app/features/hooks";
import {addToCart} from "../app/features/cartSlice";
import ErrorHandler from "../components/errors/ErrorHandler";
import cookiesServices from "../services/cookies.Services";

const ProductDetails = () => {
	// STATES
	const navigate = useNavigate();
	const storageKey = "user";
	const userData = cookiesServices.get(storageKey);
	const dispatch = useAppDispatch();
	const {id} = useParams();
	const {data, isLoading, isError, error} = useGetProductDetailsQuery({
		id: id,
	});

	// HANDLER
	const onAddCartHandler = () => {
		dispatch(addToCart(data.data));
	};

	// RENDER

	if (isLoading) {
		return <Spinner />;
	}

	if (isError)
		return (
			<ErrorHandler
				statusCode={error?.status}
				title={error?.data?.error?.message}
			/>
		);
	const {title, thumbnail, stock, price, description, categories} =
		data.data.attributes;

	return (
		<>
			{!isLoading && (
				<div className='flex flex-col justify-between items-start max-h-[500px] max-w-sm shadow-[0_3px_25px_5px_rgb(150,150,150,.5)] rounded-lg p-4'>
					<div className='w-full h-[200px] rounded-lg mb-3'>
						<Image
							src={`${Base_URL}${thumbnail.data.attributes.url}`}
							alt={`${thumbnail.data.attributes.name}`}
							className='w-full h-full object-cover rounded-lg'
						/>
					</div>
					<div className='w-full flex flex-col justify-between mb-3'>
						<h2 className='text-xl font-semibold mb-2'>{title}</h2>
						<p className='text-lg  font-semibold mb-2'>{description}</p>

						<div className='flex flex-col justify-between w-full'>
							<p className='text-xl text-[#2f63d4] font-semibold mb-2'>
								count : {stock}
							</p>
							<div className='flex space-x-3'>
								<p className='text-xl text-[#2f63d4] font-semibold mb-2'>
									categories :{" "}
								</p>
								{categories.data.map(
									(category: {id: number; attributes: {title: string}}) => {
										return (
											<p
												className='text-xl text-[#2f63d4] font-semibold mb-2'
												key={category.id}>
												{category.attributes.title}
											</p>
										);
									},
								)}
							</div>
						</div>

						<span className='text-2xl font-semibold text-[#2f63d4] my-2'>
							${price}
						</span>
					</div>
					<div className='flex justify-center items-center w-full'>
						<Button
							name='add-to-cart'
							onClick={
								userData
									? onAddCartHandler
									: () => {
											navigate("/login", {replace: true});
									  }
							}
							variant={"custom"}
							className='w-full'>
							Add To Cart
						</Button>
					</div>
				</div>
			)}
		</>
	);
};

export default ProductDetails;
