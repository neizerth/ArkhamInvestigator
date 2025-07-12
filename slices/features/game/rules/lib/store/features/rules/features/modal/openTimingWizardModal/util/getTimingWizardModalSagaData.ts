import type { ActionCreatorPayload, PropsWithFaction } from "@shared/model";
import { select } from "redux-saga/effects";
import {
	selectTimingWizardStep as selectStep,
	selectTimingWizardPhase,
} from "../../../../selectors";
import type { openTimingWizardModal } from "../openTimingWizardModal";

import type { BaseModalActionTitle } from "@modules/core/modal/shared/base/model";
import { selectCurrentFaction } from "@modules/mechanics/board/base/entities/lib";
import { dec, inc } from "ramda";
import type {
	TimingPhase,
	TimingPhaseStep,
} from "../../../../../../../../model";

type Payload = ActionCreatorPayload<typeof openTimingWizardModal>;

type StepNavigation = {
	step: TimingPhaseStep;
	title: BaseModalActionTitle;
};

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

	const step: TimingPhaseStep | null = yield select(selectStep(stepIndex));

	if (!step) {
		return;
	}
	const faction: ReturnType<typeof selectCurrentFaction> =
		yield select(selectCurrentFaction);

	const nextStep: TimingPhaseStep | undefined = yield select(
		selectStep(nextStepIndex),
	);
	const prevStep: TimingPhaseStep | undefined = yield select(
		selectStep(prevStepIndex),
	);

	const data: TimingWizardModalSagaData = {
		faction,
		step,
		phase,
		next: prevStep,
		prev: nextStep,
	};

	return data;
}
