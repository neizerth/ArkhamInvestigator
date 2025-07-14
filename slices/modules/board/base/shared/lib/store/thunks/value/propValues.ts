import type { InvestigatorBoardValueProp } from "@modules/board/base/shared/model";

import { setBoardPropValue } from "../../features";
import { createBoardValueThunkCreator } from "../../util";
import { decreaseBoardValueProp } from "./decreaseBoardValueProp";
import { increaseBoardValueProp } from "./increaseBoardValueProp";
import { reduceBoardValueProp } from "./reduceBoardValueProp";

const props: InvestigatorBoardValueProp[] = [
	"value",
	"baseValue",
	"initialValue",
];

const createSetValueThunk = createBoardValueThunkCreator(setBoardPropValue);
const createIncreaseValueThunk = createBoardValueThunkCreator(
	increaseBoardValueProp,
);
const createDecreaseValueThunk = createBoardValueThunkCreator(
	decreaseBoardValueProp,
);
const createReduceValueThunk =
	createBoardValueThunkCreator(reduceBoardValueProp);

export const setValuePropThunks = props.map(createSetValueThunk);
export const increaseValuePropThunks = props.map(createIncreaseValueThunk);
export const decreaseValuePropThunks = props.map(createDecreaseValueThunk);
export const reduceIncreaseValueThunks = props.map(createReduceValueThunk);

export const [
	setBoardActualPropValue,
	setBoardBasePropValue,
	setBoardInitialPropValue,
] = setValuePropThunks;

export const [
	increaseBoardActualPropValue,
	increaseBoardBasePropValue,
	increaseBoardInitialPropValue,
] = increaseValuePropThunks;

export const [
	decreaseBoardActualPropValue,
	decreaseBoardBasePropValue,
	decreaseBoardInitialPropValue,
] = decreaseValuePropThunks;

export const [
	reduceBoardActualPropValue,
	reduceBoardBasePropValue,
	reduceBoardInitialPropValue,
] = reduceIncreaseValueThunks;
