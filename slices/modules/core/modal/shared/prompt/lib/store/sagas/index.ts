import { spawn } from "redux-saga/effects";
import {
	closePromptSaga,
	confirmPromptSaga,
	openPromptSaga,
} from "../features";

export function* promptSaga() {
	yield spawn(closePromptSaga);
	yield spawn(confirmPromptSaga);
	yield spawn(openPromptSaga);
}
