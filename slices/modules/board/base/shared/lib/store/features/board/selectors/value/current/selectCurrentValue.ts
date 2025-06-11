import type { InvestigatorBoardValues } from "@modules/board/base/shared/model";
import type { SelectCurrentValueOptions } from "@modules/board/base/shared/model/selectors";
import { selectBoardValue } from "../selectBoardValue";

type Key = keyof InvestigatorBoardValues;

export const selectCurrentValue = <K extends Key>(
	options: SelectCurrentValueOptions<K>,
) =>
	selectBoardValue({
		...options,
		boardId: "current",
	});
