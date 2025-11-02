import { fork } from "redux-saga/effects";
import { BaseRexMurphyOpenModalSaga } from "./openModalSaga";
import { BaseRexMurphyProcessModalActionSaga } from "./processModalActionSaga";
import { BaseRexMurphyReturnToTestSaga } from "./returnToRevealSaga";

export function* BaseRexMurphyElderSignSaga() {
	yield fork(BaseRexMurphyOpenModalSaga);
	yield fork(BaseRexMurphyProcessModalActionSaga);
	yield fork(BaseRexMurphyReturnToTestSaga);
}
