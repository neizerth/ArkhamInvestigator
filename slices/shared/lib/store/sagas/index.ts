// TODO enable all module sagas
import { skillCheckSharedSaga } from "@modules/board/skill-check/shared/lib/store/sagas";
import { boardEntityAbilityMechanicsSaga } from "@modules/mechanics/board/abilities/features/lib/store/sagas";
import { boardEntityMechanicsSaga } from "@modules/mechanics/board/base/entities/lib/store/sagas";
import { spawn } from "redux-saga/effects";
import { boardSagas } from "./board";
import { chaosBagSaga } from "./chaosBag";

export default function* rootSaga() {
	yield spawn(boardSagas);
	yield spawn(chaosBagSaga);

	// shared
	yield spawn(skillCheckSharedSaga);

	// mechanics
	yield spawn(boardEntityMechanicsSaga);
	yield spawn(boardEntityAbilityMechanicsSaga);
}
