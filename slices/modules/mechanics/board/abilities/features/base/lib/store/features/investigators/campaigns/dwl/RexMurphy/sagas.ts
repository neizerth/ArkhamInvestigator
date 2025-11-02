import { fork } from "redux-saga/effects";
import { BaseRexMurphyAbilitySaga } from "./base/sagas";

export function* RexMurphyAbilitySaga() {
	yield fork(BaseRexMurphyAbilitySaga);
}
