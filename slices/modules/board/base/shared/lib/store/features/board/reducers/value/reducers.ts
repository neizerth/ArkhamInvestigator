import {
	createBoardValuePropReducer,
	createBoardValuePropSetter,
} from "./creators";

export const setBoardValueProp = createBoardValuePropSetter("value");
export const setBoardBaseValueProp = createBoardValuePropSetter("baseValue");
export const setBoardInitialValueProp =
	createBoardValuePropSetter("initialValue");

export const reduceBoardValueProp = createBoardValuePropReducer("value");
export const reduceBoardBaseValueProp =
	createBoardValuePropReducer("baseValue");
export const reduceBoardInitialValueProp =
	createBoardValuePropReducer("initialValue");
