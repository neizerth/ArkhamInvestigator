import type {
	BoardHandler,
	PropsWithBoardId,
} from "@modules/board/base/shared/model";
import { getBoardIndex } from "../../../getters";

export type SetBoardProgressPayload = PropsWithBoardId & {
	progress: number;
};

export const handleSetBoardProgress: BoardHandler<SetBoardProgressPayload> = (
	state,
	payload,
) => {
	const { boardId, progress } = payload;
	const index = getBoardIndex({
		...state,
		boardId,
	});

	const loaded = progress === 100;

	state.investigatorBoards[index].loaded = loaded;
	state.investigatorBoards[index].loadProgress = progress;
};
