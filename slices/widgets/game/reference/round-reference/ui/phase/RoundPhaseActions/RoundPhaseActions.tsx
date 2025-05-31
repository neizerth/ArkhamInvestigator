import type { TimingPhase } from "@features/game";
import type { ViewProps } from "react-native";
import * as C from "./RoundPhaseActions.components";

export type RoundPhaseActionsProps = ViewProps & {
	phase: TimingPhase;
	active?: boolean;
};

export const RoundPhaseActions = ({
	phase,
	active,
	...props
}: RoundPhaseActionsProps) => {
	const { type } = phase;

	if (phase.type === "investigation") {
		return null;
	}

	return (
		<C.Container {...props}>
			{!active && type === "mythos" && <C.Doom />}
			{!active && type === "upkeep" && <C.Resources />}
		</C.Container>
	);
};
