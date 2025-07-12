import { createModalActionFilter } from "@modules/core/modal/shared/base/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { timingWizardModalActionId } from "../config";
import type { TimingWizardModalAction } from "../model";
import { openTimingWizardModal } from "../openTimingWizardModal";

const filterAction = createModalActionFilter({
	id: timingWizardModalActionId,
});

type Action = PayloadAction<TimingWizardModalAction>;

function* worker({ payload }: Action) {
	const { step, phaseId } = payload;

	if (!step) {
		return;
	}

	const stepIndex = step.index;

	yield put(
		openTimingWizardModal({
			phaseId,
			stepIndex,
		}),
	);
}

export function* startTimingWizardSaga() {
	yield takeEvery(filterAction, worker);
}
