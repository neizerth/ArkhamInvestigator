// import * as C from './GlobalClues.components';

import {
	selectClues,
	setClues,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback } from "react";
import { Clues, type CluesProps } from "../Clues";

export type ScenarioCluesProps = CluesProps;

export const ScenarioClues = (props: ScenarioCluesProps) => {
	const dispatch = useAppDispatch();

	const value = useAppSelector(selectClues);
	const onChange = useCallback(
		(value = 0) => {
			dispatch(setClues(value));
		},
		[dispatch],
	);

	const onPress = useCallback(() => {
		dispatch(setClues(value + 1));
	}, [dispatch, value]);

	const onLongPress = useCallback(() => {
		dispatch(setClues(0));
	}, [dispatch]);

	return (
		<Clues
			{...props}
			value={value}
			onChange={onChange}
			onPress={onPress}
			onLongPress={onLongPress}
		/>
	);
};
