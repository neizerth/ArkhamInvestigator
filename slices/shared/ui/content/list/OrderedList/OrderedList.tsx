import { List, type ListProps } from "../List";
import { ListMarker } from "../ListMarker";

export type UnorderedListProps = ListProps;

const renderMarker = (index: number) => <ListMarker>{index + 1}</ListMarker>;

export const OrderedList = (props: UnorderedListProps) => {
	return <List {...props} renderMarker={renderMarker} />;
};
