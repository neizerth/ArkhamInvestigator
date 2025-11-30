import { selectCurrentLanguage } from "@modules/core/i18n/shared/lib";
import type { TimingPhaseStep } from "@modules/mechanics/rules/round-timing/shared/model";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./RoundReferenceStepContent.components";
import { getStepTextComponents } from "./RoundReferenceStepContent.style";

export type RoundReferenceStepContentProps = ViewProps & {
	step: TimingPhaseStep;
};

export const RoundReferenceStepContent = ({
	step,
	...props
}: RoundReferenceStepContentProps) => {
	const language = useAppSelector(selectCurrentLanguage);
	const componentStyles = getStepTextComponents({
		language,
		type: step.type,
	});

	return (
		<C.Container {...props}>
			<C.Text
				value={step.title}
				end={step.type === "end"}
				componentStyles={componentStyles}
			/>
			{step.specialType === "mythos-doom" && <C.Doom />}
			{step.specialType === "upkeep-resource" && <C.Resources />}
			{step.specialType === "reset-actions" && <C.Actions />}
		</C.Container>
	);
};
