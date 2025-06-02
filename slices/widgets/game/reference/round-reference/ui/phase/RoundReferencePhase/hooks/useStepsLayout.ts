import type { TimingPhaseStep } from "@features/game/rules";
import { useCallback, useRef, useState } from "react";
import type { LayoutChangeEvent, LayoutRectangle } from "react-native";

type StepLayoutItem = {
	index: number;
	layout: LayoutRectangle;
};
export const useStepsLayout = (steps: TimingPhaseStep[]) => {
	const count = steps.length;

	const [layout, setLayout] = useState<StepLayoutItem[]>([]);
	const layoutRef = useRef<StepLayoutItem[]>([]);

	const onLayout = useCallback(
		(index: number) => (e: LayoutChangeEvent) => {
			if (layoutRef.current.length === count) {
				return;
			}

			const { layout } = e.nativeEvent;

			if (!layout) {
				return;
			}

			layoutRef.current.push({
				index,
				layout,
			});

			if (layoutRef.current.length !== count) {
				return;
			}

			setLayout(layoutRef.current);
		},
		[count],
	);

	return [layout, onLayout] as [typeof layout, typeof onLayout];
};
