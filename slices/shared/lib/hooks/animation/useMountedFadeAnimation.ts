import { useCallback, useEffect, useRef, useState } from "react";
import type { ViewProps } from "react-native";
import { useFadeAnimation } from "./useFadeAnimation";

type PointerEvents = ViewProps["pointerEvents"];

interface UseMountedFadeAnimationOptions {
	show: boolean;
	duration?: number;
	delay?: number;
	delayIn?: number;
	delayOut?: number;
}

export const useMountedFadeAnimation = ({
	show,
	...options
}: UseMountedFadeAnimationOptions) => {
	const [mounted, setMounted] = useState(false);
	const showRef = useRef(show);

	useEffect(() => {
		showRef.current = show;
		if (show) {
			setMounted(true);
		}
	}, [show]);

	const handleComplete = useCallback(() => {
		if (!showRef.current) {
			setMounted(false);
		}
	}, []);

	const fadeStyle = useFadeAnimation({
		show,
		...options,
		onComplete: handleComplete,
	});

	const pointerEvents: PointerEvents = show ? "auto" : "none";

	return {
		mounted,
		fadeStyle,
		pointerEvents,
	};
};
