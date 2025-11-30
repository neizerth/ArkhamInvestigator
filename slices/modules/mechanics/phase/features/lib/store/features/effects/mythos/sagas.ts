import { spawn } from "redux-saga/effects";
import { placeDoomOnAgendaSaga } from "./placeDoomOnAgenda/placeDoomOnAgendaSaga";

export function* mythosPhaseSaga() {
	yield spawn(placeDoomOnAgendaSaga);
}
