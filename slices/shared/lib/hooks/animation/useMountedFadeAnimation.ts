import { useCallback, useEffect, useRef, useState } from "react";
import { useFadeAnimation } from "./useFadeAnimation";

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

	return {
		mounted,
		fadeStyle,
		pointerEvents: show ? ("auto" as const) : ("none" as const),
	};
};
