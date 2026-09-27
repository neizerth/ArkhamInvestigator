import type { TimingPhase } from "@modules/mechanics/rules/round-timing/shared/model";
import { useCallback, useRef, useState } from "react";
import type { FlatListProps } from "react-native";

type List = FlatListProps<TimingPhase>;
type ScrollCallback = Exclude<List["onScroll"], undefined>;

const minOffset = 70;

export const useActivePhase = () => {
	const [showPhase, setShowPhase] = useState(false);
	const shownRef = useRef(false);

	const onScroll: ScrollCallback = useCallback((e) => {
		const { y } = e.nativeEvent.contentOffset;

		const show = y > minOffset;

		if (shownRef.current === show) {
			return;
		}
		shownRef.current = show;
		setShowPhase(show);
	}, []);

	return [showPhase, onScroll] as [boolean, typeof onScroll];
};
