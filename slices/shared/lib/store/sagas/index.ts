import { skillCheckSharedSaga } from "@modules/board/skill-check/shared/lib/store/features/sagas";
import { boardEntityAbilityMechanicsSaga } from "@modules/mechanics/board/abilities/features/lib/store/sagas";
import { boardEntityMechanicsSaga } from "@modules/mechanics/board/base/entities/lib/store/sagas";
import { spawn } from "redux-saga/effects";
import { boardSagas } from "./board";

export default function* rootSaga() {
	yield spawn(boardSagas);

	// shared
	yield spawn(skillCheckSharedSaga);

	// mechanics
	yield spawn(boardEntityMechanicsSaga);
	yield spawn(boardEntityAbilityMechanicsSaga);
}
