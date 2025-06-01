import { type TimingPhaseStep, startTimingWizard } from "@features/game";
import { selectCurrentLanguage } from "@features/i18n";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./RoundReferencePhaseStep.components";
import { getStepTextComponents } from "./RoundReferencePhaseStep.style";

export type RoundReferencePhaseStepProps = ViewProps & {
	step: TimingPhaseStep;
};

export const RoundReferencePhaseStep = ({
	step,
	...props
}: RoundReferencePhaseStepProps) => {
	const dispatch = useAppDispatch();
	const { index, phaseId } = step;

	const language = useAppSelector(selectCurrentLanguage);
	const componentStyles = getStepTextComponents({
		language,
		type: step.type,
	});

	const play = useCallback(() => {
		dispatch(startTimingWizard(phaseId, index));
	}, [dispatch, index, phaseId]);

	return (
		<C.Container {...props} onPress={play}>
			<C.Text
				value={step.text}
				end={step.type === "end"}
				componentStyles={componentStyles}
			/>
			{step.specialType === "mythos-doom" && <C.Doom />}
			{step.specialType === "upkeep-resource" && <C.Resources />}
			{step.specialType === "reset-actions" && <C.Actions />}
		</C.Container>
	);
};
