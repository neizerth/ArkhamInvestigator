import { fork } from "redux-saga/effects";
import { YukiYagamiAbilitySaga } from "./YukiYagami/sagas";

export function* TheGhostsOfOnigawaAbilitySaga() {
	yield fork(YukiYagamiAbilitySaga);
}
