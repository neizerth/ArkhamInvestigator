import { useBoolean } from "@shared/lib";
import type { ViewProps } from "react-native";
import { phaseColors } from "../../config";
import type { TimingPhase } from "../../model";
import * as C from "./RoundReferencePhase.components";

export type RoundReferencePhaseProps = ViewProps & {
	phase: TimingPhase;
};

export const RoundReferencePhase = ({
	phase,
	...props
}: RoundReferencePhaseProps) => {
	const { position, steps } = phase;
	const backgroundColor = phaseColors[position - 1];
	const [open, setOpen] = useBoolean(false);

	return (
		<C.Container {...props} open={open}>
			<C.Wrapper>
				<C.Content open={open}>
					<C.Toggle onPress={setOpen.toggle}>
						<C.Title open={open}>{phase.title}</C.Title>
						<C.ToggleIcon icon="right-arrow" open={open} />
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
			</C.Wrapper>
		</C.Container>
	);
};
