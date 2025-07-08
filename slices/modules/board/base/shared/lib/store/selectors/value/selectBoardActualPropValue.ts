import {
	type SelectBoardPropValueOptions,
	selectBoardValueProp,
} from "../props";

export type SelectBoardActualPropValueOptions = Omit<
	SelectBoardPropValueOptions,
	"type"
>;

export const selectBoardActualPropValue = (
	options: SelectBoardActualPropValueOptions,
) =>
	selectBoardValueProp({
		...options,
		type: "value",
	});
