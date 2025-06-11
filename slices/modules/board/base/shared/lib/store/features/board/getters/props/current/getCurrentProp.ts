import type { BoardKey } from "@modules/board/base/shared/model";
import { type GetBoardPropOptions, getBoardProp } from "../getBoardProp";

type Options<K extends BoardKey> = Omit<GetBoardPropOptions<K>, "boardId">;

export const getCurrentProp = <K extends BoardKey>(options: Options<K>) =>
	getBoardProp({
		...options,
		boardId: "current",
	});
