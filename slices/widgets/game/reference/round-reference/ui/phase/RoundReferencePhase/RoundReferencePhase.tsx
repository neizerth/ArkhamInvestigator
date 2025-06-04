import { type TimingPhase, startTimingWizard } from "@features/game/rules";
import { roundPhaseColors } from "@features/game/rules/config";
import { useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
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
	const dispatch = useAppDispatch();
	const { position, steps } = phase;
	const backgroundColor = roundPhaseColors[position - 1];

	const toggle = open ? onClose : onOpen;

	const play = useCallback(() => {
		dispatch(startTimingWizard(phase.id));
	}, [dispatch, phase.id]);

	const playStep = useCallback(
		(stepIndex: number) => () => {
			dispatch(startTimingWizard(phase.id, stepIndex));
		},
		[dispatch, phase.id],
	);

	return (
		<C.Container {...props} open={open}>
			<C.Wrapper>
				<C.Content open={open}>
					<C.Header>
						<C.PlayIcon icon="play2" onPress={play} />
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
										{step.type === "end" ? (
											<C.StepContent step={step} />
										) : (
											<C.StepButton onPress={playStep(step.index)}>
												<C.StepContent step={step} />
											</C.StepButton>
										)}
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
