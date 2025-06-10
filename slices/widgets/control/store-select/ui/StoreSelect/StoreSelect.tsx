import type { HapticSelectProps } from "@modules/haptic/widgets";
import { useAppTranslation } from "@modules/i18n/shared/lib";
import type { Selector } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { AppActionCreator, RootState } from "@shared/model";
import type { SelectItem } from "@shared/ui";
import { useCallback } from "react";
import * as C from "./StoreSelect.components";

export type StoreSelectProps<T> = Omit<
	HapticSelectProps<T>,
	"onChange" | "value"
> & {
	selector: Selector<RootState, T>;
	actionCreator: AppActionCreator<T>;
	translate?: boolean;
};

export function StoreSelect<T>({
	selector,
	actionCreator,
	data,
	label: labelProp = "",
	translate = true,
	...props
}: StoreSelectProps<T>) {
	const { t } = useAppTranslation();
	const dispatch = useAppDispatch();
	const value = useAppSelector(selector);

	const items = data.map((item) => ({
		...item,
		label: translate ? t(item.label) : item.label,
		hint: translate && item.hint ? t(item.hint) : item.hint,
	}));

	const onChange = useCallback(
		({ value }: SelectItem<T>) => {
			dispatch(actionCreator(value));
		},
		[dispatch, actionCreator],
	);

	const label = translate ? t(labelProp) : labelProp;

	return (
		<C.Select
			placeholder={t`Choose an option`}
			{...props}
			data={items}
			value={value}
			label={label}
			onChange={onChange}
		/>
	);
}
