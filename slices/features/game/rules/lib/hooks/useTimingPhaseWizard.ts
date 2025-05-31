import {
	selectCurrentFaction,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback, useEffect } from "react";
import { useAppTranslation } from "../../../../i18n";
import { useModal } from "../../../../modal";
import {
	goToNextTimingWizardStep as goToNextStep,
	selectNextTimingWizardStep,
	selectTimingWizardActive,
	selectTimingWizardPhase,
	selectTimingWizardStep,
	setTimingWizardActive,
} from "../store";

export const useTimingPhaseWizard = () => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();

	const faction = useAppSelector(selectCurrentFaction);
	const phase = useAppSelector(selectTimingWizardPhase);
	const active = useAppSelector(selectTimingWizardActive);
	const step = useAppSelector(selectTimingWizardStep);
	const nextStep = useAppSelector(selectNextTimingWizardStep);

	const nextType = nextStep?.type;

	const text = step?.text || "";
	const title = phase?.title || "";

	const next = useCallback(() => {
		dispatch(goToNextStep());
		return nextType === "end";
	}, [dispatch, nextType]);

	const [showModal] = useModal({
		id: "timing",
		data: {
			title,
			text,
			type: "faction",
			contentType: "text",
			faction,
			okText: t`Continue`,
			cancelText: t`Close`,
		},
		onOk: next,
	});

	useEffect(() => {
		if (!active) {
			return;
		}
		dispatch(setTimingWizardActive(false));
		showModal();
	}, [dispatch, active, showModal]);
};
