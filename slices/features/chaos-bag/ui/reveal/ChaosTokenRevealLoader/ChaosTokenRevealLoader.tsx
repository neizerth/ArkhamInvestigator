import { useFadeAnimation } from "@shared/lib";
import { useCallback, useEffect, useState } from "react";
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
	duration = 3000,
	size = 150,
	onLoad,
	show = false,
	...props
}: ChaosTokenRevealLoaderProps) => {
	const { fps, valuePerFrame } = getRevealAnimation(duration);
	const [progress, setProgress] = useState(0);

	const progressStep = useCallback(() => {
		setProgress((value) => Math.min(Math.round(value + valuePerFrame), 100));
	}, [valuePerFrame]);

	useEffect(() => {
		if (!show) {
			if (progress !== 0) {
				setProgress(0);
			}
			return;
		}
		if (progress === 100) {
			onLoad?.();
			return;
		}
		if (progress === 0) {
			progressStep();
		}
		setTimeout(progressStep, fps);
	}, [show, progressStep, progress, fps, onLoad]);

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
