import { spawn } from "redux-saga/effects";
import { DarkMatterKateWinthropAbilitySaga } from "./zdms";

export function* KateWinthropAbilitySaga() {
	yield spawn(DarkMatterKateWinthropAbilitySaga);
}
