import type { ViewProps } from "react-native";
import type { TimingPhase } from "../../model";

import { selectCurrentLanguage } from "@features/i18n";
import { useAppSelector } from "@shared/lib";
import { phaseColors } from "../../config";
import * as C from "./RoundReferencePhase.components";

export type RoundReferencePhaseProps = ViewProps & {
	phase: TimingPhase;
	open?: boolean;
};

export const RoundReferencePhase = ({
	phase,
	open = true,
	...props
}: RoundReferencePhaseProps) => {
	const language = useAppSelector(selectCurrentLanguage);

	const { position, steps } = phase;
	const backgroundColor = phaseColors[position - 1];

	return (
		<C.Container {...props}>
			<C.Content open={open}>
				<C.Toggle>
					<C.Title>{phase.title}</C.Title>
				</C.Toggle>
				{open && (
					<C.Steps>
						{steps.map((step) => (
							<C.Step key={step.id}>
								<C.StepContent step={step} />
								{step.color && (
									<C.StepBackground backgroundColor={step.color} />
								)}
							</C.Step>
						))}
					</C.Steps>
				)}
			</C.Content>
			<C.Background backgroundColor={backgroundColor} open={open} />
		</C.Container>
	);
};
