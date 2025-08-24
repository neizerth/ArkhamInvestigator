import { spawn } from "redux-saga/effects";
import { TonyMorganAbilitySaga } from "./TonyMorganAbilitySaga";

export function* TheDreamEatersInvestigatorAbilitySaga() {
	yield spawn(TonyMorganAbilitySaga);
}
