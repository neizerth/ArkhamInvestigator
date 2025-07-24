import { fork } from "redux-saga/effects";
import { GeorgeBarnabyAbilitySaga } from "./GeorgeBarnabyAbilitySaga";

export function* TheDrownedCityInvestigatorAbilitySaga() {
	yield fork(GeorgeBarnabyAbilitySaga);
}
