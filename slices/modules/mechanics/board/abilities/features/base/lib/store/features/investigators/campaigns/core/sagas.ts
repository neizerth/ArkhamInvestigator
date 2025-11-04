import { fork } from "redux-saga/effects";
import { AgnesBakerAbilitySaga } from "./AgnesBaker/sagas";
import { DaisyWalkerAbilitySaga } from "./DaisyWalker/sagas";
import { RolandBanksAbilitySaga } from "./RolandBanksAbilitySaga";
import { SkidsOTooleAbilitySaga } from "./SkidsOToole/sagas";
import { WendyAdamsAbilitySaga } from "./WendyAdams/sagas";

export function* CoreGameAbilitySaga() {
	yield fork(AgnesBakerAbilitySaga);
	yield fork(SkidsOTooleAbilitySaga);
	yield fork(RolandBanksAbilitySaga);
	yield fork(DaisyWalkerAbilitySaga);
	yield fork(WendyAdamsAbilitySaga);
}
