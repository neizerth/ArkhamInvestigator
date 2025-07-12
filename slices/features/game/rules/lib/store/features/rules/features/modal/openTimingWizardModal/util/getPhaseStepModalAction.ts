import { createCustomModalAction } from "@modules/core/modal/shared/actions/custom/base/lib";
import type { TimingPhaseStep } from "../../../../../../../../model";
import { TimingWizardModalActionId } from "../config";
import type { TimingWizardModalAction as ModalAction } from "../model";
import { getPhaseStepTitle } from "./getPhaseStepTitle";

type GetPhaseStepModalActionOptions = {
	type: "prev" | "next";
	step?: TimingPhaseStep;
};

const actionIcon = {
	prev: "left-arrow",
	next: "right-arrow",
};

export const getPhaseStepModalAction = ({
	step,
	type,
}: GetPhaseStepModalActionOptions): ModalAction => {
	const isStart = !step?.index;
	const isEnd = step?.type === "end";

	const id = TimingWizardModalActionId[type];

	if (isStart) {
		return createCustomModalAction<ModalAction>({
			id,
			title: "Close",
			icon: "dismiss",
			step,
		});
	}

	if (isEnd) {
		createCustomModalAction<ModalAction>({
			id,
			title: "Close",
			icon: "dismiss",
			step,
		});
	}

	const title = step ? getPhaseStepTitle(step) : "???";
	const icon = actionIcon[type];

	return createCustomModalAction<ModalAction>({
		id,
		title,
		icon,
		step,
	});
};
