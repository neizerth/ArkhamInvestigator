import type { InvestigatorBoardValues } from "@modules/board/base/shared/model";
import { selectBoardInitialValue } from "../selectBoardInitialPropValue";

type Key = keyof InvestigatorBoardValues;

export const selectCurrentInitialPropValue = <K extends Key>(prop: K) =>
	selectBoardInitialValue({
		prop,
		boardId: "current",
	});
