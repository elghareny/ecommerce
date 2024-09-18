/** @format */

import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {axiosInstance} from "../../config/axios.config";
import {IFormInputLogin, IUser} from "../../interfaces";

export const userLogin = createAsyncThunk(
	"login/userLogin",
	async (user: IFormInputLogin, thunkAPI) => {
		const {rejectWithValue} = thunkAPI;
		try {
			const {data, status} = await axiosInstance.post("/api/auth/local", user);
			return {data, status};
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

interface IInitialStateLogin {
	loading: boolean;
	data: IUser | null;
	status: number | undefined;
	error: string | unknown;
}

const initialState: IInitialStateLogin = {
	loading: false,
	data: null,
	status: undefined,
	error: "",
};

const authSlice = createSlice({
	name: "login",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(userLogin.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(userLogin.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload.data;
			state.status = action.payload.status;
			state.error = "";
		});
		builder.addCase(
			userLogin.rejected,
			(state, action: PayloadAction<unknown>) => {
				state.loading = false;
				state.data = null;
				state.error = action.payload;
			},
		);
	},
});

export const selectLogin = (state: {login: IInitialStateLogin}) => state.login;
export default authSlice.reducer;
