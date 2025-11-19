import { fork } from "redux-saga/effects";
import { HankSamsonAbilitySaga } from "./HankSamsonAbilitySaga";
import { KateWinthropAbilitySaga } from "./KateWinthrop";
import { KohakuNarukamiAbilitySaga } from "./KohakuNarukami/sagas";
import { ShatteredSelfAbilitySaga } from "./ShatteredSelfAbilitySaga";

export function* TheFeastOfHemlockValeInvestigatorAbilitySaga() {
	yield fork(HankSamsonAbilitySaga);
	yield fork(ShatteredSelfAbilitySaga);
	yield fork(KohakuNarukamiAbilitySaga);
	yield fork(KateWinthropAbilitySaga);
}
