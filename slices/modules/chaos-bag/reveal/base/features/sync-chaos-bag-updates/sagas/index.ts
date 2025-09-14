import { fork } from "redux-saga/effects";
import { syncAbilityUseWithChaosBagSaga } from "./syncAbilityUseWithChaosBagSaga";
import { syncChaosBagContentsSaga } from "./syncChaosBagContentsSaga";
import { syncRevealedTokensWithChaosBagContentsSaga } from "./syncRevealedTokensWithChaosBagContentsSaga";

export function* syncChaosBagUpdatesSaga() {
	yield fork(syncChaosBagContentsSaga);
	yield fork(syncAbilityUseWithChaosBagSaga);
	yield fork(syncRevealedTokensWithChaosBagContentsSaga);
}
