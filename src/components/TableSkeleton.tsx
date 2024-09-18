/** @format */

const TableSkeleton = () => {
	const renderTableSkeleton = Array.from({length: 10}).map((_, index) => (
		<div
			className='flex items-center justify-between '
			key={index}>
			<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-24 py-2 my-2'></div>
			<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-24 py-2 my-2'></div>
			<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-24 py-2 my-2'></div>
			<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-24 py-2 my-2'></div>
			<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-24 py-2 my-2'></div>
			<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-24 py-2 my-2'></div>

			<div className='flex items-center justify-between space-x-2'>
				<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 py-2 w-12'></div>
				<div className='h-2.5 bg-gray-300 rounded-full dark:bg-blue-400 py-2 w-12'></div>
				<div className='h-2.5 bg-gray-300 rounded-full dark:bg-red-400 py-2 w-12'></div>
			</div>
		</div>
	));
	return (
		<div
			role='status '
			className=' h-fit max-w-full p-4 m-10 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-500'>
			<div className='flex items-center justify-between '>
				<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-24 py-2 my-2'></div>
				<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-24 py-2 my-2'></div>
				<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-24 py-2 my-2'></div>
				<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-24 py-2 my-2'></div>
				<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-24 py-2 my-2'></div>
				<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-24 py-2 my-2'></div>
				<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-24 py-2 my-2'></div>
			</div>
			{renderTableSkeleton}
			<span className='sr-only'>Loading...</span>
		</div>
	);
};

export default TableSkeleton;
