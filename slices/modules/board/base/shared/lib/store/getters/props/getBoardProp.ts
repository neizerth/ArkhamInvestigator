import type {
	BoardKey,
	PropsWithBoardId,
} from "@modules/board/base/shared/model";
import type { BoardState } from "../../board";
import { getBoardById } from "../find/getBoardById";

export type GetBoardPropOptions<K extends BoardKey> = PropsWithBoardId & {
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
