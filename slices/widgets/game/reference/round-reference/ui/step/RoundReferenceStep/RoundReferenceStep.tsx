import type { TimingPhaseStep } from "@modules/mechanics/rules/round-timing/shared/model";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./RoundReferenceStep.components";

export type RoundReferenceStepProps = ViewProps & {
	step: TimingPhaseStep;
	onPress?: (index: number) => void;
};

export const RoundReferenceStep = ({
	step,
	onPress,
	...props
}: RoundReferenceStepProps) => {
	const handlePress = useCallback(() => {
		if (!onPress) {
			return false;
		}
		onPress(step.index);
	}, [onPress, step.index]);

	return (
		<C.Container {...props}>
			{step.type === "end" ? (
				<C.StepContent step={step} />
			) : (
				<C.StepButton onPress={handlePress}>
					<C.StepContent step={step} />
				</C.StepButton>
			)}
			{step.color && <C.StepBackground backgroundColor={step.color} />}
		</C.Container>
	);
};
