import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import { put, takeEvery } from "redux-saga/effects";

import {
	type TimingWizardModalSagaData,
	getTimingWizardModalSagaData as getData,
	getPhaseStepModalAction,
} from "../../../../logic";
import { openTimingWizardModal } from "../openTimingWizardModal";

function* worker({ payload }: ReturnType<typeof openTimingWizardModal>) {
	const data: TimingWizardModalSagaData = yield getData(payload);

	if (!data) {
		return;
	}

	const { step, phase, faction } = data;

	const phaseId = phase.id;
	const { text } = step;
	const { title } = phase;

	yield put(
		openConfirm({
			id: "rules-timing-wizard",
			data: {
				title,
				text,
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
