import { useHapticFeedback } from "@features/haptic";
import {
	selectAvailableFactions,
	selectCurrentFaction,
	selectShowFactionSelect,
	setCurrentBoardProp,
	setShowFactionSelect,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { Faction } from "@shared/model";
import { Outside } from "@shared/ui";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./FactionSelect.components";

export type FactionSelectProps = ViewProps;

export const FactionSelect = (props: FactionSelectProps) => {
	const dispatch = useAppDispatch();
	const display = useAppSelector(selectShowFactionSelect);
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
			dispatch(setCurrentBoardProp("currentRole", faction));
		},
		[dispatch],
	);

	if (!display) {
		return null;
	}

	return (
		<C.Container {...props}>
			<Outside onPress={hide} />
			<C.Content>
				{factions.map((faction) => (
					<C.Button
						key={faction}
						faction={faction}
						selected={selected === faction}
						onPress={onPress(faction)}
					/>
				))}
			</C.Content>
		</C.Container>
	);
};
