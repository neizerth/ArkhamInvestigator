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
	const { id } = phase;

	if (phase.id === "investigation") {
		return null;
	}

	return (
		<C.Container {...props}>
			{!active && id === "mythos" && <C.Doom />}
			{!active && id === "upkeep" && <C.Resources />}
		</C.Container>
	);
};
