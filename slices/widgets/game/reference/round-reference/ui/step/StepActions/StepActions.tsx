import { resetUpkeepAllInvestigatorActions } from "@features/game/phase/lib/store/effects/upkeep";
import { useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./StepActions.components";

export type StepActionsProps = ViewProps;

export const StepActions = (props: StepActionsProps) => {
	const dispatch = useAppDispatch();

	const resetActions = useCallback(() => {
		dispatch(resetUpkeepAllInvestigatorActions());
	}, [dispatch]);

	return (
		<C.Container {...props} onPress={resetActions}>
			<C.Icon icon="action" />
		</C.Container>
	);
};
