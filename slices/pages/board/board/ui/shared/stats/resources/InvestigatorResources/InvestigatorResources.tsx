import {
	decreaseCurrentStat,
	selectCurrentStatValue,
	setCurrentStat,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import { Resources } from "../Resources";

export type InvestigatorResourcesProps = ViewProps;

export const InvestigatorResources = (props: InvestigatorResourcesProps) => {
	const dispatch = useAppDispatch();

	const value = useAppSelector(selectCurrentStatValue("resources"));
	const onChange = useCallback(
		(value = 0) => {
			dispatch(setCurrentStat("resources", value));
		},
		[dispatch],
	);

	const onLongPress = useCallback(() => {
		dispatch(setCurrentStat("resources", 0));
	}, [dispatch]);

	const onPress = useCallback(() => {
		dispatch(decreaseCurrentStat("resources", 0));
	}, [dispatch]);

	return (
		<Resources
			{...props}
			value={value}
			onPress={onPress}
			onChange={onChange}
			onLongPress={onLongPress}
		/>
	);
};
