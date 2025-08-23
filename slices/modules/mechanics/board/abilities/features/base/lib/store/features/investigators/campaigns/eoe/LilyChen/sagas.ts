import { fork } from "redux-saga/effects";
import { LilyChenActivateConfirmedDiscipline } from "./features/activateConfirmedDiscipline/activateConfirmedDiscipline";
import { LilyChenActivateDisciplineSaga } from "./features/activateDiscipline/activateDisciplineSaga";
import { LilyChenDisciplineAbilitySaga } from "./features/discipline/disciplineSaga";
import { LilyChenRevealEndModalSaga } from "./features/revealEnd/revealEndModalSaga";

export function* LilyChenAbilitySaga() {
	yield fork(LilyChenDisciplineAbilitySaga);
	yield fork(LilyChenRevealEndModalSaga);
	yield fork(LilyChenActivateConfirmedDiscipline);
	yield fork(LilyChenActivateDisciplineSaga);
}
