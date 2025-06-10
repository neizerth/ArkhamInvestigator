import type { InvestigatorBoardValues } from "@modules/board/base/shared/model";
import type { SelectCurrentValueOptions } from "@modules/board/base/shared/model/selectors";
import { selectBoardInitialValue } from "../selectBoardInitialValue";

type Key = keyof InvestigatorBoardValues;

export const selectCurrentInitialValue = <K extends Key>(
	options: SelectCurrentValueOptions<K>,
) => selectBoardInitialValue(options);
