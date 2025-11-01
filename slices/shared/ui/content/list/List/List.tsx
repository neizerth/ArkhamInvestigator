import { Children } from "react";
import type { ViewProps, ViewStyle } from "react-native";
import { v4 } from "uuid";
import * as C from "./List.components";
import { isValidListItem } from "./isValidListItem";

export type ListProps = ViewProps & {
	renderMarker?: (index: number) => React.ReactElement;
	itemContainerStyle?: ViewStyle;
};

const defaultRenderMarker = () => (
	<>
		<C.Bullet />{" "}
	</>
);

export const List = ({
	children,
	itemContainerStyle,
	renderMarker = defaultRenderMarker,
	...props
}: ListProps) => {
	const items = Children.toArray(children).filter(isValidListItem);
	return (
		<C.Container {...props}>
			{items.map((child, index) => (
				<C.ListItem key={v4()} style={itemContainerStyle}>
					<C.ListItemContent>
						{renderMarker(index)}
						{child}
					</C.ListItemContent>
				</C.ListItem>
			))}
		</C.Container>
	);
};

List.Item = C.Item;
