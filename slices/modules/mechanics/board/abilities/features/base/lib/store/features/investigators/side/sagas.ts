import { fork } from "redux-saga/effects";
import { TheBlobThatAteEverythingElseInvestigatorAbilitySaga as TheBlobThatAteEverythingElseSaga } from "./blbe/sagas";

export function* sideScenariosInvestigatorAbilitySaga() {
	yield fork(TheBlobThatAteEverythingElseSaga);
}
