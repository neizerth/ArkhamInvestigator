import { propEq } from "ramda";
import { useCallback, useState } from "react";
import type { FlatListProps, ViewToken } from "react-native";
import { useDebounce } from "../../common";

type ViewableItemsCallback<T> = Exclude<
	FlatListProps<T>["onViewableItemsChanged"],
	undefined | null
>;

export function useScrollSpy<T>() {
	const [token, setToken] = useState<ViewToken<T>>();

	const onChangeCallback: ViewableItemsCallback<T> = useCallback(
		(info) => {
			const { viewableItems } = info;
			const [first] = viewableItems.filter(propEq(true, "isViewable"));

			if (token?.index === first.index) {
				return;
			}
			setToken(first);
		},
		[token?.index],
	);

	const onChange = useDebounce(onChangeCallback, 150);

	return [token?.item, onChange] as [T, typeof onChange];
}
