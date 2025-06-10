import { HapticTabs, type HapticTabsProps } from "@modules/haptic/shared/ui";
import { useAppTranslation } from "@modules/i18n/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { AppActionCreator, RootState } from "@shared/model";
import type { TabItem } from "@shared/ui";
import { propEq } from "ramda";
import { useCallback, useMemo } from "react";
import type { Selector } from "react-redux";

export type StoreTabsProps<T extends TabItem> = Omit<
	HapticTabsProps<T>,
	"value"
> & {
	selector: Selector<RootState, string>;
	actionCreator: AppActionCreator<string>;
	translate?: boolean;
	defaultValue?: string;
};

export function StoreTabs<T extends TabItem>({
	actionCreator,
	selector,
	translate = true,
	defaultValue,
	data,
	onSelect,
	...props
}: StoreTabsProps<T>) {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();
	const id = useAppSelector(selector) || defaultValue;

	const onTabSelect = useCallback(
		(item: T) => {
			dispatch(actionCreator(item.id));
			onSelect?.(item);
		},
		[dispatch, actionCreator, onSelect],
	);

	const values = useMemo(() => {
		return data.map((item) => ({
			...item,
			title: translate ? t(item.title) : item.title,
		}));
	}, [data, translate, t]);

	const value = values.find(propEq(id, "id"));

	return (
		<HapticTabs {...props} data={values} value={value} onSelect={onTabSelect} />
	);
}
