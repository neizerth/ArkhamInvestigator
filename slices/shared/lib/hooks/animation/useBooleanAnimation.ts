import { useCallback, useEffect, useMemo } from "react";
import {
	type AnimationCallback,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import type { DefaultStyle } from "../../../model/styles";
import { delay } from "../../util";

export type UseBooleanAnimationOptions<T extends DefaultStyle> = {
	enabled: boolean;
	duration?: number;
	maxValue?: number;
	minValue?: number;
	delay?: number;
	delayIn?: number;
	delayOut?: number;
	styleResolver: (value: number) => T;
	onComplete?: AnimationCallback;
};

export const useBooleanAnimation = <T extends DefaultStyle = DefaultStyle>({
	enabled,
	styleResolver,
	duration = 500,
	minValue = 0,
	maxValue = 1,
	delay: delayProp,
	delayIn,
	delayOut,
	onComplete,
}: UseBooleanAnimationOptions<T>) => {
	const sharedValue = useSharedValue(minValue);

	const delayMs = useMemo(() => {
		return (enabled ? delayIn : delayOut) || delayProp || 0;
	}, [enabled, delayProp, delayIn, delayOut]);

	const trigger = useCallback(
		(value: number, delayMs = 0) => {
			delay(delayMs).then(() => {
				sharedValue.value = value;
			});
		},
		[sharedValue],
	);

	useEffect(() => {
		const value = enabled ? maxValue : minValue;
		trigger(value, delayMs);
	}, [enabled, maxValue, minValue, delayMs, trigger]);

	return useAnimatedStyle(() => {
		const value = withTiming(
			sharedValue.value,
			{
				duration,
			},
			onComplete,
		);

		return styleResolver(value);
	}, [duration, styleResolver]);
};
