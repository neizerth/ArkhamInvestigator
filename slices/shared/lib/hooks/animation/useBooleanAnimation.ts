import { useEffect, useRef } from "react";
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import type { DefaultStyle } from "../../../model/ui/styles";
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
	onComplete?: () => void;
	onStart?: () => void;
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
	onStart,
}: UseBooleanAnimationOptions<T>) => {
	const sharedValue = useSharedValue(minValue);
	const isActiveRef = useRef(false);

	const delayMs = (enabled ? delayIn : delayOut) || delayProp || 0;

	useEffect(() => {
		const value = enabled ? maxValue : minValue;

		const trigger = async () => {
			isActiveRef.current = true;

			await delay(delayMs);
			if (!isActiveRef.current) return;

			onStart?.();
			sharedValue.value = value;

			await delay(duration);
			if (!isActiveRef.current) return;

			onComplete?.();
		};

		trigger();
	}, [
		enabled,
		maxValue,
		minValue,
		delayMs,
		duration,
		onStart,
		onComplete,
		sharedValue,
	]);

	useEffect(() => {
		return () => {
			isActiveRef.current = false;
		};
	}, []);

	return useAnimatedStyle(() => {
		const value = withTiming(sharedValue.value, {
			duration,
		});

		return styleResolver(value);
	}, [duration, styleResolver]);
};
