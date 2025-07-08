import type { InvestigatorBoardValues } from "@modules/board/base/shared/model";
import { selectBoardActualPropValue } from "../selectBoardActualPropValue";

type Key = keyof InvestigatorBoardValues;

export const selectCurrentActualPropValue = <K extends Key>(prop: K) =>
	selectBoardActualPropValue({
		prop,
		boardId: "current",
	});
