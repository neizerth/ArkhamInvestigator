import type { SelectBoardPropValueOptions } from "../props";
import { selectBoardValueProp } from "./selectBoardValueProp";

export type SelectBoardInitialValueOptions = Omit<
	SelectBoardPropValueOptions,
	"type"
>;

export const selectBoardInitialValue = (
	options: SelectBoardInitialValueOptions,
) =>
	selectBoardValueProp({
		...options,
		type: "initialValue",
	});
