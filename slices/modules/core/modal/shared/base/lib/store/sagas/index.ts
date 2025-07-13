import { cancelModalActionSaga } from "@modules/core/modal/shared/actions/cancel/lib";
import { confirmModalActionSaga } from "@modules/core/modal/shared/actions/confirm/lib/confirmModalActionSaga";
import { followURLActionSaga } from "@modules/core/modal/shared/actions/custom/follow-url/lib";
import { goToPageActionSaga } from "@modules/core/modal/shared/actions/custom/go-to-page/lib";
import { confirmSaga } from "@modules/core/modal/shared/confirm/lib/store/sagas";
import { promptSaga } from "@modules/core/modal/shared/prompt/lib/store/sagas";
import { spawn } from "redux-saga/effects";
import { closeModalActionSaga } from "../features/closeModal/closeModalActionSaga";
import { closeModalSaga } from "../features/closeModal/closeModalSaga";
import { processModalActionSaga } from "../features/processModalAction/processModalActionSaga";

export function* modalSharedSaga() {
	yield spawn(closeModalSaga);
	yield spawn(processModalActionSaga);
	yield spawn(closeModalActionSaga);

	yield spawn(cancelModalActionSaga);
	yield spawn(confirmModalActionSaga);
	yield spawn(followURLActionSaga);
	yield spawn(goToPageActionSaga);

	yield spawn(confirmSaga);
	yield spawn(promptSaga);
}
