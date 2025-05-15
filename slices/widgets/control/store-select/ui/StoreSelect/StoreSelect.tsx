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

type Item<T> = SelectItem<T> & {
	hint?: string;
};

export type StoreSelectProps<T> = Omit<
	HapticSelectProps<T>,
	"onChange" | "value" | "data"
> & {
	data: Item<T>[];
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
	const hint = item?.hint && t(item.hint);

	return (
		<C.Container style={contentContainerStyle}>
			<C.Group>
				<C.Label>{label}</C.Label>
				<C.Select
					placeholder={t`Select Item`}
					{...props}
					data={items}
					value={item}
					onChange={onChange}
				/>
			</C.Group>
			{hint && <C.Hint>{hint}</C.Hint>}
		</C.Container>
	);
}
