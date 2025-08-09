import { spawn } from "redux-saga/effects";
import { endRevealEffectsSaga } from "./end-reveal-effects/endRevealEffectsSaga";
import { initChaosBagRevealSaga } from "./init-chaos-bag-reveal/initChaosBagRevealSaga";
import { markReturnedTokenAsRemovedSaga } from "./mark-revealed-token-as-removed/markReturnedTokenAsRemovedSaga";
import { syncRevealedTokensWithChaosBagContentsSaga } from "./sync-chaos-bag-updates/syncRevealedTokensWithChaosBagContentsSaga";
import { updateRevealedTokenSaga } from "./update-revealed-token/updateRevealedTokenSaga";

export function* chaosBagRevealFeaturesSaga() {
	yield spawn(endRevealEffectsSaga);
	yield spawn(syncRevealedTokensWithChaosBagContentsSaga);
	yield spawn(updateRevealedTokenSaga);
	yield spawn(initChaosBagRevealSaga);
	yield spawn(markReturnedTokenAsRemovedSaga);
}
