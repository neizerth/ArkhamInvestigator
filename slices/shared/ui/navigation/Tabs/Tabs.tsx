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
};

export type TabsProps<T extends TabItem> = ViewProps & {
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
}: RenderTabInfo<T>) {
	return (
		<C.Tab key={item.id} selected={selected} onPress={onSelect}>
			<C.TabTitle selected={selected}>{item.title}</C.TabTitle>
		</C.Tab>
	);
}

export function Tabs<T extends TabItem>({
	data,
	value,
	renderTab = defaultRenderTab,
	onSelect,
}: TabsProps<T>) {
	return (
		<C.Container>
			{data.map((item, index) =>
				renderTab({
					item,
					index,
					selected: value?.id === item.id,
					onSelect: () => onSelect?.(item),
				}),
			)}
		</C.Container>
	);
}
