import type {
	BoardKey,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import { propEq } from "ramda";
import type { BoardState } from "../../board";
import { getBoard } from "./getBoard";

type Options<K extends BoardKey> = {
	state: BoardState;
	prop: K;
	value: InvestigatorBoard[K];
};
export const getBoardByProp = <K extends BoardKey>({
	state,
	prop,
	value,
}: Options<K>) => {
	return getBoard({
		state,
		selector: propEq(value, prop),
	});
};
