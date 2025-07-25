import { boardEntityAbilityMechanicsSaga } from "@modules/mechanics/board/abilities/features/lib/store/sagas";
import { boardEntityMechanicsSaga } from "@modules/mechanics/board/base/entities/lib/store/sagas";
import { boardFeatureMechanicsSaga } from "@modules/mechanics/board/base/features/sagas";
import { spawn } from "redux-saga/effects";

export function* mechanicsSaga() {
	// mechanics
	yield spawn(boardEntityMechanicsSaga);
	yield spawn(boardEntityAbilityMechanicsSaga);

	yield spawn(boardFeatureMechanicsSaga);
}
