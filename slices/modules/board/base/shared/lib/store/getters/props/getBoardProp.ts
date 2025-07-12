import type { BoardKey } from "@modules/board/base/shared/model";
import { type GetBoardByIdOptions, getBoardById } from "../find/getBoardById";

export type GetBoardPropOptions<K extends BoardKey> = GetBoardByIdOptions & {
	prop: K;
};

export const getBoardProp = <K extends BoardKey>(
	options: GetBoardPropOptions<K>,
) => {
	const { prop } = options;

	const value = getBoardById(options)?.[prop];
	return value;
};
