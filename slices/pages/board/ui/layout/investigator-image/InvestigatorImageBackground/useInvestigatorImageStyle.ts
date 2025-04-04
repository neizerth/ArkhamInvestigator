import {
	selectCurrentStatValue,
	selectCurrentTurnEnd,
	useAppSelector,
} from "@shared/lib";
import { useEffect } from "react";
import type { ViewStyle } from "react-native";
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

export const useInvestigatorImageStyle = () => {
	const health = useAppSelector(selectCurrentStatValue("health"));
	const sanity = useAppSelector(selectCurrentStatValue("sanity"));

	const isTurnEnd = useAppSelector(selectCurrentTurnEnd);
	const noMainStats = health <= 0 || sanity <= 0;

	const grayscale = useSharedValue(0);

	useEffect(() => {
		grayscale.value = isTurnEnd || noMainStats ? 1 : 0;
	}, [isTurnEnd, grayscale, noMainStats]);

	const animatedStyle = useAnimatedStyle((): ViewStyle => {
		return {
			filter: [
				{
					grayscale: withTiming(grayscale.value, {
						duration: 500,
					}),
				},
			],
		};
	});

	return animatedStyle;
};
