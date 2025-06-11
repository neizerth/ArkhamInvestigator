import type { PropsWithBoard } from "@modules/board/base/shared/model";
import type { BoardState } from "../../board";
import { getBoardProp } from "./getBoardProp";

type Options = {
	state: BoardState;
} & PropsWithBoard;

export const getBoardId = ({ state, boardId }: Options) => {
	return getBoardProp({
		state,
		boardId,
		prop: "id",
	});
};
