import { spawn } from "redux-saga/effects";
import { chaosTokensRevealedSaga } from "./chaosTokensRevealedSaga";
import { customChaosBagSkillValueSetSaga } from "./customChaosBagSkillValueSetSaga";

export function* chaosBagRevealHistoryFeaturesSaga() {
	yield spawn(chaosTokensRevealedSaga);
	yield spawn(customChaosBagSkillValueSetSaga);
}
