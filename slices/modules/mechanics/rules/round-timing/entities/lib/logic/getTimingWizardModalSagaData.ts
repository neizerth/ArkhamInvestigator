import type { ActionCreatorPayload, PropsWithFaction } from "@shared/model";
import { select } from "redux-saga/effects";

import type { openTimingWizardModal } from "../store/features/openTimingWizardModal/openTimingWizardModal";

import { selectCurrentFaction } from "@modules/mechanics/board/base/entities/lib";
import { dec, inc } from "ramda";
import {
	selectTimingWizardPhase,
	selectTimingWizardStep,
} from "../../../shared/lib";
import type { TimingPhase, TimingPhaseStep } from "../../../shared/model";

type Payload = ActionCreatorPayload<typeof openTimingWizardModal>;

export type TimingWizardModalSagaData = PropsWithFaction & {
	step: TimingPhaseStep;
	phase: TimingPhase;
	next?: TimingPhaseStep;
	prev?: TimingPhaseStep;
};

export function* getTimingWizardModalSagaData(payload: Payload) {
	const { stepIndex, phaseId } = payload;

	const nextStepIndex = inc(stepIndex);
	const prevStepIndex = dec(stepIndex);

	const phaseSelector = selectTimingWizardPhase(phaseId);

	const phase: ReturnType<typeof phaseSelector> = yield select(phaseSelector);

	if (!phase) {
		return;
	}

	const step: TimingPhaseStep | null = yield select(
		selectTimingWizardStep(stepIndex),
	);

	if (!step) {
		return;
	}
	const faction: ReturnType<typeof selectCurrentFaction> =
		yield select(selectCurrentFaction);

	const nextStep: TimingPhaseStep | undefined = yield select(
		selectTimingWizardStep(nextStepIndex),
	);
	const prevStep: TimingPhaseStep | undefined = yield select(
		selectTimingWizardStep(prevStepIndex),
	);

	const data: TimingWizardModalSagaData = {
		faction,
		step,
		phase,
		next: nextStep,
		prev: prevStep,
	};

	return data;
}
