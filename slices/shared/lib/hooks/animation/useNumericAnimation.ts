import { useEffect } from "react";
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import type { DefaultStyle } from "../../../model/ui/styles";

export type UseNumericAnimationOptions<T extends DefaultStyle> = {
	duration?: number;
	value?: number;
	styleResolver: (value: number) => T;
};

export const useNumericAnimation = <T extends DefaultStyle>({
	duration = 500,
	value = 0,
	styleResolver,
}: UseNumericAnimationOptions<T>) => {
	const sharedValue = useSharedValue(value);

	useEffect(() => {
		sharedValue.value = value;
	}, [sharedValue, value]);

	return useAnimatedStyle(() => {
		const value = withTiming(sharedValue.value, {
			duration,
		});

		return styleResolver(value);
	}, [duration, styleResolver]);
};
