import { spawn } from "redux-saga/effects";
import { ReynauldDeChatillonAbilitySaga } from "./ReynauldDeChatillon/sagas";

export function* DarkestDungeonSaga() {
	yield spawn(ReynauldDeChatillonAbilitySaga);
}
