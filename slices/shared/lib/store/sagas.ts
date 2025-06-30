import { abilitiesSaga } from "@modules/board/abilities/shared/lib";
import { boardSharedSaga } from "@modules/board/base/shared/lib";
import { boardHistorySaga } from "@modules/board/history/shared/lib";
import { skillCheckSaga } from "@modules/board/skill-check/shared/lib";
import { boardEntityAbilityMechanicsSaga } from "@modules/mechanics/board/abilities/features/lib/store/sagas";
import { boardEntityMechanicsSaga } from "@modules/mechanics/board/base/entities/lib";
import { spawn } from "redux-saga/effects";

export default function* rootSaga() {
	// shared
	yield spawn(boardSharedSaga);
	yield spawn(boardHistorySaga);

	yield spawn(abilitiesSaga);
	yield spawn(skillCheckSaga);

	// entities
	yield spawn(boardEntityMechanicsSaga);
	yield spawn(boardEntityAbilityMechanicsSaga);
}
