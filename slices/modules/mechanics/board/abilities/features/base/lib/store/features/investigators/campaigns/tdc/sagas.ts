import { fork } from "redux-saga/effects";
import { GeorgeBarnabyAbilitySaga } from "./GeorgeBarnabyAbilitySaga";
import { LuciusGallowayAbilitySaga } from "./LuciusGallowayAbilitySaga";

export function* TheDrownedCityInvestigatorAbilitySaga() {
	yield fork(GeorgeBarnabyAbilitySaga);
	yield fork(LuciusGallowayAbilitySaga);
}
