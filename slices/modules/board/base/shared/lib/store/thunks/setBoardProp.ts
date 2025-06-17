import type { BoardKey } from "@modules/board/base/shared/model";
import { type ChangeBoardPropPayload, changeBoardProp } from "../actions";
import { createBoardThunk } from "../util";

export type SetBoardPropPayload<K extends BoardKey> = Omit<
	ChangeBoardPropPayload<K>,
	"code"
>;

export const setBoardProp = createBoardThunk(changeBoardProp);
