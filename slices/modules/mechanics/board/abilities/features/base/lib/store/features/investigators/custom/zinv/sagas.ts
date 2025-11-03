import { spawn } from "redux-saga/effects";
import { LuciaDeverauxAbilitySaga } from "./LuciaDeverauxAbilitySaga";

export function* OrdinaryCitizensAbilitySaga() {
	yield spawn(LuciaDeverauxAbilitySaga);
}
