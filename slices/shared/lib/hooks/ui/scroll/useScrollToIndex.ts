import { useCallback } from "react";
import type { FlatList } from "react-native";

type Options = {
	index: number;
	ref?: React.RefObject<FlatList>;
	animated?: boolean;
};
export const useScrollToIndex = ({ ref, index, animated = false }: Options) => {
	return useCallback(() => {
		if (index < 0) {
			return;
		}

		ref?.current?.scrollToIndex({
			index,
			animated,
		});
	}, [index, ref, animated]);
};
