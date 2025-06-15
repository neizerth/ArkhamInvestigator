import type {
	InvestigatorBoard,
	OmitBoard,
} from "@modules/board/base/shared/model";
import {
	type SelectBoardPropOptions,
	selectBoardProp,
} from "./selectBoardProp";

type Key = keyof InvestigatorBoard;
type Options<T extends Key> = OmitBoard<SelectBoardPropOptions<T>>;
export const selectCurrentProp = <T extends Key>(options: Options<T>) =>
	selectBoardProp({
		...options,
		boardId: "current",
	});
