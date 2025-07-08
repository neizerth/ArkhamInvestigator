import type { InvestigatorBoardValues } from "@modules/board/base/shared/model";
import { selectBoardBasePropValue } from "../selectBoardBasePropValue";

type Key = keyof InvestigatorBoardValues;

export const selectCurrentBasePropValue = <K extends Key>(prop: K) =>
	selectBoardBasePropValue({
		prop,
		boardId: "current",
	});
