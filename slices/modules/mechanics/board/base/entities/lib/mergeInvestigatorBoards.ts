import type {
	InvesigatorBoardPartial,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import type { InvestigatorNumericStat } from "@shared/model";
import { mergeDeepRight } from "ramda";

type Options = {
	sourceBoard: InvestigatorBoard;
	targetBoard: InvestigatorBoard;
	keepResources: boolean;
	keepClues: boolean;
	keepActions: boolean;
};

export const mergeInvestigatorBoards = ({
	sourceBoard,
	targetBoard,
	keepClues,
	keepResources,
	keepActions,
}: Options) => {
	const getValue = <K extends InvestigatorNumericStat>(
		prop: K,
		keep: boolean,
	) => {
		return keep ? sourceBoard.value[prop] : targetBoard.value[prop];
	};

	const modification: InvesigatorBoardPartial = {
		value: {
			clues: getValue("clues", keepClues),
			resources: getValue("resources", keepResources),
			actions: getValue("actions", keepActions),
		},
	};

	return mergeDeepRight(targetBoard, modification) as InvestigatorBoard;
};
