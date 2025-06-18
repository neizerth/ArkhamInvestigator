import type { InvestigatorBoardStat as Key } from "../../../../model/board";
import {
	type ChangeBoardPropValuePayload,
	changeBoardPropValue,
} from "../../actions";
import { createBoardThunk } from "../../util";

export type SetBoardPropValueCommonPayload<K extends Key> = Omit<
	ChangeBoardPropValuePayload<K>,
	"code"
>;

export const setBoardPropValueCommon = createBoardThunk(changeBoardPropValue);
