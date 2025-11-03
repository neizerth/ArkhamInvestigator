import { spawn } from "redux-saga/effects";
import { boardAbilitiesMechanicsSaga } from "./board/abilities/sagas";
import { boardEntityMechanicsSaga } from "./board/base/entities/lib/store/sagas";
import { boardFeatureMechanicsSaga } from "./board/base/features/sagas";
import { phaseSaga } from "./phase/features/sagas";
import { rulesSaga } from "./rules/sagas";

export function* mechanicsSaga() {
	// mechanics
	yield spawn(boardEntityMechanicsSaga);
	yield spawn(boardAbilitiesMechanicsSaga);

	yield spawn(boardFeatureMechanicsSaga);

	yield spawn(rulesSaga);
	yield spawn(phaseSaga);
}
