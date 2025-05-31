import { useFadeAnimation } from "@shared/lib";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ViewProps } from "react-native";
import * as C from "./ChaosTokenRevealLoader.components";
import { getRevealAnimation } from "./getRevealAnimation";

export type ChaosTokenRevealLoaderProps = ViewProps & {
	duration?: number;
	size?: number;
	onLoad?: () => void;
	show?: boolean;
};

export const ChaosTokenRevealLoader = ({
	duration = 1000,
	size = 150,
	onLoad,
	show = false,
	...props
}: ChaosTokenRevealLoaderProps) => {
	const { frameDuration, valuePerFrame } = getRevealAnimation(duration);
	const [progress, setProgress] = useState(0);

	const interval = useRef<NodeJS.Timeout>();

	const progressStep = useCallback(() => {
		setProgress((value) => Math.min(Math.round(value + valuePerFrame), 100));
	}, [valuePerFrame]);

	useEffect(() => {
		clearInterval(interval.current);
		return () => {
			clearInterval(interval.current);
		};
	}, []);

	useEffect(() => {
		if (!show) {
			if (progress !== 0) {
				setProgress(0);
			}
			return;
		}
		if (progress === 100) {
			clearInterval(interval.current);
			onLoad?.();
			return;
		}
		if (progress === 0 && !interval.current) {
			interval.current = setInterval(progressStep, frameDuration);
		}
	}, [show, progressStep, progress, frameDuration, onLoad]);

	const style = useFadeAnimation({
		show,
	});

	if (!show) {
		return;
	}

	return (
		<C.Container {...props} style={[props.style, style]}>
			<C.Progress fill="white" value={progress} size={size} />
		</C.Container>
	);
};
