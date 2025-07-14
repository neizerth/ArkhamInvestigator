import { spawn } from "redux-saga/effects";
import { giveActionSaga } from "../features/giveAction/giveActionSaga";
import { investigatorAbilitiesSaga } from "./investigators";

export function* boardEntityAbilityMechanicsSaga() {
	yield spawn(investigatorAbilitiesSaga);

	yield spawn(giveActionSaga);
}
