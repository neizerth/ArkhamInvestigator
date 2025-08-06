import { fork } from "redux-saga/effects";
import { HankSamsonAbilitySaga } from "./HankSamsonAbilitySaga";
import { KohakuNarukamiAbilitySaga } from "./KohakuNarukami";
import { ShatteredSelfAbilitySaga } from "./ShatteredSelfAbilitySaga";

export function* TheFeastOfHemlockValeInvestigatorAbilitySaga() {
	yield fork(HankSamsonAbilitySaga);
	yield fork(ShatteredSelfAbilitySaga);
	yield fork(KohakuNarukamiAbilitySaga);
}
