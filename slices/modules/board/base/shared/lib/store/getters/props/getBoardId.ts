import { type GetBoardPropOptions, getBoardProp } from "./getBoardProp";

type Options = Omit<GetBoardPropOptions<"id">, "prop">;

export const getBoardId = (options: Options) => {
	return getBoardProp({
		...options,
		prop: "id",
	});
};
