import type { TimingPhase } from "@features/game";
import { roundPhaseColors } from "@features/game/rules/config";
import type { ViewProps } from "react-native";
import * as C from "./RoundReferencePhase.components";

export type RoundReferencePhaseProps = ViewProps & {
	phase: TimingPhase;
	open?: boolean;
	onOpen?: () => void;
	onClose?: () => void;
};

export const RoundReferencePhase = ({
	phase,
	open = false,
	onOpen,
	onClose,
	...props
}: RoundReferencePhaseProps) => {
	const { position, steps } = phase;
	const backgroundColor = roundPhaseColors[position - 1];

	const toggle = open ? onClose : onOpen;

	return (
		<C.Container {...props} open={open}>
			<C.Wrapper>
				<C.Content open={open}>
					<C.Header>
						<C.Toggle onPress={toggle}>
							<C.Title open={open}>{phase.title}</C.Title>
							<C.ToggleIcon icon="right-arrow" open={open} />
						</C.Toggle>
						<C.Actions phase={phase} active={open} />
					</C.Header>
					{open && (
						<C.Details>
							{phase.hint && <C.Hint>{phase.hint}</C.Hint>}
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
						</C.Details>
					)}
				</C.Content>
				<C.Background backgroundColor={backgroundColor} open={open} />
			</C.Wrapper>
		</C.Container>
	);
};
