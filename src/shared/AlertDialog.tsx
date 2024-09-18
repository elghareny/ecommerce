/** @format */

// /** @format */

import {Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import {useAppDispatch, useAppSelector} from "../app/features/hooks";
import {onAlertDialogClose, selectGlobal} from "../app/features/globalSlice";
import Button from "../components/ui/Button";
interface IProps {
	variant:
		| "cancel"
		| "danger"
		| "outline"
		| "custom"
		| "transparentBg"
		| "default";
	title: string;
	description: string;
	btnTitle: string;
	isLoading: boolean;
	onClickBtn: () => void;
}

const AlertDialog = ({
	variant,
	title,
	description,
	btnTitle,
	isLoading,
	onClickBtn,
}: IProps) => {
	const dispatch = useAppDispatch();
	const {isAlertDialogOpen} = useAppSelector(selectGlobal);

	// let [isOpen, setIsOpen] = useState(true);

	function close() {
		// setIsOpen(false);
		dispatch(onAlertDialogClose());
	}

	return (
		<Dialog
			open={isAlertDialogOpen}
			as='div'
			className='relative z-[1000] focus:outline-none'
			onClose={close}>
			<div className='fixed inset-0 z-[1000] w-screen overflow-y-auto bg-[#33333385]'>
				<div className='flex min-h-full items-center justify-center  p-4 backdrop-blur-sm'>
					<DialogPanel
						transition
						className='space-y-5 w-full max-w-md rounded-xl text-black bg-slate-50 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'>
						<DialogTitle
							as='h3'
							className='text-2xl font-bold '>
							{title}
						</DialogTitle>
						<p className='mt-2 text-xl'>{description}</p>

						<div className='mt-5 flex justify-start items-center space-x-5'>
							<Button
								fullWidth
								variant={variant}
								isLoading={isLoading}
								onClick={onClickBtn}>
								{btnTitle}
							</Button>
							<Button
								fullWidth
								variant={"custom"}
								className=' '
								onClick={close}>
								Cancel
							</Button>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};
export default AlertDialog;

// import {X} from "lucide-react";
// import Button from "../components/ui/Button";
// import {useAppDispatch} from "../app/features/hooks";
// import {onAlertDialogClose} from "../app/features/globalSlice";

// interface IProps {
// 	variant:
// 		| "cancel"
// 		| "danger"
// 		| "outline"
// 		| "custom"
// 		| "transparentBg"
// 		| "default";
// 	title: string;
// 	description: string;
// 	btnTitle: string;
// 	id: number;
// 	isLoading: boolean;
// 	onClickBtn: (id: number) => void;
// }

// const AlertDialog = ({
// 	variant,
// 	title,
// 	description,
// 	btnTitle,
// 	id,
// 	isLoading,
// 	onClickBtn,
// }: IProps) => {
// 	const dispatch = useAppDispatch();
// 	return (
// 		<div
// 			className='flex justify-center items-center  w-screen h-screen fixed inset-0 z-[1001] bg-[#3333336d]'
// 			onClick={() => {
// 				dispatch(onAlertDialogClose());
// 			}}>
// 			<div className='z-[1002] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-50 p-5 flex flex-col justify-between space-y-8 shadow-[0_3px_35px_10px_rgb(150,150,150,1)] rounded-lg max-w-[500px] min-w-[300px]'>
// 				<div className='flex justify-between items-center'>
// 					<h1 className='text-2xl font-semibold'>{title}</h1>
// 					<Button
// 						name='close'
// 						className='p-1 '
// 						onClick={() => {
// 							dispatch(onAlertDialogClose());
// 						}}
// 						variant={"transparentBg"}>
// 						<X size={27} />
// 					</Button>
// 				</div>
// 				<p className='text-[20px]'>{description}</p>
// 				<div className='flex space-x-3 justify-center items-center'>
// 					<Button
// 						name='confirm'
// 						isLoading={isLoading}
// 						onClick={() => {
// 							onClickBtn(id);
// 						}}
// 						variant={variant}>
// 						{btnTitle}
// 					</Button>
// 					<Button
// 						name='cancel'
// 						onClick={() => dispatch(onAlertDialogClose())}
// 						variant={"cancel"}>
// 						Cancel
// 					</Button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default AlertDialog;
