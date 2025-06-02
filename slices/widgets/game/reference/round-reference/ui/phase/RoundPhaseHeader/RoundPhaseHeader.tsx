import type { TimingPhase } from "@features/game/rules";
import type { TouchableOpacityProps } from "@features/haptic";
import * as C from "./RoundPhaseHeader.components";

export type RoundPhaseHeaderProps = TouchableOpacityProps & {
	phase: TimingPhase;
};

export const RoundPhaseHeader = ({
	phase,
	...props
}: RoundPhaseHeaderProps) => {
	return (
		<C.Container {...props}>
			<C.Content>
				<C.Wrapper>
					<C.Title>{phase.title}</C.Title>
				</C.Wrapper>
				<C.Background backgroundColor={"#d5c2a1"} />
			</C.Content>
		</C.Container>
	);
};
