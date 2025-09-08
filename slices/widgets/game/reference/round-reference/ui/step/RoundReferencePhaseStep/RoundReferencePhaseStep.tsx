import { selectCurrentLanguage } from "@modules/core/i18n/shared/lib";
import type { TimingPhaseStep } from "@modules/mechanics/rules/round-timing/shared/model";
import { useAppSelector } from "@shared/lib";
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
	const { index, phaseId } = step;

	const language = useAppSelector(selectCurrentLanguage);
	const componentStyles = getStepTextComponents({
		language,
		type: step.type,
	});

	return (
		<C.Container {...props}>
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
