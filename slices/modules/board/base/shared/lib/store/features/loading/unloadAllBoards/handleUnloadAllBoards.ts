import type { BoardHandler } from "@modules/board/base/shared/model";

export const handleUnloadAllBoards: BoardHandler = (state, payload) => {
	state.investigatorBoards = state.investigatorBoards.map((board) => {
		return {
			...board,
			loaded: false,
			background: null,
			gameTextSize: null,
		};
	});
};
