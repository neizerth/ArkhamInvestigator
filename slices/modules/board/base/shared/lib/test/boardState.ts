import type {
	InvestigatorBoard,
	InvestigatorBoardValues,
} from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";
import { createFallbackBoard } from "../fallback";

type BoardValuesPatch = Partial<InvestigatorBoardValues>;

export type TestBoardOptions = {
	value?: BoardValuesPatch;
	baseValue?: BoardValuesPatch;
	initialValue?: BoardValuesPatch;
};

export const createTestBoard = ({
	value,
	baseValue,
	initialValue,
}: TestBoardOptions = {}): InvestigatorBoard => {
	const board = createFallbackBoard();

	return {
		...board,
		id: 1,
		index: 0,
		value: { ...board.value, ...value },
		baseValue: { ...board.baseValue, ...baseValue },
		initialValue: { ...board.initialValue, ...initialValue },
	};
};

/** State patch for `createTestStore`: the board becomes current */
export const withCurrentBoard =
	(options?: TestBoardOptions) => (state: RootState) => {
		state.board.investigatorBoards = [createTestBoard(options)];
		state.board.currentInvestigatorIndex = 0;
	};

export const selectTestBoard = (state: RootState) =>
	state.board.investigatorBoards[0];
