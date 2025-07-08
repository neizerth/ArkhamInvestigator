// import * as C from './GlobalClues.components';

import {
	selectClues,
	selectCurrentActualPropValue,
	selectSyncScenarioClues,
	setClues,
} from "@modules/board/base/shared/lib";
import { setScenarioClues } from "@modules/mechanics/board/base/entities/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
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
	const investigatorClues = useAppSelector(
		selectCurrentActualPropValue("clues"),
	);
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
			dispatch(
				setScenarioClues({
					boardId: "current",
					value,
				}),
			);
		},
		[dispatch],
	);

	const onPress = useCallback(() => {
		dispatch(
			setScenarioClues({
				boardId: "current",
				value: value + 1,
			}),
		);
	}, [dispatch, value]);

	const onLongPress = useCallback(() => {
		dispatch(setClues(0));
	}, [dispatch]);

	return (
		<C.Container>
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
