import { type GetBoardIndexOptions, getBoardIndex } from "../getBoardIndex";

type Options = Omit<GetBoardIndexOptions, "boardId">;

export const getCurrentId = (options: Options) =>
	getBoardIndex({
		...options,
		boardId: "current",
	});
