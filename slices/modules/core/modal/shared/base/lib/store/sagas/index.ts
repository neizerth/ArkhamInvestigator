import { spawn } from "redux-saga/effects";
import { closeModalSaga } from "../features";

export function* modalSharedSaga() {
	// yield spawn(closeModalActionSaga);

	yield spawn(closeModalSaga);

	// yield spawn(closePromptSaga);
	// yield spawn(confirmPromptSaga);

	// yield spawn(followURLActionSaga);
	// yield spawn(goToPageActionSaga);
}
