import { spawn } from "redux-saga/effects";
import { toggleSelectedSignatureSaga } from "./toggleSelectedSignature/toggleSelectedSignatureSaga";

export function* selectionEntitiesSaga() {
	yield spawn(toggleSelectedSignatureSaga);
}
