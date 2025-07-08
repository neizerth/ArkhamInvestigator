import { chaosBagEntitiesSaga } from "@modules/chaos-bag/base/entities/lib/store/sagas";
import { chaosBagFeaturesSaga } from "@modules/chaos-bag/base/features/lib/store/sagas";
import { chaosBagRevealEntitiesSaga } from "@modules/chaos-bag/reveal/base/entities/lib/store/sagas";
import { chaosBagRevealHistoryEntitiesSaga } from "@modules/chaos-bag/reveal/history/entities/lib/store/sagas";
import { chaosBagRevealHistoryFeaturesSaga } from "@modules/chaos-bag/reveal/history/features/lib/store/sagas";
import { chaosBagRevealModalEntitiesSaga } from "@modules/chaos-bag/reveal/modal/entities/lib/store/sagas";
import { spawn } from "redux-saga/effects";

export function* chaosBagSaga() {
	yield spawn(chaosBagEntitiesSaga);

	yield spawn(chaosBagFeaturesSaga);

	yield spawn(chaosBagRevealEntitiesSaga);
	yield spawn(chaosBagRevealModalEntitiesSaga);

	yield spawn(chaosBagRevealHistoryFeaturesSaga);

	yield spawn(chaosBagRevealHistoryEntitiesSaga);
}
