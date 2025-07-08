import { spawn } from "redux-saga/effects";
import { CalwinWrightAbilitySaga } from "./CalwinWrightAbilitySaga";
import { DianaStanleyAbilitySaga } from "./DianaStanleyAbilitySaga";

export function* investigatorAbilitiesSaga() {
	yield spawn(DianaStanleyAbilitySaga);
	// yield spawn(GeorgeBarnabyAbilitySaga);
	// yield spawn(Subject5U21AbilitySaga);
	yield spawn(CalwinWrightAbilitySaga);
	// yield spawn(ShatteredSelfAbilitySaga);
	// yield spawn(ZoeySamarasAbilitySaga);
}
