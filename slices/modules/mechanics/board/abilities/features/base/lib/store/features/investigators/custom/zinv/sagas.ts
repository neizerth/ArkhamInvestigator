import { spawn } from "redux-saga/effects";
import { LuciaDeverauxAbilitySaga } from "./LuciaDeverauxAbilitySaga";
import { RichardCarlisleAbilitySaga } from "./RichardCarlisle/sagas";

export function* OrdinaryCitizensAbilitySaga() {
	yield spawn(LuciaDeverauxAbilitySaga);
	yield spawn(RichardCarlisleAbilitySaga);
}
