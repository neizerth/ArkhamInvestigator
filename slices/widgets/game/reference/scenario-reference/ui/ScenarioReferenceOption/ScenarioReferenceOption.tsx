import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import {
	selectCurrentChaosTokenIndex,
	updateChaosTokenOption,
} from "@modules/chaos-bag/effect/entities/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./ScenarioReferenceOption.components";

export type ScenarioReferenceOptionProps = ViewProps & {
	type: ChaosTokenType;
	index: number;
};

export const ScenarioReferenceOption = ({
	children,
	index,
	type,
	...props
}: ScenarioReferenceOptionProps) => {
	const dispatch = useAppDispatch();
	const selectedIndex = useAppSelector(
		selectCurrentChaosTokenIndex({
			boardId: "current",
			type,
		}),
	);
	const checked = selectedIndex === index;
	const onPress = useCallback(() => {
		dispatch(
			updateChaosTokenOption({
				boardId: "current",
				type,
				index,
				selected: !checked,
			}),
		);
	}, [dispatch, index, type, checked]);

	return (
		<C.Container {...props}>
			<C.Control onPress={onPress} checked={checked}>
				{children}
			</C.Control>
		</C.Container>
	);
};
