import { createCurrentBoardThunk } from "../../util";
import {
	decreaseValuePropThunks,
	increaseValuePropThunks,
	reduceIncreaseValueThunks,
	setValuePropThunks,
} from "./propValues";

export const [
	setCurrentActualPropValue,
	setCurrentBasePropValue,
	setCurrentInitialPropValue,
] = setValuePropThunks.map(createCurrentBoardThunk);

export const [
	increaseCurrentActualPropValue,
	increaseCurrentBasePropValue,
	increaseCurrentInitialPropValue,
] = increaseValuePropThunks.map(createCurrentBoardThunk);

export const [
	decreaseCurrentActualPropValue,
	decreaseCurrentBasePropValue,
	decreaseCurrentInitialPropValue,
] = decreaseValuePropThunks.map(createCurrentBoardThunk);

export const [
	reduceCurrentActualPropValue,
	reduceCurrentBasePropValue,
	reduceCurrentInitialPropValue,
] = reduceIncreaseValueThunks.map(createCurrentBoardThunk);
