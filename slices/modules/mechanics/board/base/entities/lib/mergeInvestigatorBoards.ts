import type {
	InvesigatorBoardPartial,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import type { InvestigatorNumericStat } from "@shared/model";
import { mergeDeepRight } from "ramda";
import { getBoardDamage, getBoardHorror } from "./logic";

export type MergeInvestigatorBoardsOptions = {
	sourceBoard: InvestigatorBoard;
	targetBoard: InvestigatorBoard;
	keepResources?: boolean;
	keepClues?: boolean;
	keepActions?: boolean;
	keepDamage?: boolean;
	keepHorror?: boolean;
	keepHandSize?: boolean;
	keepDoom?: boolean;
	keepUpkeepResourcesIncrease?: boolean;
};

export const mergeInvestigatorBoards = ({
	sourceBoard,
	targetBoard,
	keepClues = false,
	keepResources = false,
	keepActions = false,
	keepDamage = false,
	keepHorror = false,
	keepHandSize = false,
	keepDoom = false,
	keepUpkeepResourcesIncrease = false,
}: MergeInvestigatorBoardsOptions) => {
	const getValue = <K extends InvestigatorNumericStat>(
		prop: K,
		keep: boolean,
	) => {
		return keep ? sourceBoard.value[prop] : targetBoard.value[prop];
	};

	const damage = getBoardDamage(sourceBoard);
	const horror = getBoardHorror(sourceBoard);

	const health = targetBoard.value.health - (keepDamage ? damage : 0);
	const sanity = targetBoard.value.sanity - (keepHorror ? horror : 0);

	const modification: InvesigatorBoardPartial = {
		value: {
			clues: getValue("clues", keepClues),
			resources: getValue("resources", keepResources),
			actions: getValue("actions", keepActions),
			handSize: getValue("handSize", keepHandSize),
			doom: getValue("doom", keepDoom),
			upkeepResourcesIncrease: getValue(
				"upkeepResourcesIncrease",
				keepUpkeepResourcesIncrease,
			),
			health,
			sanity,
		},
	};

	return mergeDeepRight(targetBoard, modification) as InvestigatorBoard;
};
