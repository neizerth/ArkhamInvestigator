import type { Box } from "@shared/model";
import { useCallback, useState } from "react";
import type { LayoutChangeEvent } from "react-native";

export const useLayoutSize = <T extends Box | undefined>(defaultSize?: T) => {
	const [size, setSize] = useState<Box | undefined>(defaultSize);
	const threshold = 5;

	const onLayout = useCallback(
		(e: LayoutChangeEvent) => {
			const { layout } = e.nativeEvent;
			if (!layout) {
				return;
			}
			const { width = 0, height = 0 } = size || {};
			const dY = Math.abs(height - layout.height);
			const dX = Math.abs(width - layout.width);

			if (dX < threshold && dY < threshold) {
				return;
			}
			setSize(layout);
		},
		[size],
	);

	return [size, onLayout] as [T extends undefined ? T : Box, typeof onLayout];
};
