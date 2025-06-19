import {
	type ChangeBoardPropValuePayload,
	changeBoardPropValue,
} from "../../actions";
import { createBoardThunk } from "../../util";

export type SetBoardPropValueCommonPayload = Omit<
	ChangeBoardPropValuePayload,
	"code"
>;

export const setBoardPropValue = createBoardThunk(changeBoardPropValue);
