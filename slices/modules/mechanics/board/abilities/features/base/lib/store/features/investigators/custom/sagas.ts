import { spawn } from "redux-saga/effects";
import { AliceInWonderlandSaga } from "./zaw/sagas";
import { DarkestDungeonSaga } from "./zdh/sagas";
import { TheGhostsOfOnigawaAbilitySaga } from "./zgoo/sagas";
import { OrdinaryCitizensAbilitySaga } from "./zoc/sagas";
import { SoakmansInvestigatorsSaga } from "./zsti/sagas";

export function* customContentInvestigatorAbilitySaga() {
	yield spawn(AliceInWonderlandSaga);
	yield spawn(DarkestDungeonSaga);
	yield spawn(SoakmansInvestigatorsSaga);
	yield spawn(OrdinaryCitizensAbilitySaga);
	yield spawn(TheGhostsOfOnigawaAbilitySaga);
}
