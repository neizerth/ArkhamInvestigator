import { createBoardValuePropReducer } from "./createBoardValuePropReducer";

export const reduceBoardValueProp = createBoardValuePropReducer("value");
export const reduceBoardBaseValueProp =
	createBoardValuePropReducer("baseValue");
export const reduceBoardInitialValueProp =
	createBoardValuePropReducer("initialValue");
