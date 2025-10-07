import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";

export type <FTName | pascalcase>State = {

}

const initialState: <FTName | pascalcase>State = {
}

const state = createSliceState(initialState);

export const <FTName> = createSlice({
	name: "<FTName>",
	...state,
});

export const {

} = <FTName>.actions;

export const {

} = <FTName>.selectors;

export default <FTName>.reducer;