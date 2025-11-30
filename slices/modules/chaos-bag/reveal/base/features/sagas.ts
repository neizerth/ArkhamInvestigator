import { spawn } from "redux-saga/effects";
import { endRevealEffectsSaga } from "./end-reveal-effects/endRevealEffectsSaga";
import { initChaosBagRevealSaga } from "./init-chaos-bag-reveal/initChaosBagRevealSaga";
import { markReturnedTokenAsRemovedSaga } from "./mark-revealed-token-as-removed/markReturnedTokenAsRemovedSaga";
import { removeRevealOnBoardResetSaga } from "./remove-reveal-on-board-reset/removeRevealOnBoardClearSaga";
import { revealMoonTokenSaga } from "./reveal-moon-token/revealMoonTokenSaga";
import { syncChaosBagUpdatesSaga } from "./sync-chaos-bag-updates/sagas";
import { updateRevealedTokenSaga } from "./update-revealed-token/updateRevealedTokenSaga";

export function* chaosBagRevealFeaturesSaga() {
	yield spawn(endRevealEffectsSaga);
	yield spawn(syncChaosBagUpdatesSaga);
	yield spawn(updateRevealedTokenSaga);
	yield spawn(initChaosBagRevealSaga);
	yield spawn(markReturnedTokenAsRemovedSaga);
	yield spawn(removeRevealOnBoardResetSaga);
	yield spawn(revealMoonTokenSaga);
}
