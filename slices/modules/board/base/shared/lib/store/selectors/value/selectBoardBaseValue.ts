import type { InvestigatorBoardValues } from "@modules/board/base/shared/model";
import type { SelectBoardValueOptions } from "@modules/board/base/shared/model/selectors";
import { selectBoardValueByType } from "./selectBoardValueByType";

type Key = keyof InvestigatorBoardValues;

export const selectBoardBaseValue = <K extends Key>(
	options: SelectBoardValueOptions<K>,
) =>
	selectBoardValueByType({
		...options,
		type: "baseValue",
	});
