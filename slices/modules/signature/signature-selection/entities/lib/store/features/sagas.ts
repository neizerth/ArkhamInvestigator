import { spawn } from "redux-saga/effects";
import { addCurrentSignatureSaga } from "./addCurrentSignature/addCurrentSignatureSaga";
import { setFactionFilterSaga } from "./setFactionFilter/sagas";
import { toggleSelectedSignatureSaga } from "./toggleSelectedSignature/toggleSelectedSignatureSaga";

export function* selectionEntitiesSaga() {
	yield spawn(toggleSelectedSignatureSaga);
	yield spawn(addCurrentSignatureSaga);
	yield spawn(setFactionFilterSaga);
}
