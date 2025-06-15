import type { OmitBoard } from "@modules/board/base/shared/model";
import { type GetBoardIndexOptions, getBoardIndex } from "../getBoardIndex";

type Options = OmitBoard<GetBoardIndexOptions>;

export const getCurrentId = (options: Options) =>
	getBoardIndex({
		...options,
		boardId: "current",
	});
