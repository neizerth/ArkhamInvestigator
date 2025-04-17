import { selectCurrentIsInactive, useAppSelector } from "@shared/lib";
import { useEffect } from "react";
import type { ViewStyle } from "react-native";
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

export const useGrayscaleAnimation = () => {
	const inactive = useAppSelector(selectCurrentIsInactive);

	const grayscale = useSharedValue(0);

	useEffect(() => {
		grayscale.value = inactive ? 1 : 0;
	}, [grayscale, inactive]);

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
