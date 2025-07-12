import type {
	TimingPhaseId,
	TimingPhaseStep,
} from "../../../../../../../../model";
import { timingWizardModalActionId as id } from "../config";
import type { TimingWizardModalAction as ModalAction } from "../model";
import { getPhaseStepTitle } from "./getPhaseStepTitle";

type GetPhaseStepModalActionOptions = {
	type: "prev" | "next";
	phaseId: TimingPhaseId;
	step?: TimingPhaseStep;
};

const actionIcon = {
	prev: "left-arrow",
	next: "right-arrow",
};

export const getPhaseStepModalAction = ({
	phaseId,
	step,
	type,
}: GetPhaseStepModalActionOptions): ModalAction => {
	const isStart = !step?.index;
	const isEnd = step?.type === "end";

	const baseAction = {
		id,
		type: "custom" as const,
		phaseId,
	};

	if (isStart) {
		return {
			...baseAction,
			title: "Close",
			icon: "dismiss",
			close: true,
		};
	}

	if (isEnd) {
		return {
			...baseAction,
			title: "Phase end",
			icon: "check",
			close: true,
		};
	}

	const title = step ? getPhaseStepTitle(step) : "???";
	const icon = actionIcon[type];

	return {
		...baseAction,
		title,
		icon,
		step,
	};
};
