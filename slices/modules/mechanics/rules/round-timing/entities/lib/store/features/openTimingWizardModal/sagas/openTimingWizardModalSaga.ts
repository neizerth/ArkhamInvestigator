import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import { put, select, takeEvery } from "redux-saga/effects";

import { getPhaseStepModalAction } from "../../../../logic";
import {
	type TimingWizardModalSagaData,
	selectTimingWizardModalSagaData,
} from "../../../selectors";
import { openTimingWizardModal } from "../openTimingWizardModal";

function* worker({ payload }: ReturnType<typeof openTimingWizardModal>) {
	const data: TimingWizardModalSagaData | undefined = yield select(
		selectTimingWizardModalSagaData(payload),
	);

	if (!data) {
		return;
	}

	const { step, phase, faction } = data;

	const phaseId = phase.id;
	const { title } = phase;

	yield put(
		openConfirm({
			id: "rules-timing-wizard",
			data: {
				title,
				text: step.title,
				faction,
				actions: [
					getPhaseStepModalAction({
						phaseId,
						type: "prev",
						step: data.prev,
						nextStep: step,
					}),
					getPhaseStepModalAction({
						phaseId,
						type: "next",
						step: data.next,
						prevStep: step,
					}),
				],
			},
		}),
	);
}

export function* openTimingWizardModalSaga() {
	yield takeEvery(openTimingWizardModal.match, worker);
}
