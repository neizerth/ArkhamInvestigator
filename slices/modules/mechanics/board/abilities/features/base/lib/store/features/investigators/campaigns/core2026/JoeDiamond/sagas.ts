import { fork } from "redux-saga/effects";
import { Core2026JoeDiamondElderSignSaga } from "./elderSignSaga";
import { Core2026JoeDiamondReactionSaga } from "./reactionSaga";

export function* Core2026JoeDiamondSaga() {
	yield fork(Core2026JoeDiamondElderSignSaga);
	yield fork(Core2026JoeDiamondReactionSaga);
}
