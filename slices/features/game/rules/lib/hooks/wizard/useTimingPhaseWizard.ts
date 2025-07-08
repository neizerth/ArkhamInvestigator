import { useModal } from "@modules/core/modal/shared/lib";
import { selectCurrentFaction } from "@modules/mechanics/board/base/entities/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback, useEffect } from "react";
import {
	goToNextTimingWizardStep as goToNextStep,
	goToPrevTimingWizardStep as goToPrevStep,
	processCurrentTimingWizardStep as processStep,
	selectNextTimingWizardStep,
	selectTimingWizardActive,
	selectTimingWizardPhase,
	selectTimingWizardStep,
	setTimingWizardActive,
} from "../../store";
import { usePhaseStepName } from "../usePhaseStepName";
import { useTimingWizardButtons } from "./useTimingWizardButtons";

export const useTimingPhaseWizard = () => {
	const dispatch = useAppDispatch();

	const faction = useAppSelector(selectCurrentFaction);
	const phase = useAppSelector(selectTimingWizardPhase);
	const active = useAppSelector(selectTimingWizardActive);
	const step = useAppSelector(selectTimingWizardStep);
	const nextStep = useAppSelector(selectNextTimingWizardStep);

	const modalButtonData = useTimingWizardButtons();

	const subtitle = usePhaseStepName(step);

	const nextType = nextStep?.type;

	const text = step?.text || "";
	const title = phase?.title || "";

	const isStart = !step?.index;

	const next = useCallback(() => {
		dispatch(processStep());
		dispatch(goToNextStep());
		return nextType === "end";
	}, [dispatch, nextType]);

	const prev = useCallback(() => {
		if (isStart) {
			return;
		}
		dispatch(goToPrevStep());
		return false;
	}, [dispatch, isStart]);

	const [showModal] = useModal({
		id: "timing",
		data: {
			...modalButtonData,
			title,
			subtitle,
			text,
			faction,
			type: "faction",
			contentType: "text",
		},
		onOk: next,
		onCancel: prev,
	});

	useEffect(() => {
		if (!active) {
			return;
		}
		dispatch(setTimingWizardActive(false));
		showModal();
	}, [dispatch, active, showModal]);
};
