import type { InvestigatorBoardValueProp as Key } from "@modules/board/base/shared/model";
import {
	type ChangeBoardValuePartPayload,
	changeBoardValuePart,
} from "../actions";
import { createBoardThunk, createCurrentActionCreator } from "../util";

export type SetBoardValuePartPayload<K extends Key> = Omit<
	ChangeBoardValuePartPayload<K>,
	"code"
>;

export const setBoardValuePart = createBoardThunk(changeBoardValuePart);
export const setCurrentValuePart =
	createCurrentActionCreator(setBoardValuePart);
