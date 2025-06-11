import { createCurrentValuePropSetter } from "./creators";

export const setCurrentValueProp = createCurrentValuePropSetter("value");
export const setCurrentBaseValueProp =
	createCurrentValuePropSetter("baseValue");
export const setCurrentInitialValueProp =
	createCurrentValuePropSetter("initialValue");

export const reduceCurrentValueProp = createCurrentValuePropSetter("value");
export const reduceCurrentBaseValueProp =
	createCurrentValuePropSetter("baseValue");
export const reduceCurrentInitialValueProp =
	createCurrentValuePropSetter("initialValue");
