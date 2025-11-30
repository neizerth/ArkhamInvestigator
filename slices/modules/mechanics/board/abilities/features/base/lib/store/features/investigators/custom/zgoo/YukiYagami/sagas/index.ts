import { fork } from "redux-saga/effects";
import { YukiYagamiOpenModalSaga } from "./openModalSaga";
import { YukiYagamiProcessModalActionSaga } from "./processModalActionSaga";
import { YukiYagamiReturnToModalSaga } from "./returnToRevealModalSaga";

export function* YukiYagamiAbilitySaga() {
	yield fork(YukiYagamiReturnToModalSaga);
	yield fork(YukiYagamiOpenModalSaga);
	yield fork(YukiYagamiProcessModalActionSaga);
}
