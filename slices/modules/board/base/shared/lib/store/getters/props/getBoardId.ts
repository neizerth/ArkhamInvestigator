import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { BoardState } from "../../board";
import { getBoardProp } from "./getBoardProp";

type Options = {
	state: BoardState;
} & PropsWithBoardId;

export const getBoardId = ({ state, boardId }: Options) => {
	return getBoardProp({
		state,
		boardId,
		prop: "id",
	});
};
