import { fork } from "redux-saga/effects";
import { YukiYagamiOpenModalSaga } from "./openModalSaga";
import { YukiYagamiProcessModalActionSaga } from "./processModalActionSaga";

export function* YukiYagamiAbilitySaga() {
	yield fork(YukiYagamiOpenModalSaga);
	yield fork(YukiYagamiProcessModalActionSaga);
}
