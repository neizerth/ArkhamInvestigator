import {
	type CreateModalActionFilterAction,
	createModalActionFilter,
} from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";
import { processTimingWizardStep } from "../../../processTimingWizardStep";
import { TimingWizardModalActionId } from "../config";
import type { TimingWizardModalAction } from "../model";
import { openTimingWizardModal } from "../openTimingWizardModal";

const filterAction = createModalActionFilter({
	ids: [TimingWizardModalActionId.next, TimingWizardModalActionId.prev],
});

type Action = CreateModalActionFilterAction<TimingWizardModalAction>;

function* worker({ payload }: Action) {
	const { step, phaseId, prevStep } = payload.modalAction;

	if (!step) {
		return;
	}

	const stepIndex = step.index;

	if (prevStep) {
		yield put(
			processTimingWizardStep({
				step: prevStep,
			}),
		);
	}

	yield put(
		openTimingWizardModal({
			phaseId,
			stepIndex,
		}),
	);
}

export function* timingWizardModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
