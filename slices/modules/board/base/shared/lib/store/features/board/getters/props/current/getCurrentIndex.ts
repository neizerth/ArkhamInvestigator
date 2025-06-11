import { type GetBoardIndexOptions, getBoardIndex } from "../getBoardIndex";

type Options = Omit<GetBoardIndexOptions, "boardId">;

export const getCurrentIndex = (options: Options) =>
	getBoardIndex({
		...options,
		boardId: "current",
	});
