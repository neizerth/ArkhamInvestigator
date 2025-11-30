import { fork } from "redux-saga/effects";
import { RichardCarlisleHandleModalActionSaga } from "./handleModalAction/handleModalActionSaga";
import { RichardCarlisleOpenModalSaga } from "./openModal/openModal";
import { RichardCarlisleResetReactionAbilitiesSaga } from "./resetReactionAbilities/resetReactionAbilitiesSaga";

export function* RichardCarlisleAbilitySaga() {
	yield fork(RichardCarlisleOpenModalSaga);
	yield fork(RichardCarlisleHandleModalActionSaga);
	yield fork(RichardCarlisleResetReactionAbilitiesSaga);
}
