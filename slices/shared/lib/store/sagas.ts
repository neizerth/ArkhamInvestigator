import { boardSaga } from "@modules/board/base/shared/lib";
import { spawn } from "redux-saga/effects";

export default function* rootSaga() {
	yield spawn(boardSaga);
}
