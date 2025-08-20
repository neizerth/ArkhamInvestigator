import { fork } from "redux-saga/effects";
import { BaseRexMurphyAbilitySaga } from "./base/sagas";
import { BaseRexMurphyProcessModalActionSaga } from "./base/sagas/processModalActionSaga";
import { BaseRexMurphyReturnToTestSaga } from "./base/sagas/returnToRevealSaga";

export function* RexMurphyAbilitySaga() {
	yield fork(BaseRexMurphyAbilitySaga);
	yield fork(BaseRexMurphyProcessModalActionSaga);
	yield fork(BaseRexMurphyReturnToTestSaga);
}
