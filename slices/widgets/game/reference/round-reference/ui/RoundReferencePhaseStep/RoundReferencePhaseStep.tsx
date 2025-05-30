import { selectCurrentLanguage } from "@features/i18n";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import type { TimingPhaseStep } from "../../model";
import * as C from "./RoundReferencePhaseStep.components";
import { getStepTextComponents } from "./RoundReferencePhaseStep.style";

export type RoundReferencePhaseStepProps = ViewProps & {
	step: TimingPhaseStep;
};

export const RoundReferencePhaseStep = ({
	step,
	...props
}: RoundReferencePhaseStepProps) => {
	const language = useAppSelector(selectCurrentLanguage);
	const componentStyles = getStepTextComponents(language);

	const Container = step.type === "end" ? C.End : C.Container;

	return (
		<Container {...props}>
			<C.Text value={step.text} componentStyles={componentStyles} />
		</Container>
	);
};
