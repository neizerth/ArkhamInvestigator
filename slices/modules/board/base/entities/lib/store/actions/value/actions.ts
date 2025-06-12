import { createBoardValueActions } from "./createBoardValueActions";

export const {
	setBoardValueProp,
	decreaseBoardValueProp,
	increaseBoardValueProp,
} = createBoardValueActions({
	type: "value",
	prefix: "board",
});

export const {
	setBoardInitialValueProp,
	decreaseBoardInitialValueProp,
	increaseBoardInitialValueProp,
} = createBoardValueActions({
	type: "initialValue",
	prefix: "board",
});

export const {
	setBoardBaseValueProp,
	decreaseBoardBaseValueProp,
	increaseBoardBaseValueProp,
} = createBoardValueActions({
	type: "baseValue",
	prefix: "board",
});
