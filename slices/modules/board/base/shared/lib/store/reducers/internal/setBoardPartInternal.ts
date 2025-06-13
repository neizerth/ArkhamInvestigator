import type { BoardReducer } from "@modules/board/base/shared/model";
import {
	type HandleSetBoardPartOptions,
	handleSetBoardPart,
} from "../../handlers";

export type SetBoardPartInternalPayload = Omit<
	HandleSetBoardPartOptions,
	"state"
>;

export const setBoardPartInternal: BoardReducer<SetBoardPartInternalPayload> = (
	state,
	{ payload },
) => {
	handleSetBoardPart({
		...payload,
		state,
	});
};
