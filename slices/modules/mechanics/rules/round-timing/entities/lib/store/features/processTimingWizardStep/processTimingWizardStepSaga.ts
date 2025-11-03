import {
	endTurnToAllBoards,
	giveUpkeepResourcesToAllBoards,
	placeDoomOnAgenda,
	resetUpkeepAllInvestigatorActions,
} from "@modules/mechanics/phase/features/lib";
import type { TimingPhaseStepSpecialType } from "@modules/mechanics/rules/round-timing/shared/model";
import type { Action } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { processTimingWizardStep } from "./processTimingWizardStep";

const actionCreatorMap: Record<TimingPhaseStepSpecialType, () => Action> = {
	"mythos-doom": placeDoomOnAgenda,
	"upkeep-resource": giveUpkeepResourcesToAllBoards,
	"reset-actions": resetUpkeepAllInvestigatorActions,
	"turn-end": endTurnToAllBoards,
};

function* worker({ payload }: ReturnType<typeof processTimingWizardStep>) {
	const { specialType } = payload.step;

	if (!specialType) {
		return;
	}

	const actionCreator = actionCreatorMap[specialType];

	if (actionCreator) {
		yield put(actionCreator());
	}
}

export function* processTimingWizardStepSaga() {
	yield takeEvery(processTimingWizardStep.match, worker);
}
