import { takeEvery } from "redux-saga/effects";
import { toggleSelectedSignature } from "./toggleSelectedSignature";

function* worker({ payload }: ReturnType<typeof toggleSelectedSignature>) {}

export function* toggleSelectedSignatureSaga() {
	yield takeEvery(toggleSelectedSignature.match, worker);
}
