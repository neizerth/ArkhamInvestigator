import { spawn } from "redux-saga/effects";
import { investigationPhaseSaga } from "./investigation/sagas";
import { mythosPhaseSaga } from "./mythos/sagas";
import { upkeepPhaseSaga } from "./upkeep/sagas";

export function* phaseEffectsSaga() {
	yield spawn(investigationPhaseSaga);
	yield spawn(mythosPhaseSaga);
	yield spawn(upkeepPhaseSaga);
}
