/** @format */

import {useGetProductsAdminQuery} from "../../app/services/productsSlice";
import TableProducts from "../../components/TableProducts";
import TableSkeleton from "../../components/TableSkeleton";

interface IProps {}

const DashboardProductsPage = ({}: IProps) => {
	const {data, isLoading} = useGetProductsAdminQuery({page: 1});

	return (
		<div className='w-full h-full overflow-auto'>
			{isLoading ? <TableSkeleton /> : <TableProducts products={data.data} />}
		</div>
	);
};

export default DashboardProductsPage;
