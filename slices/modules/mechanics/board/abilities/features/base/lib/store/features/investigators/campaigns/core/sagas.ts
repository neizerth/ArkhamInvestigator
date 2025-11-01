import { fork } from "redux-saga/effects";
import { AgnesBakerAbilitySaga } from "./AgnesBaker/sagas";
import { RolandBanksAbilitySaga } from "./RolandBanksAbilitySaga";
import { SkidsOTooleAbilitySaga } from "./SkidsOToole/sagas";

export function* CoreGameAbilitySaga() {
	yield fork(AgnesBakerAbilitySaga);
	yield fork(SkidsOTooleAbilitySaga);
	yield fork(RolandBanksAbilitySaga);
}
