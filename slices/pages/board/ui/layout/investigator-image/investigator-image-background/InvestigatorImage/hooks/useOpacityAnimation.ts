import { selectCurrentIsInactive, useAppSelector } from "@shared/lib";
import { useEffect } from "react";
import type { ViewStyle } from "react-native";
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

export const useOpacityAnimation = () => {
	const inactive = useAppSelector(selectCurrentIsInactive);

	const opacity = useSharedValue(0);

	useEffect(() => {
		opacity.value = inactive ? 1 : 0;
	}, [opacity, inactive]);

	const animatedStyle = useAnimatedStyle((): ViewStyle => {
		return {
			opacity: withTiming(opacity.value, {
				duration: 500,
			}),
		};
	});

	return animatedStyle;
};
