import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import * as C from "./Tabs.components";

export type TabItem<T = string> = {
	id: T;
	title: string;
};

export type RenderTabInfo<T extends TabItem> = {
	item: T;
	index: number;
	selected: boolean;
	onSelect?: () => void;
	translate?: boolean;
};

export type TabsProps<T extends TabItem> = ViewProps & {
	translate?: boolean;
	tabStyle?: ViewProps["style"];
	renderTab?: (info: RenderTabInfo<T>) => React.ReactNode;
	data: T[];
	value?: T;
	onSelect?: (value: T) => void;
};

export function defaultRenderTab<T extends TabItem>({
	item,
	selected,
	onSelect,
	translate,
}: RenderTabInfo<T>) {
	const { t } = useTranslation();
	const title = translate ? t(item.title) : item.title;

	return (
		<C.Tab key={item.id} selected={selected} onPress={onSelect}>
			<C.TabTitle selected={selected}>{title}</C.TabTitle>
		</C.Tab>
	);
}

export function Tabs<T extends TabItem>({
	data,
	value,
	renderTab = defaultRenderTab,
	onSelect,
	translate = false,
}: TabsProps<T>) {
	return (
		<C.Container>
			{data.map((item, index) =>
				renderTab({
					item,
					index,
					selected: value?.id === item.id,
					onSelect: () => onSelect?.(item),
					translate,
				}),
			)}
		</C.Container>
	);
}
