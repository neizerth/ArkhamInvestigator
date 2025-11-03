import { spawn } from "redux-saga/effects";
import { AliceInWonderlandSaga } from "./zaw/sagas";
import { DarkestDungeonSaga } from "./zdh/sagas";
import { OrdinaryCitizensAbilitySaga } from "./zinv/sagas";
import { SoakmansInvestigatorsSaga } from "./zsti/sagas";

export function* customContentInvestigatorAbilitySaga() {
	yield spawn(AliceInWonderlandSaga);
	yield spawn(DarkestDungeonSaga);
	yield spawn(SoakmansInvestigatorsSaga);
	yield spawn(OrdinaryCitizensAbilitySaga);
}
