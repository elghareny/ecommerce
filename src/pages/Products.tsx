/** @format */

import {useGetProductsAdminQuery} from "../app/services/productsSlice";
import ErrorHandler from "../components/errors/ErrorHandler";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import {IProduct} from "../interfaces";

const ProductsPage = () => {
	const {isLoading, isError, data, error} = useGetProductsAdminQuery([]);

	if (isLoading)
		return (
			<div className='p-5 grid grid-cols-auto-fill-300 gap-5'>
				{Array.from({length: 10}).map((_, index) => (
					<ProductSkeleton key={index} />
				))}
			</div>
		);

	if (isError)
		return (
			<ErrorHandler
				statusCode={error.data.error.status}
				title={error.data.error.message}
			/>
		);
	return (
		<div className='p-5 grid grid-cols-auto-fill-250 gap-5 overflow-auto'>
			{!isLoading &&
				data &&
				data.data.map((product: IProduct) => (
					<ProductCard
						product={product}
						key={product.id}
					/>
				))}
		</div>
	);
};

export default ProductsPage;
