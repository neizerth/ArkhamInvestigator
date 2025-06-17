import type { InvestigatorBoardStat as Key } from "../../../../model/board";
import {
	type ChangeBoardPropValuePayload,
	changeBoardPropValue,
} from "../../actions";
import { createBoardThunk } from "../../util";

export type SetBoardPropValuePayload<K extends Key> = Omit<
	ChangeBoardPropValuePayload<K>,
	"code"
>;

export const setBoardPropValue = createBoardThunk(changeBoardPropValue);
