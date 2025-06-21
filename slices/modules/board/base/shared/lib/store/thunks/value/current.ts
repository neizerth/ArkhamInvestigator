import { withCurrentPayload } from "../../util";
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
] = setValuePropThunks.map(withCurrentPayload);

export const [
	increaseCurrentActualPropValue,
	increaseCurrentBasePropValue,
	increaseCurrentInitialPropValue,
] = increaseValuePropThunks.map(withCurrentPayload);

export const [
	decreaseCurrentActualPropValue,
	decreaseCurrentBasePropValue,
	decreaseCurrentInitialPropValue,
] = decreaseValuePropThunks.map(withCurrentPayload);

export const [
	reduceCurrentActualPropValue,
	reduceCurrentBasePropValue,
	reduceCurrentInitialPropValue,
] = reduceIncreaseValueThunks.map(withCurrentPayload);
