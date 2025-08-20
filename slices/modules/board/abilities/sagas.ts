import { spawn } from "redux-saga/effects";
import { boardAbilityFeaturesSaga } from "./features/sagas";
import { boardAbilitySharedSaga } from "./shared/lib/store/features/sagas";

export function* boardAbilitySaga() {
	yield spawn(boardAbilityFeaturesSaga);
	yield spawn(boardAbilitySharedSaga);
}
