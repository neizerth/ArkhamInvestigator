import { appLoaded } from "@modules/core/app/shared/lib";
import { takeOnce } from "@shared/lib";
import { put } from "redux-saga/effects";
import { endChaosBagReveal } from "../../entities/lib";

function* worker() {
	yield put(endChaosBagReveal({}));
}

export function* initChaosBagRevealSaga() {
	yield takeOnce(appLoaded.match, worker);
}
