import { fork } from "redux-saga/effects";
import { EdmundMooreAbilitySaga } from "./EdmundMoore/sagas";

export function* SoakmansInvestigatorsSaga() {
	yield fork(EdmundMooreAbilitySaga);
}
