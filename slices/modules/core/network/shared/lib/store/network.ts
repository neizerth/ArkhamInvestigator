import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";

export type NetworkState = {
	offline: boolean;
};

const initialState: NetworkState = {
	offline: false,
};

const state = createSliceState(initialState);

export const network = createSlice({
	name: "network",
	...state,
});

export const { setOffline } = network.actions;

export const { selectOffline } = network.selectors;

export default network.reducer;
