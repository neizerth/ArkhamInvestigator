import { fork } from "redux-saga/effects";
import { Subject5U21AbilitySaga } from "./Subject5U21AbilitySaga";

export function* TheBlobThatAteEverythingElseInvestigatorAbilitySaga() {
	yield fork(Subject5U21AbilitySaga);
}
