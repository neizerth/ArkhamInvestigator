import { cancelModalActionSaga } from "@modules/core/modal/shared/actions/cancel/lib";
import { followURLActionSaga } from "@modules/core/modal/shared/actions/custom/follow-url/lib";
import { goToPageActionSaga } from "@modules/core/modal/shared/actions/custom/go-to-page/lib";
import { confirmSaga } from "@modules/core/modal/shared/confirm/lib/store/sagas";
import { promptSaga } from "@modules/core/modal/shared/prompt/lib/store/sagas";
import { spawn } from "redux-saga/effects";
import { closeModalSaga, processModalActionSaga } from "../features";
import { closeModalActionSaga } from "../features/closeModal/closeModalActionSaga";

export function* modalSharedSaga() {
	yield spawn(closeModalSaga);
	yield spawn(processModalActionSaga);
	yield spawn(closeModalActionSaga);

	yield spawn(cancelModalActionSaga);
	yield spawn(followURLActionSaga);
	yield spawn(goToPageActionSaga);

	yield spawn(confirmSaga);
	yield spawn(promptSaga);
	// yield spawn(closePromptSaga);
	// yield spawn(confirmPromptSaga);
}
