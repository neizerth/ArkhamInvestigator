import {
	selectCurrentBoard,
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
	const isTurnEnd = useAppSelector(selectCurrentTurnEnd);

	useEffect(() => {
		grayscale.value = isTurnEnd ? 1 : 0;
	}, [isTurnEnd]);

	const grayscale = useSharedValue(0);

	return useAnimatedStyle((): ViewStyle => {
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
};
