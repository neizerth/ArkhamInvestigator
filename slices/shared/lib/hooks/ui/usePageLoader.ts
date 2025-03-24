import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";

// biome-ignore lint/complexity/noBannedTypes: we're relying on useCallback
export const usePageLoader = <T extends Function>(callback: T): T => {
	const loading = useRef(false);

	useFocusEffect(() => {
		loading.current = false;
	});

	// @ts-ignore
	return useCallback(
		// @ts-ignore
		(...args: Parameters<T>) => {
			if (loading.current) {
				return;
			}
			loading.current = true;
			return callback(...args);
		},
		[callback],
	);
};
