import { roundPhaseColors } from "@modules/mechanics/rules/base/shared/config";
import { startTimingWizard } from "@modules/mechanics/rules/round-timing/shared/lib";
import type { TimingPhase } from "@modules/mechanics/rules/round-timing/shared/model";
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
		dispatch(
			startTimingWizard({
				phaseId: phase.id,
			}),
		);
	}, [dispatch, phase.id]);

	const playStep = useCallback(
		(stepIndex: number) => {
			dispatch(
				startTimingWizard({
					phaseId: phase.id,
					stepIndex,
				}),
			);
		},
		[dispatch, phase.id],
	);

	return (
		<C.Container {...props} open={open}>
			<C.Wrapper>
				<C.Content open={open}>
					<C.Header
						onToggle={toggle}
						before={<C.PlayIcon icon="play2" onPress={play} />}
						after={<C.Actions phase={phase} active={open} />}
						open={open}
					>
						{phase.title}
					</C.Header>
					{open && (
						<C.Details>
							{phase.hint && <C.Hint>{phase.hint}</C.Hint>}
							<C.Steps>
								{steps.map((step) => (
									<C.Step key={step.id} step={step} onPress={playStep} />
								))}
							</C.Steps>
						</C.Details>
					)}
				</C.Content>
				<C.PhaseBackground backgroundColor={backgroundColor} open={open} />
			</C.Wrapper>
		</C.Container>
	);
};
