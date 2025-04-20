import {
	selectCurrentBoardProp,
	selectCurrentIsInactive,
	useAppSelector,
} from "@shared/lib";
import { useCallback, useEffect } from "react";
import type { ViewStyle } from "react-native";
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

export const useOpacityAnimation = (code: string) => {
	const inactive = useAppSelector(selectCurrentIsInactive);
	const { id } = useAppSelector(selectCurrentBoardProp("image"));
	const isActiveImage = id === code;

	const opacity = useSharedValue(0);

	const getOpacity = useCallback(() => {
		if (!isActiveImage) {
			return 0;
		}
		return inactive ? 1 : 0;
	}, [inactive, isActiveImage]);

	useEffect(() => {
		opacity.value = getOpacity();
	}, [opacity, getOpacity]);

	const animatedStyle = useAnimatedStyle((): ViewStyle => {
		return {
			opacity: withTiming(opacity.value, {
				duration: 500,
			}),
		};
	});

	return animatedStyle;
};
