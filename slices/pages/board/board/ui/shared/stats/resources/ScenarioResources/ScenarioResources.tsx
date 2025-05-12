import {
	selectResources,
	setResources,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback } from "react";
import { Resources, type ResourcesProps } from "../Resources";

export type ScenarioResourcesProps = ResourcesProps;

export const ScenarioResources = (props: ScenarioResourcesProps) => {
	const dispatch = useAppDispatch();

	const value = useAppSelector(selectResources);
	const onChange = useCallback(
		(value = 0) => {
			dispatch(setResources(value));
		},
		[dispatch],
	);

	const onPress = useCallback(() => {
		if (value <= 0) {
			return;
		}

		dispatch(setResources(value - 1));
	}, [dispatch, value]);

	const onLongPress = useCallback(() => {
		dispatch(setResources(0));
	}, [dispatch]);

	return (
		<Resources
			{...props}
			value={value}
			onChange={onChange}
			onPress={onPress}
			onLongPress={onLongPress}
		/>
	);
};
