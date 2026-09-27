import { useCallback, useState } from "react";
import type { FlatListProps, ViewabilityConfig } from "react-native";

type ViewableItemsCallback<T> = Exclude<
	FlatListProps<T>["onViewableItemsChanged"],
	undefined | null
>;

// must be a stable reference: FlatList does not support changing it on the fly
const viewabilityConfig: ViewabilityConfig = {
	minimumViewTime: 100,
	itemVisiblePercentThreshold: 10,
};

export function useScrollSpy<T>() {
	const [item, setItem] = useState<T>();

	// no deps on state: callback identity stays stable, setState bails out on same item
	const onChange: ViewableItemsCallback<T> = useCallback(
		({ viewableItems }) => {
			const first = viewableItems.find((token) => token.isViewable);

			if (!first) {
				return;
			}
			setItem(first.item);
		},
		[],
	);

	return [item, onChange, viewabilityConfig] as [
		T,
		typeof onChange,
		typeof viewabilityConfig,
	];
}
