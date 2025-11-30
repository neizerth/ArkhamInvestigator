import { spawn } from "redux-saga/effects";
import { endChaosBagRevealSaga } from "./endChaosBagReveal/endChaosBagRevealSaga";
import { chaosBagRevealReturnSaga } from "./return/sagas";
import { revealChaosTokenByIdSaga } from "./revealChaosTokenById/revealChaosTokenByIdSaga";
import { revealChaosTokensSaga } from "./revealChaosTokens/revealChaosTokensSaga";
import { revealRandomChaosTokensSaga } from "./revealRandomChaosTokens/revealRandomChaosTokensSaga";
import { setRevealSkillValueFromTypeSaga } from "./setRevealSkillValueFromType/setRevealSkillValueFromTypeSaga";
import { setSkillCheckModifierSaga } from "./setSkillCheckModifier/setSkillCheckModifierSaga";
import { startRevealSaga } from "./startReveal/sagas";
import { updateRevealedTokenSaga } from "./updateRevealedToken/updateRevealedTokenSaga";

export function* chaosBagRevealEntitiesSaga() {
	yield spawn(chaosBagRevealReturnSaga);

	yield spawn(revealChaosTokensSaga);
	yield spawn(revealRandomChaosTokensSaga);
	yield spawn(startRevealSaga);
	yield spawn(endChaosBagRevealSaga);
	yield spawn(updateRevealedTokenSaga);
	yield spawn(revealChaosTokenByIdSaga);
	yield spawn(setRevealSkillValueFromTypeSaga);
	yield spawn(setSkillCheckModifierSaga);
}
