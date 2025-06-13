import type { BoardState } from "../../board";
import { getBoard } from "./getBoard";

type Options = {
	state: BoardState;
	code: string;
};
export const getBoardByCode = ({ state, code }: Options) => {
	return getBoard({
		state,
		selector: ({ investigator }) => investigator.code === code,
	});
};
