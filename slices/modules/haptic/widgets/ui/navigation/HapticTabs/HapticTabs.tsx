import {
	type RenderTabInfo,
	type TabItem,
	Tabs,
	type TabsProps,
	defaultRenderTab,
} from "@shared/ui";
import { useCallback } from "react";
import { useHapticFeedback } from "../../../../shared/lib";
import type { HapticPatternType } from "../../../../shared/model";
import * as C from "./HapticTabs.components";

export type HapticTabsProps<T extends TabItem> = TabsProps<T> & {
	onSelect?: (item: T) => boolean | void;
	selectHapticPattern?: HapticPatternType;
};

export function HapticTabs<T extends TabItem>({
	onSelect: onSelectProp,
	selectHapticPattern,
	renderTab: renderTabProp = defaultRenderTab,
	...props
}: HapticTabsProps<T>) {
	const impactHapticFeedback = useHapticFeedback(selectHapticPattern);

	const onSelect = useCallback(
		(item: T) => {
			if (!onSelectProp) {
				return;
			}
			const response = onSelectProp?.(item);

			if (response === false) {
				return;
			}
			impactHapticFeedback();
		},
		[impactHapticFeedback, onSelectProp],
	);

	const renderTab = useCallback(
		(info: RenderTabInfo<T>) => {
			return (
				<C.Tab key={info.item.id} onPress={() => onSelect(info.item)}>
					{renderTabProp(info)}
				</C.Tab>
			);
		},
		[onSelect, renderTabProp],
	);

	return <Tabs {...props} renderTab={renderTab} />;
}
