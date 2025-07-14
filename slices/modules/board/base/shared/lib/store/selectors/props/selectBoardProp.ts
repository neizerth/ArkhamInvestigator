import type {
	BoardId,
	BoardKey,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";
import { selectBoardById } from "../find/selectBoardById";

export type SelectBoardPropOptions<T extends BoardKey> = {
	boardId: BoardId;
	prop: T;
};

export const selectBoardProp =
	<T extends BoardKey>({ boardId, prop }: SelectBoardPropOptions<T>) =>
	(state: RootState): InvestigatorBoard[T] => {
		const board = selectBoardById(boardId)(state);
		return board[prop];
	};

export type SelectCurrentBoardPropOptions<T extends BoardKey> = Omit<
	SelectBoardPropOptions<T>,
	"boardId"
>;

export const selectCurrentBoardProp = <T extends BoardKey>(prop: T) =>
	selectBoardProp({
		boardId: "current",
		prop,
	});
