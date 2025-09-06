import type {
	BoardHandler,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import { mergeDeepWithKey } from "ramda";
import { getBoardIndex } from "../../getters/props/getBoardIndex";
import type { SetBoardPartPayload } from "./setBoardPart";

type Key = keyof InvestigatorBoard;

const keepKeys: Key[] = [
	"investigator",
	"abilityValues",
	"initialUsedAbilities",
	"usedAbilities",
];

export const handleSetBoardPart: BoardHandler<SetBoardPartPayload> = (
	state,
	{ boardId, data },
) => {
	const index = getBoardIndex({
		...state,
		boardId,
	});

	if (typeof index !== "number") {
		return;
	}
	const board = state.investigatorBoards[index];

	const customMerge = mergeDeepWithKey((key, left, right) => {
		if (keepKeys.includes(key as Key)) {
			return right;
		}
		return right ?? left;
	});

	state.investigatorBoards[index] = customMerge(
		board,
		data,
	) as InvestigatorBoard;
};
