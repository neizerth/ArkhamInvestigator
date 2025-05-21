import type { ViewProps } from "react-native";
import * as C from "./Tabs.components";

export type TabItem = {
	id: string;
	title: string;
};

export type RenderTabInfo<T extends TabItem> = {
	item: T;
	index: number;
	selected: boolean;
};

export type TabsProps<T extends TabItem> = ViewProps & {
	tabStyle?: ViewProps["style"];
	renderTab?: (info: RenderTabInfo<T>) => React.ReactNode;
	data: T[];
	value?: T;
};

export function defaultRenderTab<T extends TabItem>({
	item,
	selected,
}: RenderTabInfo<T>) {
	return (
		<C.Tab key={item.id} selected={selected}>
			<C.TabTitle selected={selected}>{item.title}</C.TabTitle>
		</C.Tab>
	);
}

export function Tabs<T extends TabItem>({
	data,
	value,
	renderTab = defaultRenderTab,
}: TabsProps<T>) {
	return (
		<C.Container>
			{data.map((item, index) =>
				renderTab({
					item,
					index,
					selected: value?.id === item.id,
				}),
			)}
		</C.Container>
	);
}
