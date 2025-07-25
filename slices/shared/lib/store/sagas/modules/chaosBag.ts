import { chaosBagEntitiesSaga } from "@modules/chaos-bag/base/entities/lib/store/sagas";
import { chaosBagFeaturesSaga } from "@modules/chaos-bag/base/features/lib/store/sagas";
import { chaosBagRevealEntitiesSaga } from "@modules/chaos-bag/reveal/base/entities/lib/store/sagas";
import { chaosBagRevealFeaturesSaga } from "@modules/chaos-bag/reveal/base/features/sagas";
import { chaosBagRevealHistoryEntitiesSaga } from "@modules/chaos-bag/reveal/history/entities/lib/store/sagas";
import { chaosBagRevealHistoryFeaturesSaga } from "@modules/chaos-bag/reveal/history/features/lib/store/sagas";
import { chaosTokenRevealModalSaga } from "@modules/chaos-bag/reveal/modal/features/chaos-token-reveal-modal/lib/store/sagas";
import { chaosBagValueEntitiesSaga } from "@modules/chaos-bag/value/entities/lib/store/sagas";
import { spawn } from "redux-saga/effects";

export function* chaosBagSaga() {
	yield spawn(chaosBagEntitiesSaga);

	yield spawn(chaosBagFeaturesSaga);

	yield spawn(chaosBagRevealEntitiesSaga);

	yield spawn(chaosBagRevealHistoryEntitiesSaga);
	yield spawn(chaosBagRevealHistoryFeaturesSaga);

	yield spawn(chaosTokenRevealModalSaga);

	// entities

	yield spawn(chaosBagValueEntitiesSaga);

	// features
	yield spawn(chaosBagRevealFeaturesSaga);
}
