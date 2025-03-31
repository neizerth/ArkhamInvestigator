import { HapticSelect, type HapticSelectProps } from "@features/haptic";
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

export type StoreSelectProps<T> = Omit<
	HapticSelectProps<T>,
	"onChange" | "value"
> & {
	selector: Selector<RootState, T>;
	reducer: ActionCreatorWithPayload<T> | ((value: T) => AppThunk);
	translate?: boolean;
};

export function StoreSelect<T>({
	selector,
	reducer,
	data,
	translate = true,
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
			dispatch(reducer(value));
		},
		[dispatch, reducer],
	);

	return (
		<HapticSelect {...props} data={items} value={item} onChange={onChange} />
	);
}
