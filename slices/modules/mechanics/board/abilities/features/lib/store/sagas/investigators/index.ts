import { spawn } from "redux-saga/effects";
import { CalwinWrightAbilitySaga } from "./CalwinWrightAbilitySaga";
import { DianaStanleyAbilitySaga } from "./DianaStanleyAbilitySaga";
import { GeorgeBarnabyAbilitySaga } from "./GeorgeBarnabyAbilitySaga";
import { LilyChenAbilitySaga } from "./LilyChenAbilitySaga";
import { LolaHayesAbilitySaga } from "./LolaHayesAbilitySaga";
import { ShatteredSelfAbilitySaga } from "./ShatteredSelfAbilitySaga";
import { SisterMaryAbilitySaga } from "./SisterMaryAbilitySaga";
import { Subject5U21AbilitySaga } from "./Subject5U21AbilitySaga";
import { ZoeySamarasAbilitySaga } from "./ZoeySamaras";

export function* investigatorAbilitiesSaga() {
	yield spawn(DianaStanleyAbilitySaga);
	yield spawn(GeorgeBarnabyAbilitySaga);
	yield spawn(Subject5U21AbilitySaga);
	yield spawn(CalwinWrightAbilitySaga);
	yield spawn(ShatteredSelfAbilitySaga);
	yield spawn(SisterMaryAbilitySaga);
	yield spawn(ZoeySamarasAbilitySaga);
	yield spawn(LolaHayesAbilitySaga);
	yield spawn(LilyChenAbilitySaga);
}
