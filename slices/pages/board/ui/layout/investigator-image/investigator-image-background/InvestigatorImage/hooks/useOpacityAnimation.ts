import { delay, selectCurrentIsInactive, useAppSelector } from "@shared/lib";
import { useEffect } from "react";
import type { ViewStyle } from "react-native";
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

export const useOpacityAnimation = (loading: boolean) => {
	const inactive = useAppSelector(selectCurrentIsInactive);

	const opacity = useSharedValue(0);

	useEffect(() => {
		if (loading) {
			return;
		}
		delay(150).then(() => {
			opacity.value = inactive ? 1 : 0;
		});
	}, [opacity, inactive, loading]);

	const animatedStyle = useAnimatedStyle((): ViewStyle => {
		return {
			opacity: withTiming(opacity.value, {
				duration: 500,
			}),
		};
	});

	return animatedStyle;
};
