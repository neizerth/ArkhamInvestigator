import { createCurrentActionCreator } from "../util";
import { setBoardPart } from "./setBoardPart";
import { setBoardProp } from "./setBoardProp";
import { setBoardValuePart } from "./setBoardValuePart";
import { setBoardValuePropPart } from "./setBoardValuePropPart";

export const setCurrentPart = createCurrentActionCreator(setBoardPart);
export const setCurrentProp = createCurrentActionCreator(setBoardProp);
export const setCurrentValuePart =
	createCurrentActionCreator(setBoardValuePart);
export const setCurrentValuePropPart = createCurrentActionCreator(
	setBoardValuePropPart,
);
