import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import {
	selectCurrentChaosTokenOptionIndex,
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
		selectCurrentChaosTokenOptionIndex({
			boardId: "current",
			type,
		}),
	);
	const checked = selectedIndex === index;
	const onPress = useCallback(() => {
		dispatch(
			updateChaosTokenOption({
				type,
				index,
				boardId: "current",
				selected: !checked,
				source: "ui",
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
