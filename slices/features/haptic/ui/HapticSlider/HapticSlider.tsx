import { useHapticFeedback } from "@features/haptic/lib";
import { Slider, type SliderProps } from "@shared/ui";
import { useCallback } from "react";

export type HapticSliderProps = SliderProps;

export const HapticSlider = ({
	onValueChange: onValueChangeProp,
	...props
}: HapticSliderProps) => {
	const impactFeedback = useHapticFeedback();

	const onValueChange = useCallback(
		(value: number) => {
			onValueChangeProp?.(value);
			impactFeedback();
		},
		[impactFeedback, onValueChangeProp],
	);

	return <Slider {...props} onValueChange={onValueChange} />;
};
