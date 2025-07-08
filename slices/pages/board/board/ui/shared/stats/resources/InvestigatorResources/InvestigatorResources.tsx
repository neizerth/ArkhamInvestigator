import {
	decreaseCurrentActualPropValue,
	selectCurrentActualPropValue,
	setCurrentActualPropValue,
} from "@modules/board/base/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import { Resources } from "../Resources";

export type InvestigatorResourcesProps = ViewProps;

export const InvestigatorResources = (props: InvestigatorResourcesProps) => {
	const dispatch = useAppDispatch();

	const value = useAppSelector(selectCurrentActualPropValue("resources"));
	const onChange = useCallback(
		(value = 0) => {
			dispatch(
				setCurrentActualPropValue({
					prop: "resources",
					value,
				}),
			);
		},
		[dispatch],
	);

	const onLongPress = useCallback(() => {
		dispatch(
			setCurrentActualPropValue({
				prop: "resources",
				value: 0,
			}),
		);
	}, [dispatch]);

	const onPress = useCallback(() => {
		dispatch(
			decreaseCurrentActualPropValue({
				prop: "resources",
				value: 0,
			}),
		);
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
