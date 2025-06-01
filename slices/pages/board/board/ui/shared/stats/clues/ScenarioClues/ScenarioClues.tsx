// import * as C from './GlobalClues.components';

import {
	selectClues,
	selectSyncScenarioClues,
	setClues,
	setSyncScenarioClues,
	updateScenarioClues,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback } from "react";
import type { CluesProps } from "../Clues";
import * as C from "./ScenarioClues.components";

export type ScenarioCluesProps = CluesProps;

export const ScenarioClues = (props: ScenarioCluesProps) => {
	const dispatch = useAppDispatch();
	const syncEnabled = useAppSelector(selectSyncScenarioClues);

	const value = useAppSelector(selectClues);
	const onChange = useCallback(
		(value = 0) => {
			dispatch(updateScenarioClues(value));
		},
		[dispatch],
	);

	const onPress = useCallback(() => {
		dispatch(updateScenarioClues(value + 1));
	}, [dispatch, value]);

	const onLongPress = useCallback(() => {
		dispatch(setClues(0));
	}, [dispatch]);

	const toggleSync = useCallback(() => {
		dispatch(setSyncScenarioClues(!syncEnabled));
	}, [dispatch, syncEnabled]);

	const lockIcon = syncEnabled ? "icomoonfree-lock" : "unlocked";

	return (
		<C.Container>
			<C.Lock icon={lockIcon} enabled={syncEnabled} onPress={toggleSync} />
			<C.Control
				{...props}
				value={value}
				onChange={onChange}
				onPress={onPress}
				onLongPress={onLongPress}
			/>
		</C.Container>
	);
};
