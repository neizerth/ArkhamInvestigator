import {
	createBoardThunk,
	createCurrentActionCreator,
} from "@modules/board/base/shared/lib";
import { spendCluesAction } from "./spendClues.action";

export const spendClues = createBoardThunk(spendCluesAction);
export const spendCurrentClues = createCurrentActionCreator(spendClues);
