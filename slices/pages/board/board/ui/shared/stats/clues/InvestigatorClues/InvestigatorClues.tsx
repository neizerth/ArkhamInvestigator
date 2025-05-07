import {
	decreaseCurrentStat,
	selectCurrentStatValue,
	setCurrentStat,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import { Clues } from "../Clues";

export type InvestigatorCluesProps = ViewProps;

export const InvestigatorClues = (props: InvestigatorCluesProps) => {
	const dispatch = useAppDispatch();
	const value = useAppSelector(selectCurrentStatValue("clues"));
	const onChange = useCallback(
		(value?: number) => {
			dispatch(setCurrentStat("clues", value));
		},
		[dispatch],
	);

	const onLongPress = useCallback(() => {
		dispatch(setCurrentStat("clues", 0));
	}, [dispatch]);

	const onPress = useCallback(() => {
		dispatch(decreaseCurrentStat("clues"));
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
