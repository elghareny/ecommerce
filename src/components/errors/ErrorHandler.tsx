/** @format */

import {Link, useLocation, useNavigate} from "react-router-dom";
import Button from "../ui/Button";
import {MoveLeft} from "lucide-react";

interface IProps {
	title?: string;
	statusCode?: string;
}

const ErrorHandler = ({statusCode = "500", title = "Server Error"}: IProps) => {
	const {pathname} = useLocation();
	const navigate = useNavigate();
	return (
		<div className='fixed inset-0 flex items-center justify-center p-5 w-full'>
			<div className='relative text-center'>
				<Button
					name='back'
					type='button'
					variant={"transparentBg"}
					onClick={() => {
						navigate(-1);
					}}
					className='text-center absolute -top-32 -left-0 hover:bg-transparent dark:hover:text-black text-2xl '>
					<MoveLeft className='mr-2' /> Back
				</Button>
				<div className='inline-flex rounded-full bg-red-100 p-4'>
					<div className='rounded-full stroke-red-600 bg-red-200 p-4'>
						<svg
							className='w-24 h-24'
							viewBox='0 0 28 28'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M6 8H6.01M6 16H6.01M6 12H18C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 12C3.79086 12 2 13.7909 2 16C2 18.2091 3.79086 20 6 20H14'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'></path>
							<path
								d='M17 16L22 21M22 16L17 21'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'></path>
						</svg>
					</div>
				</div>
				<h2 className='mt-5 text-[36px] font-bold lg:text-[50px]'>
					{statusCode} {title}
				</h2>
				<p className='mt-5 lg:text-lg'>
					Oops something went wrong. Try to refresh this page or <br /> feel
					free to contact us if the problem presists.
				</p>
				<div className='flex justify-center mt-10 space-x-5'>
					<Link to={pathname}>
						<Button name='refresh'>Refresh</Button>
					</Link>
					<Link to='/'>
						<Button name='go-to-home'>Go To Home</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ErrorHandler;
