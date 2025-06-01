import { type TimingPhase, useTimingPhase } from "@features/game";
import { useScrollSpy, useScrollToIndex } from "@shared/lib";
import memoize from "fast-memoize";
import { useCallback, useRef } from "react";
import type { FlatList } from "react-native-gesture-handler";
import { useActivePhase } from "./useActivePhase";

type List = FlatList<TimingPhase>;

export const usePhaseList = () => {
	const ref = useRef<List>(null);

	const onStartReached = useScrollToIndex({
		ref,
		index: 0,
	});

	const { isPhaseOpen } = useTimingPhase();

	const [canShowActivePhase, onScroll] = useActivePhase();
	const [activePhase, onViewableItemsChanged] = useScrollSpy<TimingPhase>();

	const showActivePhase =
		activePhase && isPhaseOpen(activePhase.position) && canShowActivePhase;

	const scrollToIndex = useCallback(
		memoize((index: number) => () => {
			ref.current?.scrollToIndex({
				index,
				viewOffset: 40,
			});
		}),
		[],
	);

	return {
		ref,
		scrollToIndex,
		onStartReached,
		activePhase,
		showActivePhase,
		onScroll,
		onViewableItemsChanged,
	};
};
