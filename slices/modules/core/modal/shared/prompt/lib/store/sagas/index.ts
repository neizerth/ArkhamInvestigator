import { fork } from "redux-saga/effects";
import {
	closePromptSaga,
	confirmPromptSaga,
	openPromptSaga,
} from "../features";

export function* promptSaga() {
	yield fork(closePromptSaga);
	yield fork(confirmPromptSaga);
	yield fork(openPromptSaga);
}
