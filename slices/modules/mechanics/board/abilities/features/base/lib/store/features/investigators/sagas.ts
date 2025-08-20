import { fork } from "redux-saga/effects";
import { campaignsInvestigatorAbilitySaga as campaignsSaga } from "./campaigns/sagas";
import { sideScenariosInvestigatorAbilitySaga as sideScenariosSaga } from "./side/sagas";

export function* investigatorAbilitiesSaga() {
	yield fork(campaignsSaga);
	yield fork(sideScenariosSaga);
}
