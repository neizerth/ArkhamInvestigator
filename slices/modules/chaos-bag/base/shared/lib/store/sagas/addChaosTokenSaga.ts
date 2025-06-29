import { take } from "redux-saga/effects";
import { addChaosToken } from "../actions";

export function* addChaosTokenSaga() {
	type Action = ReturnType<typeof addChaosToken>;
	const { payload }: Action = yield take(addChaosToken.match);
}
