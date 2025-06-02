// import * as C from './GlobalClues.components';

import {
	selectClues,
	selectCurrentStatValue,
	selectSyncScenarioClues,
	setClues,
	setSyncScenarioClues,
	updateScenarioClues,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { range } from "ramda";
import { useCallback, useMemo } from "react";
import type { CluesProps } from "../Clues";
import * as C from "./ScenarioClues.components";

export type ScenarioCluesProps = CluesProps;

export const ScenarioClues = ({
	data: dataProp,
	...props
}: ScenarioCluesProps) => {
	const dispatch = useAppDispatch();
	const syncEnabled = useAppSelector(selectSyncScenarioClues);
	const investigatorClues = useAppSelector(selectCurrentStatValue("clues"));
	const value = useAppSelector(selectClues);

	const maxValue = value + investigatorClues;

	const data = useMemo(() => {
		if (!syncEnabled) {
			return dataProp;
		}
		return range(0, maxValue + 1);
	}, [dataProp, syncEnabled, maxValue]);

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
				data={data}
				value={value}
				onChange={onChange}
				onPress={onPress}
				onLongPress={onLongPress}
			/>
		</C.Container>
	);
};
