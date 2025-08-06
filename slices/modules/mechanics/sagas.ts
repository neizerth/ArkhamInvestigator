import { spawn } from "redux-saga/effects";
import { boardAbilitiesMechanicsFeatures } from "./board/abilities/features/sagas";
import { boardEntityMechanicsSaga } from "./board/base/entities/lib/store/sagas";
import { boardFeatureMechanicsSaga } from "./board/base/features/sagas";

export function* mechanicsSaga() {
	// mechanics
	yield spawn(boardEntityMechanicsSaga);
	yield spawn(boardAbilitiesMechanicsFeatures);

	yield spawn(boardFeatureMechanicsSaga);
}
