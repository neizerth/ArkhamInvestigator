import { spawn } from "redux-saga/effects";
import {
	openClearRevealHistoryWarningSaga,
	openNewGameWarningSaga,
	openResetBoardWarningSaga,
} from "../features";
import { modalCustomActionsSaga } from "./customActions";

// TODO
export function* modalEntitiesSaga() {
	yield spawn(modalCustomActionsSaga);

	yield spawn(openResetBoardWarningSaga);
	yield spawn(openClearRevealHistoryWarningSaga);
	yield spawn(openNewGameWarningSaga);
}
