import { useSwipe } from "@modules/core/touch/shared/lib";
import { factionFilterTypes } from "@modules/faction/shared/config";
import { setFactionFilter } from "@modules/signature/signature-selection/entities/lib";
import { selectFactionFilter } from "@modules/signature/signature-selection/shared/lib";
import {
	getLoopNext,
	getLoopPrev,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";

import { useCallback, useMemo } from "react";
import { Gesture } from "react-native-gesture-handler";

export const useFactionSwipes = () => {
	const dispatch = useAppDispatch();
	const faction = useAppSelector(selectFactionFilter);
	const index = faction ? factionFilterTypes.indexOf(faction) : 0;

	const next = useCallback(() => {
		const item = getLoopNext(factionFilterTypes, index);

		dispatch(setFactionFilter(item));
	}, [dispatch, index]);

	const prev = useCallback(() => {
		const item = getLoopPrev(factionFilterTypes, index);

		dispatch(setFactionFilter(item));
	}, [dispatch, index]);

	const left = useSwipe({
		direction: "left",
		onSwipe: next,
	});

	const right = useSwipe({
		direction: "right",
		onSwipe: prev,
	});

	return useMemo(() => {
		return Gesture.Exclusive(left, right);
	}, [left, right]);
};
