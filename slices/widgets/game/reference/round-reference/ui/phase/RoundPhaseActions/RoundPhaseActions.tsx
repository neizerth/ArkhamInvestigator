import {
	giveUpkeepResourcesToAllBoards,
	resetUpkeepAllInvestigatorActions,
} from "@modules/mechanics/phase/features/lib";
import type { TimingPhase } from "@modules/mechanics/rules/round-timing/shared/model";
import { useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
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
	const dispatch = useAppDispatch();
	const { id } = phase;

	const processUpkeep = useCallback(() => {
		dispatch(resetUpkeepAllInvestigatorActions());
		dispatch(giveUpkeepResourcesToAllBoards());
	}, [dispatch]);

	if (phase.id === "investigation") {
		return null;
	}

	return (
		<C.Container {...props}>
			{!active && id === "mythos" && <C.Doom />}
			{!active && id === "upkeep" && (
				<C.UpkeepControl icon="spinner11" onPress={processUpkeep} />
			)}
		</C.Container>
	);
};
