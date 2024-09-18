/** @format */

import {Pencil, SquarePlus, Trash2, View} from "lucide-react";
import {Base_URL} from "../constant";
import {IAttributes, IProduct} from "../interfaces";
import Button from "./ui/Button";
import Image from "./ui/Image";
import {useAppDispatch, useAppSelector} from "../app/features/hooks";
import {
	onAlertDialogClose,
	onAlertDialogOpen,
	onModalCreateDialogClose,
	onModalCreateDialogOpen,
	onModalEditDialogClose,
	onModalEditDialogOpen,
	selectGlobal,
} from "../app/features/globalSlice";
import {
	useCreateAdminProductsMutation,
	useDeleteAdminProductsMutation,
	useUpdateAdminProductsMutation,
} from "../app/services/productsSlice";
import AlertDialog from "../shared/AlertDialog";
import {ChangeEvent, useEffect, useState} from "react";
import ModalDialog from "../shared/Modal";
import {Product_Form} from "../data";
import Input from "./ui/Input";

interface IProps {
	products: IProduct[];
}

const TableProducts = ({products}: IProps) => {
	const initialThumbnail = {name: "", size: 0, type: ""};
	// STATES
	const {isAlertDialogOpen, isModalEditDialogOpen, isModalCreateDialogOpen} =
		useAppSelector(selectGlobal);
	const dispatch = useAppDispatch();
	const [tempIDProduct, setTempIDProduct] = useState<number>(0);
	const [productToEdit, setProductToEdit] = useState<IAttributes | null>({
		title: "",
		description: "",
		price: 0,
		stock: 0,
		thumbnail: {data: {attributes: {url: "", name: ""}}},
		categories: {
			data: [
				{
					id: "",
					attributes: {title: ""},
				},
			],
		},
	});
	const [productToCreate, setProductToCreate] = useState<IAttributes | null>({
		title: "",
		description: "",
		price: 0,
		stock: 0,
		thumbnail: {data: {attributes: {url: "", name: ""}}},
		categories: {
			data: [
				{
					id: "",
					attributes: {title: ""},
				},
			],
		},
	});
	const [thumbnail, setThumbnail] = useState<{
		name: string;
		size: number;
		type: string;
	}>(initialThumbnail);
	const [destroyProduct, {isLoading, isSuccess}] =
		useDeleteAdminProductsMutation();
	const [updateProduct, {isLoading: isUpdating, isSuccess: isUpdatingSuccess}] =
		useUpdateAdminProductsMutation();
	const [createProduct, {isLoading: isCreating, isSuccess: isCreatingSuccess}] =
		useCreateAdminProductsMutation();
	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: {errors},
	// } = useForm<IFormInputProduct>({resolver: yupResolver(ProductSchema)});

	// const onSubmit: SubmitHandler<IFormInputProduct> = (
	// 	data: IFormInputProduct,
	// ) => {};

	// HANDLERS

	const closeEdit = () => {
		dispatch(onModalEditDialogClose());
	};
	const closeCreate = () => {
		setProductToCreate({
			title: "",
			description: "",
			price: 0,
			stock: 0,
			thumbnail: {data: {attributes: {url: "", name: ""}}},
			categories: {
				data: [
					{
						id: "",
						attributes: {title: ""},
					},
				],
			},
		});
		dispatch(onModalCreateDialogClose());
	};

	const deleteProduct = (id: number) => {
		destroyProduct(id);
	};

	const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		setProductToEdit({...productToEdit!, [name]: value});
	};
	const onChangeCreateHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		setProductToCreate({...productToCreate!, [name]: value});
	};

	const onChangeThumbnailHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setThumbnail(e.target ? e.target.files![0] : initialThumbnail);
	};

	const onSubmitEditHandler = () => {
		const formData = new FormData();
		formData.append(
			"data",
			JSON.stringify({
				title: productToEdit?.title,
				description: productToEdit?.description,
				price: productToEdit?.price,
				stock: productToEdit?.stock,
			}),
		);
		formData.append("files.thumbnail", thumbnail);

		updateProduct({id: tempIDProduct, body: formData});
	};

	const onSubmitCreateHandler = () => {
		const formData = new FormData();
		formData.append(
			"data",
			JSON.stringify({
				title: productToCreate?.title,
				description: productToCreate?.description,
				price: productToCreate?.price,
				stock: productToCreate?.stock,
			}),
		);
		formData.append("files.thumbnail", thumbnail);

		console.log(productToCreate);

		createProduct({body: formData});
	};

	useEffect(() => {
		if (isSuccess) {
			setTempIDProduct(0);
			dispatch(onAlertDialogClose());
		}
		if (isUpdatingSuccess) {
			setTempIDProduct(0);
			setProductToEdit(null);
			dispatch(onModalEditDialogClose());
		}
		if (isCreatingSuccess) {
			setProductToCreate(null);
			dispatch(onModalCreateDialogClose());
		}
	}, [isSuccess, dispatch, isUpdatingSuccess, isCreatingSuccess]);

	// RENDERS
	const renderProductRowTable = products.map((product) => {
		const {id, attributes} = product;
		return (
			<tr
				key={id}
				className=' even:bg-slate-200'>
				<td className=''>{id}</td>
				<td>{attributes.title.slice(0, 10) + " ..."}</td>
				<td>
					{attributes.categories.data.map(({attributes}, idx) => {
						return attributes.title + (+idx > 1 ? " | " : "");
					})}
				</td>
				<td>
					<div className='flex items-center justify-center  '>
						<Image
							className='rounded-full object-cover w-[70px] h-[70px]'
							alt={attributes.thumbnail.data.attributes.name}
							src={`${Base_URL}${attributes.thumbnail.data.attributes.url}`}
						/>
					</div>
				</td>
				<td> $ {attributes.price}</td>
				<td>{attributes.stock}</td>
				<td>
					<div className='flex space-x-2 items-center justify-center'>
						<Button
							name='view-product'
							variant={"outline"}>
							<View />
						</Button>
						<Button
							name='edit-product'
							onClick={() => {
								dispatch(onModalEditDialogOpen());
								setTempIDProduct(id);
								setProductToEdit(product?.attributes);
							}}
							variant={"custom"}>
							<Pencil />
						</Button>
						<Button
							name='delete-product'
							onClick={() => {
								dispatch(onAlertDialogOpen());
								setTempIDProduct(id);
							}}
							variant={"danger"}>
							<Trash2 />
						</Button>
					</div>
				</td>
			</tr>
		);
	});

	const renderProductFormEdit = Product_Form.map(
		({name, placeholder, type, validation}, idx) => {
			return (
				<div
					key={idx}
					className='space-y-2'>
					<label
						className='text-lg font-semibold'
						htmlFor={name}>
						{placeholder}
					</label>
					<Input
						// className={`${
						// 	errors[name]
						// 		? "ring-1 ring-red-500 py-[6px]"
						// 		: "ring-1 ring-[#172554e0] py-[6px]"
						// }`}
						id={name}
						name={name}
						type={type}
						placeholder={placeholder}
						value={productToEdit ? productToEdit[name] : ""}
						onChange={onChangeEditHandler}
					/>
					{/* {errors[name] && <InputErrorMessage msg={errors[name]?.message} />} */}
				</div>
			);
		},
	);
	const renderProductFormCreate = Product_Form.map(
		({name, placeholder, type, validation}, idx) => {
			return (
				<div
					key={idx}
					className='space-y-2'>
					<label
						className='text-lg font-semibold'
						htmlFor={name}>
						{placeholder}
					</label>
					<Input
						// className={`${
						// 	errors[name]
						// 		? "ring-1 ring-red-500 py-[6px]"
						// 		: "ring-1 ring-[#172554e0] py-[6px]"
						// }`}
						id={name}
						name={name}
						type={type}
						placeholder={placeholder}
						value={productToCreate ? productToCreate[name] : ""}
						onChange={onChangeCreateHandler}
					/>
					{/* {errors[name] && <InputErrorMessage msg={errors[name]?.message} />} */}
				</div>
			);
		},
	);

	return (
		<>
			<div className='p-5 overflow-auto'>
				<div className='w-full flex items-center justify-start space-x-3  p-3'>
					<Button
						variant={"custom"}
						onClick={() => {
							dispatch(onModalCreateDialogOpen());
						}}>
						Create Product
					</Button>
				</div>
				<table className='w-full h-full  text-center '>
					<thead className='border-b-2 border-[#17255472] text-xl'>
						<tr className='my-2'>
							<th>ID</th>
							<th>Title</th>
							<th>Category</th>
							<th>Thumbnail</th>
							<th>Price</th>
							<th>Stock</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody className='text-lg font-semibold'>
						{renderProductRowTable}
					</tbody>
					<tfoot className='border-t-2 border-[#17255472] text-xl'>
						<tr className='my-2'>
							<th>ID</th>
							<th>Title</th>
							<th>Category</th>
							<th>Thumbnail</th>
							<th>Price</th>
							<th>Stock</th>
							<th>Action</th>
						</tr>
					</tfoot>
				</table>
			</div>
			{isAlertDialogOpen && (
				<AlertDialog
					isLoading={isLoading}
					onClickBtn={() => {
						deleteProduct(tempIDProduct);
					}}
					btnTitle='Delete'
					description='Are you sure you want to delete this product ? This action cannot be undone. This Product will be deleted permanently.'
					title='Are you sure ?'
					variant='danger'
				/>
			)}
			{isModalEditDialogOpen && (
				<ModalDialog
					title='Edit Product'
					isLoading={isUpdating}
					onClickBtn={onSubmitEditHandler}
					btnTitle='Update'
					variant='custom'
					btnType='button'
					isModalDialogOpen={isModalEditDialogOpen}
					closeModal={closeEdit}>
					<form className='space-y-3'>
						{renderProductFormEdit}
						<Input
							name='thumbnail'
							id='thumbnail'
							type='file'
							placeholder='Thumbnail'
							accept='image/*'
							onChange={onChangeThumbnailHandler}
						/>
					</form>
				</ModalDialog>
			)}
			{isModalCreateDialogOpen && (
				<ModalDialog
					title='Create Product'
					isLoading={isCreating}
					onClickBtn={onSubmitCreateHandler}
					btnTitle='Create'
					variant='custom'
					btnType='button'
					isModalDialogOpen={isModalCreateDialogOpen}
					closeModal={closeCreate}>
					<form className='space-y-3'>
						{renderProductFormCreate}
						<Input
							name='thumbnail'
							id='thumbnail'
							type='file'
							placeholder='Thumbnail'
							accept='image/*'
							onChange={onChangeThumbnailHandler}
						/>
					</form>
				</ModalDialog>
			)}
		</>
	);
};

export default TableProducts;
