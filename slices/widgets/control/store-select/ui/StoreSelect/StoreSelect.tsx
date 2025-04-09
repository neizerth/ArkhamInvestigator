import type { HapticSelectProps } from "@features/haptic";
import { useAppTranslation } from "@features/i18n";
import type { ActionCreatorWithPayload, Selector } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { AppThunk, RootState } from "@shared/model";
import type { SelectItem } from "@shared/ui";
import { propEq } from "ramda";
import { useCallback } from "react";
import type { ViewStyle } from "react-native";
import * as C from "./StoreSelect.components";

export type StoreSelectProps<T> = Omit<
	HapticSelectProps<T>,
	"onChange" | "value"
> & {
	contentContainerStyle?: ViewStyle;
	selector: Selector<RootState, T>;
	actionCreator: ActionCreatorWithPayload<T> | ((value: T) => AppThunk);
	translate?: boolean;
	label?: string;
};

export function StoreSelect<T>({
	selector,
	actionCreator,
	data,
	label: labelProp = "",
	translate = true,
	contentContainerStyle,
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

	const label = translate ? t(labelProp) : labelProp;

	return (
		<C.Container style={contentContainerStyle}>
			<C.Label>{label}</C.Label>
			<C.Select {...props} data={items} value={item} onChange={onChange} />
		</C.Container>
	);
}
