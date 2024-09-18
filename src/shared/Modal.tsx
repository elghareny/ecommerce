/** @format */

// /** @format */

import {Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import {ReactNode} from "react";
import Button from "../components/ui/Button";
interface IProps {
	title: string;
	children: ReactNode;
	description?: string;
	variant:
		| "cancel"
		| "danger"
		| "outline"
		| "custom"
		| "transparentBg"
		| "default";
	btnTitle: string;
	isLoading: boolean;
	onClickBtn?: () => void;
	closeModal?: () => void;
	btnType?: "button" | "reset" | "submit";
	isModalDialogOpen: boolean;
	// product?: IProduct;
}

const ModalDialog = ({
	title,
	children,
	description,
	variant,
	btnTitle,
	isLoading,
	onClickBtn,
	closeModal,
	btnType,
	isModalDialogOpen,
}: IProps) => {
	// let [isOpen, setIsOpen] = useState(true);

	// function close() {
	// 	// setIsOpen(false);
	// 	closeModal
	// }

	return (
		<Dialog
			open={isModalDialogOpen}
			as='div'
			className=' relative z-[1000] focus:outline-none'
			onClose={closeModal}>
			<div className='fixed inset-0 z-[1000] w-screen overflow-y-auto bg-[#33333385] '>
				<div className='flex min-h-full items-center justify-center p-4 backdrop-blur-sm'>
					<DialogPanel
						transition
						className='space-y-5 w-full max-w-md rounded-xl text-black bg-slate-50 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 shadow-[0_3px_10px_2px_rgb(23,37,84,0.3)]'>
						<DialogTitle
							as='h3'
							className='text-2xl font-bold '>
							{title}
						</DialogTitle>
						<p className='mt-2 text-xl'>{description}</p>

						{children}
						<div className='mt-5 flex justify-start items-center space-x-5'>
							<Button
								fullWidth
								type={btnType}
								variant={variant}
								isLoading={isLoading}
								onClick={onClickBtn}>
								{btnTitle}
							</Button>
							<Button
								fullWidth
								variant={"outline"}
								className=' '
								onClick={closeModal}>
								Cancel
							</Button>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};
export default ModalDialog;

// import {X} from "lucide-react";
// import Button from "../components/ui/Button";
// import {useAppDispatch} from "../app/features/hooks";
// import {onModalDialogClose} from "../app/features/globalSlice";
// import {ReactNode} from "react";
// import {IProduct} from "../interfaces";

// interface IProps {
// 	variant:
// 		| "cancel"
// 		| "danger"
// 		| "outline"
// 		| "custom"
// 		| "transparentBg"
// 		| "default";
// 	title: string;
// 	description?: string;
// 	btnTitle: string;
// 	product?: IProduct;
// 	isLoading: boolean;
// 	onClickBtn?: (id: number) => void;
// 	children: ReactNode;
// }

// const ModalDialog = ({
// 	variant,
// 	title,
// 	description,
// 	btnTitle,
// 	// product,
// 	isLoading,
// 	// onClickBtn,
// 	children,
// }: IProps) => {
// 	const dispatch = useAppDispatch();
// 	return (
// 		<div
// 			className='fixed z-[1000] inset-0'
// 			onClick={() => {
// 				dispatch(onModalDialogClose());
// 			}}>
// 			<div className='relative w-screen h-screen bg-[#33333353]'>
// 				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-200 p-5 flex flex-col justify-between space-y-8 shadow-[0_3px_35px_10px_rgb(150,150,150,1)] rounded-lg max-w-[500px] min-w-[300px]'>
// 					<div className='flex justify-between items-center'>
// 						<h1 className='text-2xl font-semibold'>{title}</h1>
// 						<Button
// 							name='close'
// 							className='p-1 '
// 							onClick={() => {
// 								dispatch(onModalDialogClose());
// 							}}
// 							variant={"transparentBg"}>
// 							<X size={27} />
// 						</Button>
// 					</div>
// 					<p className='text-[20px]'>{description}</p>
// 					{children}
// 					<div className='flex space-x-3 justify-center items-center'>
// 						<Button
// 							name='confirm'
// 							isLoading={isLoading}
// 							onClick={() => {}}
// 							variant={variant}>
// 							{btnTitle}
// 						</Button>
// 						<Button
// 							name='cancel'
// 							onClick={() => dispatch(onModalDialogClose())}
// 							variant={"cancel"}>
// 							Cancel
// 						</Button>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default ModalDialog;
