import { fork } from "redux-saga/effects";
import { YukiYagamiAbilitySaga } from "./YukiYagamiAbilitySaga";

export function* TheGhostsOfOnigawaAbilitySaga() {
	yield fork(YukiYagamiAbilitySaga);
}
