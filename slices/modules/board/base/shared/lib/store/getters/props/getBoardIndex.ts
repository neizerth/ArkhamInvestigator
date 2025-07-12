import { type GetBoardPropOptions, getBoardProp } from "./getBoardProp";

export type GetBoardIndexOptions = Omit<GetBoardPropOptions<"index">, "prop">;

export const getBoardIndex = (options: GetBoardIndexOptions) => {
	const index = getBoardProp({
		...options,
		prop: "index",
	});

	return index;
};
