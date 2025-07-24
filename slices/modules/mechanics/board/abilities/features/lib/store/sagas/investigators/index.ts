import { fork } from "redux-saga/effects";
import { campaignsInvestigatorAbilitySaga as campaignsSaga } from "./campaigns";
import { sideScenariosInvestigatorAbilitySaga as sideScenariosSaga } from "./side";

export function* investigatorAbilitiesSaga() {
	yield fork(campaignsSaga);
	yield fork(sideScenariosSaga);
}
