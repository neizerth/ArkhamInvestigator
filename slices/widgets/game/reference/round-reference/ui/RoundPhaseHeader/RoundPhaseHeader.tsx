import { type TimingPhase, closeTimingPhase } from "@features/game";
import { useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./RoundPhaseHeader.components";

export type RoundPhaseHeaderProps = ViewProps & {
	phase: TimingPhase;
};

export const RoundPhaseHeader = ({
	phase,
	...props
}: RoundPhaseHeaderProps) => {
	const dispatch = useAppDispatch();
	const close = useCallback(() => {
		dispatch(closeTimingPhase(phase.position));
	}, [dispatch, phase.position]);

	return (
		<C.Container {...props} onPress={close}>
			<C.Content>
				<C.Wrapper>
					<C.Title>{phase.title}</C.Title>
				</C.Wrapper>
				<C.Background backgroundColor={"#d5c2a1"} />
			</C.Content>
		</C.Container>
	);
};
