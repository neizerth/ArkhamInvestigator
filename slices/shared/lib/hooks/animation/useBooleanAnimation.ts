import { useEffect, useRef } from "react";
import {
	cancelAnimation,
	runOnJS,
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

	// JS-side bookkeeping
	const isMountedRef = useRef(true);
	const runIdRef = useRef(0);

	// Worklet-safe mirrors (readable on UI thread)
	const runIdSV = useSharedValue(0);
	const mountedSV = useSharedValue(1);

	// Readable delay resolution
	let delayMs = 0;
	if (enabled) {
		delayMs = delayIn ?? delayProp ?? 0;
	} else {
		delayMs = delayOut ?? delayProp ?? 0;
	}

	useEffect(() => {
		isMountedRef.current = true;
		mountedSV.value = 1;

		return () => {
			isMountedRef.current = false;
			mountedSV.value = 0;
			cancelAnimation(sharedValue);
			runIdRef.current += 1;
			runIdSV.value = runIdRef.current;
		};
	}, [mountedSV, sharedValue, runIdSV]);

	useEffect(() => {
		const thisRunId = runIdRef.current + 1;
		runIdRef.current = thisRunId;
		runIdSV.value = thisRunId;

		const target = enabled ? maxValue : minValue;

		const stillValidJS = () => {
			return isMountedRef.current && runIdRef.current === thisRunId;
		};

		const start = async () => {
			if (delayMs > 0) {
				await delay(delayMs);
				if (!stillValidJS()) {
					return;
				}
			}

			if (onStart && stillValidJS()) {
				onStart();
			}

			cancelAnimation(sharedValue);

			sharedValue.value = withTiming(target, { duration }, (finished) => {
				"worklet";
				if (!finished) {
					return;
				}
				if (mountedSV.value !== 1) {
					return;
				}
				if (runIdSV.value !== thisRunId) {
					return;
				}
				if (onComplete) {
					runOnJS(onComplete)();
				}
			});
		};

		start();

		return () => {
			runIdRef.current += 1;
			runIdSV.value = runIdRef.current;
		};
	}, [
		enabled,
		maxValue,
		minValue,
		delayMs,
		duration,
		onStart,
		onComplete,
		mountedSV,
		runIdSV,
		sharedValue,
	]);

	return useAnimatedStyle(() => {
		return styleResolver(sharedValue.value);
	}, [styleResolver]);
};
