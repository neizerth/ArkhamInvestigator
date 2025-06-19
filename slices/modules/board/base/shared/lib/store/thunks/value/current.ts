import { createCurrentActionCreator } from "../../util";
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
] = setValuePropThunks.map(createCurrentActionCreator);

export const [
	increaseCurrentActualPropValue,
	increaseCurrentBasePropValue,
	increaseCurrentInitialPropValue,
] = increaseValuePropThunks.map(createCurrentActionCreator);

export const [
	decreaseCurrentActualPropValue,
	decreaseCurrentBasePropValue,
	decreaseCurrentInitialPropValue,
] = decreaseValuePropThunks.map(createCurrentActionCreator);

export const [
	reduceCurrentActualPropValue,
	reduceCurrentBasePropValue,
	reduceCurrentInitialPropValue,
] = reduceIncreaseValueThunks.map(createCurrentActionCreator);
