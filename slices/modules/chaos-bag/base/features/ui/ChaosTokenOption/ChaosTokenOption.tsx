import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import {
	selectCurrentChaosTokenOptionIndex,
	updateChaosTokenOption,
} from "@modules/chaos-bag/effect/entities/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { CheckboxProps } from "@shared/ui";
import { useCallback } from "react";
import type { ViewStyle } from "react-native";
import * as C from "./ChaosTokenOption.components";

export type ChaosTokenOptionProps = Omit<CheckboxProps, "checked" | "data"> & {
	contentContainerStyle?: ViewStyle;
	type: ChaosTokenType;
	index: number;
};

export const ChaosTokenOption = ({
	contentContainerStyle,
	children,
	index,
	type,
	...props
}: ChaosTokenOptionProps) => {
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
		<C.Container style={contentContainerStyle}>
			<C.Control onPress={onPress} checked={checked} {...props}>
				{children}
			</C.Control>
		</C.Container>
	);
};
