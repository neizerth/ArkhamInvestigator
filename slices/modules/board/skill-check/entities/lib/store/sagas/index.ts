import { spawn } from "redux-saga/effects";
import { openSkillCheckPromptSaga } from "../features/openSkillCheckPrompt";
import { processSkillCheckRenameSaga } from "../features/openSkillCheckRenamePrompt";
import { processSkillCheckPinSaga } from "../features/processSkillCheckPin";

export function* skillCheckEntitiesSaga() {
	yield spawn(openSkillCheckPromptSaga);

	yield spawn(processSkillCheckRenameSaga);
	yield spawn(processSkillCheckPinSaga);
}
