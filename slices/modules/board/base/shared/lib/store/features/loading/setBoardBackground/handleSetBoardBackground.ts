import type {
	BoardHandler,
	InvestigatorBoardBackground,
	PropsWithBoardId,
} from "@modules/board/base/shared/model";
import { getBoardIndex } from "../../../getters";

export type SetBoardBackgroundPayload = PropsWithBoardId & {
	background?: InvestigatorBoardBackground | null;
};

export const handleSetBoardBackground: BoardHandler<
	SetBoardBackgroundPayload
> = (state, payload) => {
	const { boardId, background } = payload;
	const index = getBoardIndex({
		...state,
		boardId,
	});

	state.investigatorBoards[index].background = background;
};
