/** @format */

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Base_URL} from "../../constant";
import cookiesServices from "../../services/cookies.Services";
// import {IFormInputLogin, IUser} from "../../interfaces";

const storageKey = "user";
const userData = cookiesServices.get(storageKey);

/** @format */
export const productsApiSlice = createApi({
	reducerPath: "products",
	tagTypes: ["Products"],
	refetchOnReconnect: true,
	refetchOnMountOrArgChange: true,
	baseQuery: fetchBaseQuery({baseUrl: `${Base_URL}`}),
	endpoints: (builder) => ({
		// loginAuth: builder.mutation<IUser, Partial<IFormInputLogin>>({
		// 	query: (arg: IFormInputLogin) => {
		// 		return {
		// 			url: "/api/auth/local",
		// 			method: "POST",
		// 			body: arg,
		// 		};
		// 	},
		// }),

		//** GET

		getProductsList: builder.query({
			query: () => {
				return {
					url: "/api/products",
					params: {
						populate: "thumbnail,categories",
						sort: "createdAt:DESC",
					},
				};
			},
			providesTags: (result) =>
				result
					? [
							...result.data.map(({id}) => ({type: "Products" as const, id})),
							{type: "Products", id: "LIST"},
					  ]
					: [{type: "Products", id: "LIST"}],
		}),

		getProductDetails: builder.query({
			query: (arg) => {
				return {
					url: `/api/products/${arg.id}`,
					params: {
						populate: "thumbnail,categories",
					},
				};
			},
		}),
		getProductsAdmin: builder.query({
			query: (arg) => {
				const {page} = arg;
				return {
					url: "/api/products",
					params: {
						populate: "thumbnail,categories",
						pagination: {
							pageSize: 10,
							page: page,
						},
						sort: "createdAt:DESC",
					},
				};
			},
			providesTags: (result) =>
				result
					? [
							...result.data.map(({id}) => ({type: "Products" as const, id})),
							{type: "Products", id: "LIST"},
					  ]
					: [{type: "Products", id: "LIST"}],
		}),

		// ** CREATE

		createAdminProducts: builder.mutation({
			query: ({body}) => ({
				url: `/api/products`,
				method: "POST",
				headers: {
					Authorization: `Bearer ${userData.jwt}`,
				},
				body,
			}),
			async onQueryStarted({id, ...patch}, {dispatch, queryFulfilled}) {
				const patchResult = dispatch(
					productsApiSlice.util.updateQueryData(
						"getProductsAdmin",
						id,
						(draft) => {
							Object.assign(draft, patch);
						},
					),
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},

			invalidatesTags: [{type: "Products", id: "LIST"}],
		}),
		// ** UPDATE

		updateAdminProducts: builder.mutation({
			query: ({id, body}) => ({
				url: `/api/products/${id}`,
				method: "PUT",
				headers: {
					Authorization: `Bearer ${userData.jwt}`,
				},
				body,
			}),
			async onQueryStarted({id, ...patch}, {dispatch, queryFulfilled}) {
				const patchResult = dispatch(
					productsApiSlice.util.updateQueryData(
						"getProductsAdmin",
						id,
						(draft) => {
							Object.assign(draft, patch);
						},
					),
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},

			invalidatesTags: [{type: "Products", id: "LIST"}],
		}),

		// ** DELETE

		deleteAdminProducts: builder.mutation({
			query: (id) => {
				return {
					url: `/api/products/${id}`,
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${userData.jwt}`,
					},
				};
			},
			invalidatesTags: [{type: "Products", id: "LIST"}],
		}),
	}),
});

export const {
	useGetProductsListQuery,
	useGetProductDetailsQuery,
	useGetProductsAdminQuery,
	useDeleteAdminProductsMutation,
	useUpdateAdminProductsMutation,
	useCreateAdminProductsMutation,
	// useLoginAuthMutation,
} = productsApiSlice;
