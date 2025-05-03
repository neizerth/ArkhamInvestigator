import { useHapticFeedback } from "@features/haptic";
import {
	selectAvailableFactions,
	selectCurrentFaction,
	selectShowFactionSelect,
	setBoardProp,
	setShowFactionSelect,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { Faction } from "@shared/model";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./FactionSelect.components";

export type FactionSelectProps = ViewProps;

export const FactionSelect = (props: FactionSelectProps) => {
	const dispatch = useAppDispatch();
	const factions = useAppSelector(selectAvailableFactions);
	const selected = useAppSelector(selectCurrentFaction);
	const impactFeedback = useHapticFeedback("clockTick");

	const hide = useCallback(() => {
		dispatch(setShowFactionSelect(false));
		impactFeedback();
	}, [dispatch, impactFeedback]);

	const onPress = useCallback(
		(faction: Faction) => () => {
			dispatch(setShowFactionSelect(false));
			dispatch(setBoardProp("currentRole", faction));
		},
		[dispatch],
	);

	return (
		<C.Modal {...props} selector={selectShowFactionSelect} onClose={hide}>
			{factions.map((faction) => (
				<C.Button
					key={faction}
					faction={faction}
					selected={selected === faction}
					onPress={onPress(faction)}
				/>
			))}
		</C.Modal>
	);
};
