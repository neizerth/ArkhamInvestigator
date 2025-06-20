import { abilitiesSaga } from "@modules/board/abilities/shared/lib";
import { boardSharedSaga } from "@modules/board/base/shared/lib";
import { boardHistorySaga } from "@modules/board/history/shared/lib";
import { skillCheckSaga } from "@modules/board/skill-check/shared/lib";
import { boardEntityMechanicsSaga } from "@modules/mechanics/board/entities/lib";
import { spawn } from "redux-saga/effects";

export default function* rootSaga() {
	yield spawn(boardSharedSaga);
	yield spawn(boardHistorySaga);

	yield spawn(abilitiesSaga);
	yield spawn(skillCheckSaga);

	yield spawn(boardEntityMechanicsSaga);
}
