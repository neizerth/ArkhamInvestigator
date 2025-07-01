import { skillCheckSharedSaga } from "@modules/board/skill-check/shared/lib";
import { notificationsSharedSaga } from "@modules/core/notifications/shared/lib";
import { boardEntityAbilityMechanicsSaga } from "@modules/mechanics/board/abilities/features/lib";
import { boardEntityMechanicsSaga } from "@modules/mechanics/board/base/entities/lib";
import { spawn } from "redux-saga/effects";
import { boardSagas } from "./board";

export default function* rootSaga() {
	yield spawn(boardSagas);

	// shared
	yield spawn(skillCheckSharedSaga);
	yield spawn(notificationsSharedSaga);

	// mechanics
	yield spawn(boardEntityMechanicsSaga);
	yield spawn(boardEntityAbilityMechanicsSaga);
}
