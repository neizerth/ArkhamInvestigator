import type {
	BoardId,
	BoardKey,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@shared/model";
import { selectBoardById } from "../find/selectBoardById";

export type SelectBoardPropOptions<T extends BoardKey> = {
	boardId: BoardId;
	prop: T;
};

export const selectBoardProp =
	<T extends BoardKey>({ boardId, prop }: SelectBoardPropOptions<T>) =>
	(state: RootState) =>
		select(state, boardId, prop) as InvestigatorBoard[T];

export const createBoardPropSelectorInput =
	<T extends BoardKey>(prop: T) =>
	(state: RootState, boardId: BoardId) =>
		select(state, boardId, prop) as InvestigatorBoard[T];

export const select = createSelector(
	[
		(state, boardId: BoardId) => selectBoardById(boardId)(state),
		(_, _boardId: BoardId, prop: BoardKey) => prop,
	],
	(board, prop) => {
		return board[prop];
	},
);

export type SelectCurrentBoardPropOptions<T extends BoardKey> = Omit<
	SelectBoardPropOptions<T>,
	"boardId"
>;

export const selectCurrentBoardProp = <T extends BoardKey>(prop: T) =>
	selectBoardProp({
		boardId: "current",
		prop,
	});
