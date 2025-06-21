import { spawn } from "redux-saga/effects";
import { CalwinWrightAbilitySaga } from "./CalwinWrightAbilitySaga";
import { DianaStanleyAbilitySaga } from "./DianaStanleyAbilitySaga";
import { GeorgeBarnabyAbilitySaga } from "./GeorgeBarnabyAbilitySaga";
import { ShatteredSelfAbilitySaga } from "./ShatteredSelfAbilitySaga";
import { Subject5U21AbilitySaga } from "./Subject5U21AbilitySaga";

export function* abilityEntityMechanicsSaga() {
	yield spawn(DianaStanleyAbilitySaga);
	yield spawn(GeorgeBarnabyAbilitySaga);
	yield spawn(Subject5U21AbilitySaga);
	yield spawn(CalwinWrightAbilitySaga);
	yield spawn(ShatteredSelfAbilitySaga);
}
