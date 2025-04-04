import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";

type Options = {
	afterLoad?: () => void;
};
// biome-ignore lint/complexity/noBannedTypes: we're relying on useCallback
export const usePageLoader = <T extends Function>(
	callback: T,
	{ afterLoad }: Options = {},
) => {
	const loading = useRef(false);

	useFocusEffect(() => {
		loading.current = false;
	});

	// @ts-ignore
	const action = useCallback(
		// @ts-ignore
		(...args: Parameters<T>) => {
			if (loading.current) {
				return;
			}
			loading.current = true;
			afterLoad?.();
			return callback(...args);
		},
		[callback, afterLoad],
	);

	return [action, loading] as [typeof action, typeof loading];
};
