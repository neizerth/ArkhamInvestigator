import type {
	BoardKey,
	PropsWithBoard,
} from "@modules/board/base/shared/model";
import type { BoardState } from "../../board";
import { getBoardById } from "../find/getBoardById";

export type GetBoardPropOptions<K extends BoardKey> = PropsWithBoard & {
	state: BoardState;
	prop: K;
};

export const getBoardProp = <K extends BoardKey>(
	options: GetBoardPropOptions<K>,
) => {
	const { prop } = options;

	const value = getBoardById(options)?.[prop];
	return value;
};
