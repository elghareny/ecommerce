/** @format */

import {ShoppingBag} from "lucide-react";
import {Link} from "react-router-dom";

interface IProps {
	to: string;
}

const Logo = ({to}: IProps) => {
	return (
		<h1 className='text-base font-semibold  text-[#c42805]'>
			<Link
				className=' flex items-center'
				to={to}>
				<ShoppingBag
					className='mr-1'
					size={20}
				/>{" "}
				shopify
			</Link>
		</h1>
	);
};

export default Logo;
{
	/* <h1 className='mobile text-2xl font-semibold  text-[#c42805]'>
				<Button
					onClick={openMenuNav}
					variant={"transparentBg"}
					className=' flex items-center hover:bg-transparent dark:hover:text-black'>
					<Menu />
				</Button>
			</h1> */
}
