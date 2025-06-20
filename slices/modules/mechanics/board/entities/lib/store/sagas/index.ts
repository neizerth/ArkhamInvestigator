import { spawn } from "redux-saga/effects";
import { spendCluesSaga } from "../features";

export function* boardEntityMechanicsSaga() {
	yield spawn(spendCluesSaga);
}
