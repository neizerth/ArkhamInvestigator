import { spawn } from "redux-saga/effects";
import { AudreyBourassaAbilitySaga } from "./AudreyBourassaAbilitySaga";
import { ReynauldDeChatillonAbilitySaga } from "./ReynauldDeChatillon/sagas";

export function* DarkestDungeonSaga() {
	yield spawn(ReynauldDeChatillonAbilitySaga);
	yield spawn(AudreyBourassaAbilitySaga);
}
