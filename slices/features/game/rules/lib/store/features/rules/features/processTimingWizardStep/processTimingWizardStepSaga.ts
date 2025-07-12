import { put, takeEvery } from "redux-saga/effects";
import {
	giveUpkeepResourcesToAllBoards,
	placeDoomOnAgenda,
	resetUpkeepAllInvestigatorActions,
} from "../../../../../../../phase";
import { processTimingWizardStep } from "./processTimingWizardStep";

function* worker({ payload }: ReturnType<typeof processTimingWizardStep>) {
	const { step } = payload;

	if (step.specialType === "mythos-doom") {
		yield put(placeDoomOnAgenda());
		return;
	}

	if (step.specialType === "upkeep-resource") {
		yield put(giveUpkeepResourcesToAllBoards());
		return;
	}

	if (step.specialType === "reset-actions") {
		yield put(resetUpkeepAllInvestigatorActions());
		return;
	}
}

export function* processTimingWizardStepSaga() {
	yield takeEvery(processTimingWizardStep.match, worker);
}
