import type { InvestigatorBoardValues } from "@modules/board/base/shared/model";
import type { SelectCurrentValueOptions } from "@modules/board/base/shared/model/selectors";
import { selectBoardBaseValue } from "../selectBoardBaseValue";

type Key = keyof InvestigatorBoardValues;

export const selectCurrentBaseValue = <K extends Key>(
	options: SelectCurrentValueOptions<K>,
) => selectBoardBaseValue(options);
