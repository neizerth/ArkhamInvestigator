import { createCurrentBoardThunk } from "../util";
import { setBoardPart } from "./setBoardPart";
import { setBoardProp } from "./setBoardProp";
import { setBoardValuePart } from "./setBoardValuePart";
import { setBoardValuePropPart } from "./setBoardValuePropPart";

export const setCurrentPart = createCurrentBoardThunk(setBoardPart);
export const setCurrentProp = createCurrentBoardThunk(setBoardProp);
export const setCurrentValuePart = createCurrentBoardThunk(setBoardValuePart);
export const setCurrentValuePropPart = createCurrentBoardThunk(
	setBoardValuePropPart,
);
