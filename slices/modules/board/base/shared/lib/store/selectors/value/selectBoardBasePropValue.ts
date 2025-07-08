import type { SelectBoardPropValueOptions } from "../props";
import { selectBoardValueProp } from "./selectBoardValueProp";

export type SelectBoardBasePropValueOptions = Omit<
	SelectBoardPropValueOptions,
	"type"
>;

export const selectBoardBasePropValue = (
	options: SelectBoardBasePropValueOptions,
) =>
	selectBoardValueProp({
		...options,
		type: "baseValue",
	});
