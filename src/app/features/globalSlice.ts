/** @format */

import {createSlice} from "@reduxjs/toolkit";

interface IGlobalState {
	openCartDrawer: boolean;
	closeCartDrawer: boolean;
	isAlertDialogOpen: boolean;
	isModalEditDialogOpen: boolean;
	isModalCreateDialogOpen: boolean;
	// showMenuListAvatar: boolean;
}

const initialState: IGlobalState = {
	openCartDrawer: false,
	closeCartDrawer: true,
	isAlertDialogOpen: false,
	isModalEditDialogOpen: false,
	isModalCreateDialogOpen: false,
	// showMenuListAvatar: false,
};

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		isOpenCartDrawer: (state) => {
			state.openCartDrawer = !state.openCartDrawer;
		},
		onCloseCartDrawer: (state) => {
			state.closeCartDrawer = !state.closeCartDrawer;
		},
		onAlertDialogOpen: (state) => {
			state.isAlertDialogOpen = true;
		},
		onAlertDialogClose: (state) => {
			state.isAlertDialogOpen = false;
		},
		onModalEditDialogOpen: (state) => {
			state.isModalEditDialogOpen = true;
		},
		onModalEditDialogClose: (state) => {
			state.isModalEditDialogOpen = false;
		},
		onModalCreateDialogOpen: (state) => {
			state.isModalCreateDialogOpen = true;
		},
		onModalCreateDialogClose: (state) => {
			state.isModalCreateDialogOpen = false;
		},
		// onShowMenuListAvatar: (state) => {
		// 	state.showMenuListAvatar = true;
		// },
		// onCloseMenuListAvatar: (state) => {
		// 	state.showMenuListAvatar = false;
		// },
	},
});

export const {
	onCloseCartDrawer,
	isOpenCartDrawer,
	onAlertDialogOpen,
	onAlertDialogClose,
	onModalEditDialogOpen,
	onModalEditDialogClose,
	onModalCreateDialogOpen,
	onModalCreateDialogClose,
	// onShowMenuListAvatar,
	// onCloseMenuListAvatar,
} = globalSlice.actions;

export const selectGlobal = (state: {global: IGlobalState}) => state.global;
export default globalSlice.reducer;
