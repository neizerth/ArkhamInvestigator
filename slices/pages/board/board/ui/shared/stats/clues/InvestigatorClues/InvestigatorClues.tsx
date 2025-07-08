import {
	increaseCurrentActualPropValue,
	selectCurrentActualPropValue,
	setCurrentActualPropValue,
} from "@modules/board/base/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import { Clues } from "../Clues";

export type InvestigatorCluesProps = ViewProps;

export const InvestigatorClues = (props: InvestigatorCluesProps) => {
	const dispatch = useAppDispatch();
	const value = useAppSelector(selectCurrentActualPropValue("clues"));
	const onChange = useCallback(
		(value = 0) => {
			dispatch(
				setCurrentActualPropValue({
					prop: "clues",
					value,
				}),
			);
		},
		[dispatch],
	);

	const onLongPress = useCallback(() => {
		dispatch(
			setCurrentActualPropValue({
				prop: "clues",
				value: 0,
			}),
		);
	}, [dispatch]);

	const onPress = useCallback(() => {
		dispatch(
			increaseCurrentActualPropValue({
				prop: "clues",
			}),
		);
	}, [dispatch]);

	return (
		<Clues
			{...props}
			onChange={onChange}
			onLongPress={onLongPress}
			onPress={onPress}
			value={value}
		/>
	);
};
