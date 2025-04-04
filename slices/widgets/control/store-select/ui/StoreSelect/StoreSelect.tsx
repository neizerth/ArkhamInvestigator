import type { HapticSelectProps } from "@features/haptic";
import { useAppTranslation } from "@features/i18n";
import type { ActionCreatorWithPayload, Selector } from "@reduxjs/toolkit";
import {
	type AppThunk,
	type RootState,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { SelectItem } from "@shared/ui";
import { propEq } from "ramda";
import { useCallback } from "react";
import type { ViewStyle } from "react-native";
import * as C from "./StoreSelect.components";

export type StoreSelectProps<T> = Omit<
	HapticSelectProps<T>,
	"onChange" | "value"
> & {
	selectStyle?: ViewStyle;
	selector: Selector<RootState, T>;
	actionCreator: ActionCreatorWithPayload<T> | ((value: T) => AppThunk);
	translate?: boolean;
	label?: string;
};

export function StoreSelect<T>({
	selector,
	actionCreator,
	data,
	translate = true,
	selectStyle,
	style,
	...props
}: StoreSelectProps<T>) {
	const { t } = useAppTranslation();
	const dispatch = useAppDispatch();
	const value = useAppSelector(selector);

	const items = data.map((item) => ({
		...item,
		label: translate ? t(item.label) : item.label,
	}));
	const item = items.find(propEq(value, "value"));

	const onChange = useCallback(
		({ value }: SelectItem<T>) => {
			dispatch(actionCreator(value));
		},
		[dispatch, actionCreator],
	);

	const label = translate ? t(props.label || "") : props.label;

	return (
		<C.Container style={style}>
			<C.Label>{label}</C.Label>
			<C.Select
				{...props}
				style={selectStyle}
				data={items}
				value={item}
				onChange={onChange}
			/>
		</C.Container>
	);
}
