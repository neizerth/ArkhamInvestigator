import { useEffect } from "react";
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import type { DefaultStyle } from "../../../model/styles";

type Options<T extends DefaultStyle> = {
	enabled: boolean;
	duration?: number;
	maxValue?: number;
	minValue?: number;
	styleResolver: (value: number) => T;
};

export const useBooleanAnimation = <T extends DefaultStyle = DefaultStyle>({
	enabled,
	styleResolver,
	duration = 500,
	minValue = 0,
	maxValue = 1,
}: Options<T>) => {
	const sharedValue = useSharedValue(0);

	useEffect(() => {
		sharedValue.value = enabled ? maxValue : minValue;
	}, [sharedValue, enabled, maxValue, minValue]);

	return useAnimatedStyle(() => {
		const value = withTiming(sharedValue.value, {
			duration,
		});

		return styleResolver(value);
	}, [duration, styleResolver]);
};
