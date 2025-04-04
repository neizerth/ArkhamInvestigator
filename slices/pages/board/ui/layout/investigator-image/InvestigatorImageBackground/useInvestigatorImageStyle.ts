import {
	selectCurrentHorror,
	selectCurrentStatBaseValue,
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
	const horror = useAppSelector(selectCurrentHorror);
	const baseSanity = useAppSelector(selectCurrentStatBaseValue("sanity"));
	const horrorPercentage = horror / baseSanity;

	const isTurnEnd = useAppSelector(selectCurrentTurnEnd);

	const grayscale = useSharedValue(0);
	const saturate = useSharedValue(1);

	useEffect(() => {
		grayscale.value = isTurnEnd ? 1 : 0;
	}, [isTurnEnd, grayscale]);

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
