import type { BoardKey, OmitBoard } from "@modules/board/base/shared/model";
import { type GetBoardPropOptions, getBoardProp } from "../getBoardProp";

type Options<K extends BoardKey> = OmitBoard<GetBoardPropOptions<K>>;

export const getCurrentProp = <K extends BoardKey>(options: Options<K>) =>
	getBoardProp({
		...options,
		boardId: "current",
	});
