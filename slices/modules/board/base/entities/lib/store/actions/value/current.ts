import { createBoardValueActions } from "./createBoardValueActions";

export const {
	setCurrentValueProp,
	decreaseCurrentValueProp,
	increaseCurrentValueProp,
} = createBoardValueActions({
	type: "value",
	prefix: "current",
});

export const {
	setCurrentInitialValueProp,
	decreaseCurrentInitialValueProp,
	increaseCurrentInitialValueProp,
} = createBoardValueActions({
	type: "initialValue",
	prefix: "current",
});

export const {
	setCurrentBaseValueProp,
	decreaseCurrentBaseValueProp,
	increaseCurrentBaseValueProp,
} = createBoardValueActions({
	type: "baseValue",
	prefix: "current",
});
