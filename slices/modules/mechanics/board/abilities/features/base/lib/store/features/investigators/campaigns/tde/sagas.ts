import { spawn } from "redux-saga/effects";
import { LukeRobinsonAbilitySaga } from "./LukeRobinsonAbilitySaga";
import { TonyMorganAbilitySaga } from "./TonyMorganAbilitySaga";

export function* TheDreamEatersInvestigatorAbilitySaga() {
	yield spawn(TonyMorganAbilitySaga);
	yield spawn(LukeRobinsonAbilitySaga);
}
