import { spawn } from "redux-saga/effects";
import { changeLanguageSaga } from "./changeLanguage/changeLanguageSaga";
import { detectLanguageSaga } from "./detectLanguage/detectLanguageSaga";

export function* languageEntitySaga() {
	yield spawn(changeLanguageSaga);
	yield spawn(detectLanguageSaga);
}
